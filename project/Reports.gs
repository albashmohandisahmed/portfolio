function getDashboard(token) {
  var user = requireUser_(token);
  var orders = getOrders(token, {from: today_(), to: today_()});
  var counts = {};
  DB.ENUMS.ORDER_STATUSES.forEach(function (status) {
    counts[status] = 0;
  });

  var total = 0;
  orders.forEach(function (order) {
    var status = normalize_(order[HEADERS.ORDERS.STATUS]);
    if (counts[status] !== undefined) {
      counts[status]++;
    }
    total += asNumber_(order[HEADERS.ORDERS.TOTAL]);
  });

  return {
    date: today_(),
    user: user,
    todayCount: orders.length,
    todayTotal: total,
    statuses: counts
  };
}

function getCalendarOrders(token, from, to) {
  var orders = getOrders(token, {from: from || today_(), to: to || from || today_()});
  var nowKey = today_();
  return orders.map(function (order) {
    var deliveryDate = dateKey_(order[HEADERS.ORDERS.DELIVERY_DATE]);
    var status = normalize_(order[HEADERS.ORDERS.STATUS]);
    var state = deliveryDate < nowKey && status !== 'تم التسليم' && status !== 'ملغي' ? 'late' : 'normal';
    return {
      orderNumber: order[HEADERS.ORDERS.ORDER_NUMBER],
      customerName: order[HEADERS.ORDERS.CUSTOMER_NAME],
      product: order[HEADERS.ORDERS.PRODUCT],
      deliveryDate: deliveryDate,
      deliveryTime: order[HEADERS.ORDERS.DELIVERY_TIME],
      status: status,
      state: state
    };
  });
}

function getReports(token, filters) {
  requirePermission_(token, 'viewReports');
  filters = filters || {};
  var from = normalize_(filters.from) || today_();
  var to = normalize_(filters.to) || from;
  var orders = readObjects_(SHEETS.ORDERS, DB.HEADER_ORDER.ORDERS).filter(function (order) {
    var orderDate = dateKey_(order[HEADERS.ORDERS.ORDER_DATE]);
    return orderDate >= from && orderDate <= to;
  });

  return {
    from: from,
    to: to,
    totalOrders: orders.length,
    totalValue: sumBy_(orders, HEADERS.ORDERS.TOTAL),
    cancelled: orders.filter(function (order) {
      return normalize_(order[HEADERS.ORDERS.STATUS]) === 'ملغي';
    }).length,
    byDay: groupCountAndTotal_(orders, HEADERS.ORDERS.ORDER_DATE, true),
    byEmployee: groupCountAndTotal_(orders, HEADERS.ORDERS.CREATED_BY, false),
    byStatus: groupCountAndTotal_(orders, HEADERS.ORDERS.STATUS, false),
    byPaymentMethod: groupCountAndTotal_(orders, HEADERS.ORDERS.PAYMENT_METHOD, false),
    byProduct: groupCountAndTotal_(orders, HEADERS.ORDERS.PRODUCT, false)
  };
}

function getConfirmationMessage(token, orderNumber) {
  var order = getOrder(token, orderNumber);
  var settings = getSettingsMap_();
  var template = String(settings.CONFIRMATION_TEMPLATE || DB.SETTINGS_DEFAULTS.CONFIRMATION_TEMPLATE);
  var message = template;
  DB.HEADER_ORDER.ORDERS.forEach(function (header) {
    message = message.replace(new RegExp('{{' + escapeRegExp_(header) + '}}', 'g'), normalize_(order[header]));
  });
  message = message.replace(/{{Currency}}/g, normalize_(settings.CURRENCY || DB.SETTINGS_DEFAULTS.CURRENCY));
  return {
    ok: true,
    orderNumber: orderNumber,
    message: decodeURIComponent(message)
  };
}

function sumBy_(rows, header) {
  return rows.reduce(function (sum, row) {
    return sum + asNumber_(row[header]);
  }, 0);
}

function groupCountAndTotal_(rows, header, useDate) {
  var map = {};
  rows.forEach(function (row) {
    var key = useDate ? dateKey_(row[header]) : normalize_(row[header]) || 'غير محدد';
    if (!map[key]) {
      map[key] = {key: key, count: 0, total: 0};
    }
    map[key].count++;
    map[key].total += asNumber_(row[HEADERS.ORDERS.TOTAL]);
  });
  return Object.keys(map).sort().map(function (key) {
    return map[key];
  });
}

function escapeRegExp_(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
