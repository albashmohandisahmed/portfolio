function getOrders(token, filters) {
  var user = requireUser_(token);
  filters = filters || {};
  var rows = readObjects_(SHEETS.ORDERS, DB.HEADER_ORDER.ORDERS);
  var q = normalizeLower_(filters.q);
  var status = normalize_(filters.status);
  var from = normalize_(filters.from);
  var to = normalize_(filters.to);

  var result = rows.filter(function (order) {
    if (!canViewOrder_(user, order)) {
      return false;
    }
    if (status && normalize_(order[HEADERS.ORDERS.STATUS]) !== status) {
      return false;
    }
    var deliveryDate = dateKey_(order[HEADERS.ORDERS.DELIVERY_DATE]);
    if (from && deliveryDate < from) {
      return false;
    }
    if (to && deliveryDate > to) {
      return false;
    }
    if (!q) {
      return true;
    }
    var haystack = [
      order[HEADERS.ORDERS.ORDER_NUMBER],
      order[HEADERS.ORDERS.CUSTOMER_NAME],
      order[HEADERS.ORDERS.CUSTOMER_PHONE],
      order[HEADERS.ORDERS.RECIPIENT_NAME],
      order[HEADERS.ORDERS.RECIPIENT_PHONE]
    ].join(' ').toLowerCase();
    return haystack.indexOf(q) !== -1;
  });

  result.sort(function (a, b) {
    var dateA = dateKey_(a[HEADERS.ORDERS.DELIVERY_DATE]) + ' ' + normalize_(a[HEADERS.ORDERS.DELIVERY_TIME]);
    var dateB = dateKey_(b[HEADERS.ORDERS.DELIVERY_DATE]) + ' ' + normalize_(b[HEADERS.ORDERS.DELIVERY_TIME]);
    return dateA.localeCompare(dateB);
  });

  return result.slice(0, 500);
}

function getOrder(token, orderNumber) {
  var user = requireUser_(token);
  var rowNumber = findOrderRow_(orderNumber);
  if (!rowNumber) {
    throw new Error('الطلب غير موجود.');
  }
  var order = readRowObject_(getSheet_(SHEETS.ORDERS), rowNumber, DB.HEADER_ORDER.ORDERS);
  if (!canViewOrder_(user, order)) {
    throw new Error('ليست لديك صلاحية مشاهدة هذا الطلب.');
  }
  return order;
}

function saveOrder(token, payload) {
  var user = requireUser_(token);
  payload = payload || {};
  var sheet = getSheet_(SHEETS.ORDERS);
  var orderNumber = normalize_(payload[HEADERS.ORDERS.ORDER_NUMBER]);
  var rowNumber = orderNumber ? findOrderRow_(orderNumber) : null;

  if (rowNumber) {
    var oldOrder = readRowObject_(sheet, rowNumber, DB.HEADER_ORDER.ORDERS);
    if (user.role === 'Sales Employee') {
      throw new Error('موظف المبيعات يستخدم تغيير الحالة أو الدفع فقط، ولا يعدل تفاصيل الطلب كاملة.');
    }
    if (!canEditOrder_(user, oldOrder)) {
      throw new Error('ليست لديك صلاحية تعديل هذا الطلب.');
    }
    var merged = mergeOrderPayload_(oldOrder, payload, user, false);
    sheet.getRange(rowNumber, 1, 1, DB.HEADER_ORDER.ORDERS.length).setValues([objectToRow_(merged, DB.HEADER_ORDER.ORDERS)]);
    auditOrderChanges_(user, oldOrder, merged);
    return {ok: true, orderNumber: oldOrder[HEADERS.ORDERS.ORDER_NUMBER], orderId: oldOrder[HEADERS.ORDERS.ORDER_ID]};
  }

  if (user.role === 'Sales Employee' && !user.permissions.editAllOrders) {
    throw new Error('موظف المبيعات لا يستطيع إنشاء طلب جديد.');
  }

  var created = createOrderWithLock_(sheet, payload, user);
  appendAudit_(user, created[HEADERS.ORDERS.ORDER_NUMBER], 'Create', '', '', '');
  return {
    ok: true,
    orderNumber: created[HEADERS.ORDERS.ORDER_NUMBER],
    orderId: created[HEADERS.ORDERS.ORDER_ID]
  };
}

