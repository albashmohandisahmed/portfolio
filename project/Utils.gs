function now_() {
  return new Date();
}

function timezone_() {
  return String(getSetting_('TIMEZONE') || DB.SETTINGS_DEFAULTS.TIMEZONE);
}

function today_() {
  return Utilities.formatDate(now_(), timezone_(), 'yyyy-MM-dd');
}

function uuid_(prefix) {
  return prefix + Utilities.getUuid().replace(/-/g, '').slice(0, 14);
}

function getSheet_(sheetName) {
  assertDatabaseReady_();
  var sheet = getSpreadsheet_().getSheetByName(sheetName);
  if (!sheet) {
    throw new Error('Missing sheet "' + sheetName + '". Run setupSystem().');
  }
  return sheet;
}

function getSheetUnsafe_(sheetName) {
  var sheet = getSpreadsheet_().getSheetByName(sheetName);
  if (!sheet) {
    throw new Error('Missing sheet "' + sheetName + '". Run setupSystem().');
  }
  return sheet;
}

function readObjects_(sheetName, headers) {
  var sheet = getSheet_(sheetName);
  var lastRow = sheet.getLastRow();
  if (lastRow < 2) {
    return [];
  }
  var values = sheet.getRange(2, 1, lastRow - 1, headers.length).getValues();
  var rows = [];
  for (var i = 0; i < values.length; i++) {
    if (!rowHasData_(values[i])) {
      continue;
    }
    rows.push(rowToObject_(values[i], headers, i + 2));
  }
  return rows;
}

function readRowObject_(sheet, rowNumber, headers) {
  var values = sheet.getRange(rowNumber, 1, 1, headers.length).getValues()[0];
  return rowToObject_(values, headers, rowNumber);
}

function rowToObject_(row, headers, rowNumber) {
  var obj = {_row: rowNumber};
  for (var i = 0; i < headers.length; i++) {
    obj[headers[i]] = row[i];
  }
  return obj;
}

function objectToRow_(obj, headers) {
  var row = [];
  for (var i = 0; i < headers.length; i++) {
    row.push(obj[headers[i]] === undefined || obj[headers[i]] === null ? '' : obj[headers[i]]);
  }
  return row;
}

function rowHasData_(row) {
  for (var i = 0; i < row.length; i++) {
    if (row[i] !== '' && row[i] !== null && row[i] !== undefined) {
      return true;
    }
  }
  return false;
}

function normalize_(value) {
  return value === null || value === undefined ? '' : String(value).trim();
}

function normalizeLower_(value) {
  return normalize_(value).toLowerCase();
}

function asNumber_(value) {
  var n = Number(value || 0);
  return isNaN(n) ? 0 : n;
}

function dateKey_(value) {
  if (value instanceof Date) {
    return Utilities.formatDate(value, timezone_(), 'yyyy-MM-dd');
  }
  return normalize_(value).slice(0, 10);
}

function assertOneOf_(value, allowed, label) {
  if (allowed.indexOf(value) === -1) {
    throw new Error(label + ' غير صحيح: ' + value);
  }
}

function getSetting_(key) {
  var sheet = getSheetUnsafe_(SHEETS.SETTINGS);
  var lastRow = sheet.getLastRow();
  if (lastRow < 2) {
    return '';
  }
  var values = sheet.getRange(2, 1, lastRow - 1, 2).getValues();
  for (var i = 0; i < values.length; i++) {
    if (normalize_(values[i][0]) === key) {
      return values[i][1];
    }
  }
  return '';
}

function setSetting_(key, value) {
  var sheet = getSheet_(SHEETS.SETTINGS);
  var lastRow = sheet.getLastRow();
  if (lastRow >= 2) {
    var values = sheet.getRange(2, 1, lastRow - 1, 2).getValues();
    for (var i = 0; i < values.length; i++) {
      if (normalize_(values[i][0]) === key) {
        sheet.getRange(i + 2, SETTINGS_COLUMNS.VALUE).setValue(value);
        return;
      }
    }
  }
  sheet.appendRow([key, value]);
}

function getSettingsMap_() {
  var sheet = getSheet_(SHEETS.SETTINGS);
  var result = {};
  var lastRow = sheet.getLastRow();
  if (lastRow < 2) {
    return result;
  }
  var values = sheet.getRange(2, 1, lastRow - 1, 2).getValues();
  for (var i = 0; i < values.length; i++) {
    var key = normalize_(values[i][0]);
    if (key) {
      result[key] = values[i][1];
    }
  }
  return result;
}

function hashPassword_(password, salt) {
  salt = salt || Utilities.getUuid();
  var bytes = Utilities.computeDigest(
    Utilities.DigestAlgorithm.SHA_256,
    salt + ':' + String(password),
    Utilities.Charset.UTF_8
  );
  var hash = bytes.map(function (b) {
    var n = b < 0 ? b + 256 : b;
    return n.toString(16).padStart(2, '0');
  }).join('');
  return 'sha256$' + salt + '$' + hash;
}

function verifyPassword_(password, storedHash) {
  var parts = normalize_(storedHash).split('$');
  if (parts.length !== 3 || parts[0] !== 'sha256') {
    return false;
  }
  return hashPassword_(password, parts[1]) === storedHash;
}

function publicUser_(employee) {
  return {
    employeeId: normalize_(employee[HEADERS.EMPLOYEES.EMPLOYEE_ID]),
    employeeName: normalize_(employee[HEADERS.EMPLOYEES.EMPLOYEE_NAME]),
    username: normalize_(employee[HEADERS.EMPLOYEES.USERNAME]),
    role: normalize_(employee[HEADERS.EMPLOYEES.ROLE]),
    permissions: DB.PERMISSIONS[normalize_(employee[HEADERS.EMPLOYEES.ROLE])] || {}
  };
}
