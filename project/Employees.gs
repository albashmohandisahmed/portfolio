function getEmployees(token) {
  requirePermission_(token, 'manageEmployees');
  return readObjects_(SHEETS.EMPLOYEES, DB.HEADER_ORDER.EMPLOYEES).map(function (employee) {
    employee[HEADERS.EMPLOYEES.PASSWORD_HASH] = '';
    return employee;
  });
}

function saveEmployee(token, payload) {
  var actor = requirePermission_(token, 'manageEmployees');
  payload = payload || {};

  var employeeId = normalize_(payload.employeeId);
  var employeeName = normalize_(payload.employeeName);
  var phone = normalize_(payload.phone);
  var username = normalizeLower_(payload.username);
  var password = payload.password;
  var role = normalize_(payload.role);
  var active = payload.active !== false;

  if (!employeeName || !username || !role) {
    throw new Error('اسم الموظف واسم المستخدم والصلاحية مطلوبة.');
  }
  assertOneOf_(role, DB.ENUMS.ROLES, 'الصلاحية');

  var sheet = getSheet_(SHEETS.EMPLOYEES);
  var rowNumber = employeeId ? findEmployeeRowById_(employeeId) : null;
  var duplicateUsernameRow = findEmployeeRowByUsername_(username);
  if (duplicateUsernameRow && duplicateUsernameRow !== rowNumber) {
    throw new Error('اسم المستخدم مستخدم مسبقًا.');
  }

  if (rowNumber) {
    var oldEmployee = readRowObject_(sheet, rowNumber, DB.HEADER_ORDER.EMPLOYEES);
    var row = {};
    row[HEADERS.EMPLOYEES.EMPLOYEE_ID] = oldEmployee[HEADERS.EMPLOYEES.EMPLOYEE_ID];
    row[HEADERS.EMPLOYEES.EMPLOYEE_NAME] = employeeName;
    row[HEADERS.EMPLOYEES.PHONE] = phone;
    row[HEADERS.EMPLOYEES.USERNAME] = username;
    row[HEADERS.EMPLOYEES.PASSWORD_HASH] = password ? hashPassword_(password) : oldEmployee[HEADERS.EMPLOYEES.PASSWORD_HASH];
    row[HEADERS.EMPLOYEES.ROLE] = role;
    row[HEADERS.EMPLOYEES.ACTIVE] = active;
    row[HEADERS.EMPLOYEES.CREATED_DATE] = oldEmployee[HEADERS.EMPLOYEES.CREATED_DATE] || now_();
    row[HEADERS.EMPLOYEES.LAST_LOGIN] = oldEmployee[HEADERS.EMPLOYEES.LAST_LOGIN] || '';
    sheet.getRange(rowNumber, 1, 1, DB.HEADER_ORDER.EMPLOYEES.length).setValues([objectToRow_(row, DB.HEADER_ORDER.EMPLOYEES)]);
    appendAudit_(actor, '', 'Edit', 'Employee', oldEmployee[HEADERS.EMPLOYEES.EMPLOYEE_ID], employeeName);
    return {ok: true, employeeId: row[HEADERS.EMPLOYEES.EMPLOYEE_ID]};
  }

  if (!password || String(password).length < 6) {
    throw new Error('كلمة المرور مطلوبة للموظف الجديد ويجب أن تكون 6 أحرف أو أرقام على الأقل.');
  }

  if (employeeId && findEmployeeRowById_(employeeId)) {
    throw new Error('Employee ID مستخدم مسبقًا.');
  }

  var newId = employeeId || nextEmployeeId_();
  sheet.appendRow([newId, employeeName, phone, username, hashPassword_(password), role, active, now_(), '']);
  appendAudit_(actor, '', 'Create', 'Employee', '', newId);
  return {ok: true, employeeId: newId};
}

function setEmployeeActive(token, employeeId, active) {
  var actor = requirePermission_(token, 'manageEmployees');
  var rowNumber = findEmployeeRowById_(employeeId);
  if (!rowNumber) {
    throw new Error('الموظف غير موجود.');
  }
  var sheet = getSheet_(SHEETS.EMPLOYEES);
  var oldValue = sheet.getRange(rowNumber, EMPLOYEE_COLUMNS.ACTIVE).getValue();
  sheet.getRange(rowNumber, EMPLOYEE_COLUMNS.ACTIVE).setValue(active === true);
  appendAudit_(actor, '', 'Edit', 'Employee Active', oldValue, active === true);
  return {ok: true};
}

function findEmployeeRowById_(employeeId) {
  var sheet = getSheet_(SHEETS.EMPLOYEES);
  var lastRow = sheet.getLastRow();
  if (lastRow < 2) {
    return null;
  }
  var values = sheet.getRange(2, EMPLOYEE_COLUMNS.EMPLOYEE_ID, lastRow - 1, 1).getValues();
  for (var i = 0; i < values.length; i++) {
    if (normalize_(values[i][0]) === normalize_(employeeId)) {
      return i + 2;
    }
  }
  return null;
}

function nextEmployeeId_() {
  var employees = readObjects_(SHEETS.EMPLOYEES, DB.HEADER_ORDER.EMPLOYEES);
  var max = 0;
  for (var i = 0; i < employees.length; i++) {
    var value = normalize_(employees[i][HEADERS.EMPLOYEES.EMPLOYEE_ID]).replace(/\D/g, '');
    var number = Number(value);
    if (!isNaN(number)) {
      max = Math.max(max, number);
    }
  }
  return 'EMP_' + (max + 1);
}