function updateOrderStatus(token, orderNumber, status) {
  var user = requireRole_(token, ['Admin', 'Sales Employee', 'Social Media Employee']);
  assertOneOf_(status, DB.ENUMS.ORDER_STATUSES, 'حالة الطلب');

  var sheet = getSheet_(SHEETS.ORDERS);
  var rowNumber = findOrderRow_(orderNumber);
  if (!rowNumber) {
    throw new Error('الطلب غير موجود.');
  }

  var order = readRowObject_(sheet, rowNumber, DB.HEADER_ORDER.ORDERS);
  if (!canEditOrder_(user, order) && user.role !== 'Sales Employee') {
    throw new Error('ليست لديك صلاحية تغيير حالة هذا الطلب.');
  }

  var oldStatus = order[HEADERS.ORDERS.STATUS];
  sheet.getRange(rowNumber, ORDER_COLUMNS.STATUS).setValue(status);
  sheet.getRange(rowNumber, ORDER_COLUMNS.LAST_MODIFIED_BY).setValue(user.employeeId);
  sheet.getRange(rowNumber, ORDER_COLUMNS.LAST_MODIFIED_DATE).setValue(now_());

  var action = 'Status Change';
  if (status === 'ملغي') {
    action = 'Cancel';
  } else if (normalize_(oldStatus) === 'ملغي') {
    action = 'Reactivate';
  }
  appendAudit_(user, orderNumber, action, HEADERS.ORDERS.STATUS, oldStatus, status);
  return {ok: true};
}

function updatePayment(token, orderNumber, paymentMethod, paidAmount, paymentStatus) {
  var user = requirePermission_(token, 'managePayments');
  assertOneOf_(paymentMethod, DB.ENUMS.PAYMENT_METHODS, 'طريقة الدفع');
  assertOneOf_(paymentStatus, DB.ENUMS.PAYMENT_STATUSES, 'حالة الدفع');

  var sheet = getSheet_(SHEETS.ORDERS);
  var rowNumber = findOrderRow_(orderNumber);
  if (!rowNumber) {
    throw new Error('الطلب غير موجود.');
  }
  var order = readRowObject_(sheet, rowNumber, DB.HEADER_ORDER.ORDERS);
  var total = asNumber_(order[HEADERS.ORDERS.TOTAL]);
  var paid = asNumber_(paidAmount);
  if (paid > total) {
    throw new Error('المبلغ المدفوع لا يمكن أن يكون أكبر من الإجمالي.');
  }

  sheet.getRange(rowNumber, ORDER_COLUMNS.PAYMENT_METHOD).setValue(paymentMethod);
  sheet.getRange(rowNumber, ORDER_COLUMNS.PAID_AMOUNT).setValue(paid);
  sheet.getRange(rowNumber, ORDER_COLUMNS.REMAINING_AMOUNT).setValue(Math.max(0, total - paid));
  sheet.getRange(rowNumber, ORDER_COLUMNS.PAYMENT_STATUS).setValue(paymentStatus);
  sheet.getRange(rowNumber, ORDER_COLUMNS.LAST_MODIFIED_BY).setValue(user.employeeId);
  sheet.getRange(rowNumber, ORDER_COLUMNS.LAST_MODIFIED_DATE).setValue(now_());
  appendAudit_(user, orderNumber, 'Payment Change', 'Payment', '', paymentStatus + ' / ' + paid);
  return {ok: true};
}

function createOrderWithLock_(sheet, payload, user) {
  var lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    var order = mergeOrderPayload_({}, payload, user, true);
    order[HEADERS.ORDERS.ORDER_ID] = uuid_('ORD_');
    order[HEADERS.ORDERS.ORDER_NUMBER] = nextOrderNumber_();
    order[HEADERS.ORDERS.CREATED_BY] = user.employeeId;
    order[HEADERS.ORDERS.CREATED_DATE] = now_();
    order[HEADERS.ORDERS.LAST_MODIFIED_BY] = user.employeeId;
    order[HEADERS.ORDERS.LAST_MODIFIED_DATE] = now_();
    sheet.appendRow(objectToRow_(order, DB.HEADER_ORDER.ORDERS));
    return order;
  } finally {
    lock.releaseLock();
  }
}

