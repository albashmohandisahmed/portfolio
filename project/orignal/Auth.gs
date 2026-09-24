function getAppState() {
  var setup = setupSystem();
  var admin = findEmployeeByUsername_('admin');
  return {
    ok: setup.ok,
    database: setup,
    setupRequired: !(admin && normalize_(admin[HEADERS.EMPLOYEES.PASSWORD_HASH])),
    shopName: getSetting_('SHOP_NAME') || DB.SETTINGS_DEFAULTS.SHOP_NAME,
    currency: getSetting_('CURRENCY') || DB.SETTINGS_DEFAULTS.CURRENCY,
    enums: DB.ENUMS
  };
}

function initializeAdmin(password) {
  setupSystem();
  if (!password || String(password).length < 6) {
    throw new Error('كلمة مرور المدير يجب أن تكون 6 أحرف أو أرقام على الأقل.');
  }

  var rowNumber = findEmployeeRowByUsername_('admin');
  if (!rowNumber) {
    throw new Error('حساب المدير الأساسي غير موجود. شغّل setupSystem أولًا.');
  }

  var sheet = getSheet_(SHEETS.EMPLOYEES);
  var admin = readRowObject_(sheet, rowNumber, DB.HEADER_ORDER.EMPLOYEES);
  if (normalize_(admin[HEADERS.EMPLOYEES.PASSWORD_HASH])) {
    throw new Error('تم إعداد كلمة مرور المدير مسبقًا.');
  }

  sheet.getRange(rowNumber, EMPLOYEE_COLUMNS.PASSWORD_HASH).setValue(hashPassword_(password));
  sheet.getRange(rowNumber, EMPLOYEE_COLUMNS.CREATED_DATE).setValue(now_());
  return {ok: true};
}

function login(username, password) {
  setupSystem();
  username = normalizeLower_(username);
  if (!username || !password) {
    throw new Error('أدخل اسم المستخدم وكلمة المرور.');
  }

  var row = findEmployeeByUsername_(username);
  if (!row || !isActiveEmployee_(row) || !verifyPassword_(password, row[HEADERS.EMPLOYEES.PASSWORD_HASH])) {
    throw new Error('بيانات الدخول غير صحيحة أو الحساب غير فعال.');
  }

  var user = publicUser_(row);
  var token = Utilities.getUuid();
  CacheService.getScriptCache().put('SESSION_' + token, JSON.stringify(user), 21600);

  getSheet_(SHEETS.EMPLOYEES).getRange(row._row, EMPLOYEE_COLUMNS.LAST_LOGIN).setValue(now_());
  return {ok: true, token: token, user: user};
}

function logout(token) {
  if (token) {
    CacheService.getScriptCache().remove('SESSION_' + token);
  }
  return {ok: true};
}

function getCurrentUser(token) {
  return requireUser_(token);
}

function requireUser_(token) {
  if (!token) {
    throw new Error('انتهت الجلسة. سجّل الدخول من جديد.');
  }
  var raw = CacheService.getScriptCache().get('SESSION_' + token);
  if (!raw) {
    throw new Error('انتهت الجلسة. سجّل الدخول من جديد.');
  }
  return JSON.parse(raw);
}

function requirePermission_(token, permission) {
  var user = requireUser_(token);
  if (!user.permissions || user.permissions[permission] !== true) {
    throw new Error('ليست لديك صلاحية تنفيذ هذه العملية.');
  }
  return user;
}

function requireRole_(token, roles) {
  var user = requireUser_(token);
  if (roles.indexOf(user.role) === -1) {
    throw new Error('ليست لديك صلاحية تنفيذ هذه العملية.');
  }
  return user;
}

function ensureBaseAdmin_(ss, report) {
  var sheetStatus = report.sheets.EMPLOYEES;
  if (!sheetStatus || !sheetStatus.ok) {
    return;
  }

  var sheet = ss.getSheetByName(SHEETS.EMPLOYEES);
  var lastRow = sheet.getLastRow();
  var hasAdmin = false;
  if (lastRow >= 2) {
    var usernames = sheet.getRange(2, EMPLOYEE_COLUMNS.USERNAME, lastRow - 1, 1).getValues();
    for (var i = 0; i < usernames.length; i++) {
      if (normalizeLower_(usernames[i][0]) === 'admin') {
        hasAdmin = true;
        break;
      }
    }
  }

  if (!hasAdmin) {
    sheet.appendRow(['ADMIN', 'Administrator', '', 'admin', '', 'Admin', true, now_(), '']);
    report.warnings.push('Base admin user was created. Username: admin.');
  }
}

function findEmployeeByUsername_(username) {
  var row = findEmployeeRowByUsername_(username);
  if (!row) {
    return null;
  }
  return readRowObject_(getSheet_(SHEETS.EMPLOYEES), row, DB.HEADER_ORDER.EMPLOYEES);
}

function findEmployeeRowByUsername_(username) {
  var sheet = getSheet_(SHEETS.EMPLOYEES);
  var lastRow = sheet.getLastRow();
  if (lastRow < 2) {
    return null;
  }
  var values = sheet.getRange(2, EMPLOYEE_COLUMNS.USERNAME, lastRow - 1, 1).getValues();
  var needle = normalizeLower_(username);
  for (var i = 0; i < values.length; i++) {
    if (normalizeLower_(values[i][0]) === needle) {
      return i + 2;
    }
  }
  return null;
}

function isActiveEmployee_(employee) {
  var active = employee[HEADERS.EMPLOYEES.ACTIVE];
  return active === true || normalizeLower_(active) === 'true' || normalize_(active) === '1';
}