function mergeOrderPayload_(base, payload, user, isNew) {
  var order = {};
  for (var i = 0; i < DB.HEADER_ORDER.ORDERS.length; i++) {
    var header = DB.HEADER_ORDER.ORDERS[i];
    order[header] = base[header] || '';
  }

  var editableHeaders = [
    HEADERS.ORDERS.CUSTOMER_NAME,
    HEADERS.ORDERS.CUSTOMER_PHONE,
    HEADERS.ORDERS.RECIPIENT_NAME,
    HEADERS.ORDERS.RECIPIENT_PHONE,
    HEADERS.ORDERS.ORDER_TYPE,
    HEADERS.ORDERS.PRODUCT,
    HEADERS.ORDERS.QUANTITY,
    HEADERS.ORDERS.SIZE_PERSONS,
    HEADERS.ORDERS.FILLING,
    HEADERS.ORDERS.CAKE_WRITING,
    HEADERS.ORDERS.ADD_ONS,
    HEADERS.ORDERS.DESIGN_IMAGE,
    HEADERS.ORDERS.DELIVERY_PICKUP,
    HEADERS.ORDERS.DELIVERY_ADDRESS,
    HEADERS.ORDERS.DELIVERY_FEE,
    HEADERS.ORDERS.ORDER_DATE,
    HEADERS.ORDERS.DELIVERY_DATE,
    HEADERS.ORDERS.DELIVERY_TIME,
    HEADERS.ORDERS.PRODUCT_PRICE,
    HEADERS.ORDERS.PAYMENT_METHOD,
    HEADERS.ORDERS.PAID_AMOUNT,
    HEADERS.ORDERS.PAYMENT_STATUS,
    HEADERS.ORDERS.STATUS,
    HEADERS.ORDERS.ASSIGNED_EMPLOYEE,
    HEADERS.ORDERS.NOTES
  ];

  for (var j = 0; j < editableHeaders.length; j++) {
    var key = editableHeaders[j];
    if (payload[key] !== undefined) {
      order[key] = payload[key];
    }
  }

  if (!order[HEADERS.ORDERS.ORDER_DATE]) {
    order[HEADERS.ORDERS.ORDER_DATE] = today_();
  }
  if (!order[HEADERS.ORDERS.STATUS]) {
    order[HEADERS.ORDERS.STATUS] = 'جديد';
  }
  if (!order[HEADERS.ORDERS.PAYMENT_STATUS]) {
    order[HEADERS.ORDERS.PAYMENT_STATUS] = 'غير مدفوع';
  }
  if (!order[HEADERS.ORDERS.PAYMENT_METHOD]) {
    order[HEADERS.ORDERS.PAYMENT_METHOD] = 'Cash';
  }
  if (!order[HEADERS.ORDERS.DELIVERY_PICKUP]) {
    order[HEADERS.ORDERS.DELIVERY_PICKUP] = 'توصيل';
  }

  validateOrder_(order, user, isNew);

  var productPrice = asNumber_(order[HEADERS.ORDERS.PRODUCT_PRICE]);
  var deliveryFee = asNumber_(order[HEADERS.ORDERS.DELIVERY_FEE]);
  var paidAmount = asNumber_(order[HEADERS.ORDERS.PAID_AMOUNT]);
  var total = productPrice + deliveryFee;
  if (paidAmount > total) {
    throw new Error('المبلغ المدفوع لا يمكن أن يكون أكبر من الإجمالي.');
  }
  order[HEADERS.ORDERS.PRODUCT_PRICE] = productPrice;
  order[HEADERS.ORDERS.DELIVERY_FEE] = deliveryFee;
  order[HEADERS.ORDERS.PAID_AMOUNT] = paidAmount;
  order[HEADERS.ORDERS.TOTAL] = total;
  order[HEADERS.ORDERS.REMAINING_AMOUNT] = Math.max(0, total - paidAmount);
  order[HEADERS.ORDERS.LAST_MODIFIED_BY] = user.employeeId;
  order[HEADERS.ORDERS.LAST_MODIFIED_DATE] = now_();

  return order;
}

function validateOrder_(order, user, isNew) {
  assertOneOf_(normalize_(order[HEADERS.ORDERS.STATUS]), DB.ENUMS.ORDER_STATUSES, 'حالة الطلب');
  assertOneOf_(normalize_(order[HEADERS.ORDERS.PAYMENT_STATUS]), DB.ENUMS.PAYMENT_STATUSES, 'حالة الدفع');
  assertOneOf_(normalize_(order[HEADERS.ORDERS.PAYMENT_METHOD]), DB.ENUMS.PAYMENT_METHODS, 'طريقة الدفع');
  assertOneOf_(normalize_(order[HEADERS.ORDERS.DELIVERY_PICKUP]), DB.ENUMS.DELIVERY_TYPES, 'التوصيل أو الاستلام');
  if (order[HEADERS.ORDERS.ORDER_TYPE]) {
    assertOneOf_(normalize_(order[HEADERS.ORDERS.ORDER_TYPE]), DB.ENUMS.ORDER_TYPES, 'نوع الطلب');
  }
  if (isNew && user.role === 'Sales Employee') {
    throw new Error('موظف المبيعات لا يستطيع إنشاء طلب جديد.');
  }
}

function auditOrderChanges_(user, oldOrder, newOrder) {
  var orderNumber = oldOrder[HEADERS.ORDERS.ORDER_NUMBER];
  for (var i = 0; i < DB.HEADER_ORDER.ORDERS.length; i++) {
    var header = DB.HEADER_ORDER.ORDERS[i];
    if (header === HEADERS.ORDERS.LAST_MODIFIED_BY || header === HEADERS.ORDERS.LAST_MODIFIED_DATE) {
      continue;
    }
    var oldValue = normalize_(oldOrder[header]);
    var newValue = normalize_(newOrder[header]);
    if (oldValue === newValue) {
      continue;
    }
    var action = 'Edit';
    if (header === HEADERS.ORDERS.STATUS) {
      action = newValue === 'ملغي' ? 'Cancel' : oldValue === 'ملغي' ? 'Reactivate' : 'Status Change';
    } else if (
      header === HEADERS.ORDERS.PAID_AMOUNT ||
      header === HEADERS.ORDERS.PAYMENT_METHOD ||
      header === HEADERS.ORDERS.PAYMENT_STATUS
    ) {
      action = 'Payment Change';
    } else if (header === HEADERS.ORDERS.ASSIGNED_EMPLOYEE) {
      action = 'Employee Assignment';
    }
    appendAudit_(user, orderNumber, action, header, oldValue, newValue);
  }
}

function nextOrderNumber_() {
  var current = Number(getSetting_('NEXT_ORDER_NUMBER') || 1);
  var prefix = String(getSetting_('ORDER_PREFIX') || DB.SETTINGS_DEFAULTS.ORDER_PREFIX);
  var candidate = prefix + current;
  while (findOrderRow_(candidate)) {
    current++;
    candidate = prefix + current;
  }
  setSetting_('NEXT_ORDER_NUMBER', String(current + 1));
  return candidate;
}

function findOrderRow_(orderNumber) {
  var sheet = getSheet_(SHEETS.ORDERS);
  var lastRow = sheet.getLastRow();
  if (lastRow < 2) {
    return null;
  }
  var values = sheet.getRange(2, ORDER_COLUMNS.ORDER_NUMBER, lastRow - 1, 1).getValues();
  for (var i = 0; i < values.length; i++) {
    if (normalize_(values[i][0]) === normalize_(orderNumber)) {
      return i + 2;
    }
  }
  return null;
}

function canViewOrder_(user, order) {
  if (user.permissions.viewAllOrders) {
    return true;
  }
  return normalize_(order[HEADERS.ORDERS.CREATED_BY]) === user.employeeId ||
    normalize_(order[HEADERS.ORDERS.ASSIGNED_EMPLOYEE]) === user.employeeId ||
    normalizeLower_(order[HEADERS.ORDERS.ASSIGNED_EMPLOYEE]) === normalizeLower_(user.employeeName);
}

function canEditOrder_(user, order) {
  if (user.permissions.editAllOrders) {
    return true;
  }
  if (user.role === 'Social Media Employee') {
    return canViewOrder_(user, order);
  }
  if (user.role === 'Sales Employee') {
    return false;
  }
  return false;
}
