/**
 * Creates missing contract sheets and validates existing sheets without
 * deleting, moving, or rewriting existing data.
 */
function setupSystem() {
  var ss = getSpreadsheet_();
  var report = buildDatabaseReport_(ss, true);

  if (report.ok) {
    ensureDefaultSettings_(ss, report);
    ensureBaseAdmin_(ss, report);
  }

  report.message = formatDatabaseReport_(report);
  return report;
}

/**
 * Read-only database check. Use this before operations that depend on the
 * contract, especially in future phases.
 */
function getDatabaseStatus() {
  var report = buildDatabaseReport_(getSpreadsheet_(), false);
  report.message = formatDatabaseReport_(report);
  return report;
}

function assertDatabaseReady_() {
  var report = getDatabaseStatus();
  if (!report.ok) {
    throw new Error(report.message);
  }
  return report;
}

function buildDatabaseReport_(ss, createMissing) {
  var report = {
    ok: true,
    checkedAt: new Date(),
    version: DB.VERSION,
    sheets: {},
    extraSheets: [],
    warnings: [],
    errors: []
  };

  var expectedSheetNames = {};
  expectedSheetNames[SHEETS.ORDERS] = true;
  expectedSheetNames[SHEETS.EMPLOYEES] = true;
  expectedSheetNames[SHEETS.AUDIT] = true;
  expectedSheetNames[SHEETS.SETTINGS] = true;

  var allSheets = ss.getSheets();
  for (var i = 0; i < allSheets.length; i++) {
    var sheetName = allSheets[i].getName();
    if (!expectedSheetNames[sheetName]) {
      report.extraSheets.push(sheetName);
    }
  }

  validateContractSheet_(ss, report, 'ORDERS', SHEETS.ORDERS, DB.HEADER_ORDER.ORDERS, createMissing);
  validateContractSheet_(ss, report, 'EMPLOYEES', SHEETS.EMPLOYEES, DB.HEADER_ORDER.EMPLOYEES, createMissing);
  validateContractSheet_(ss, report, 'AUDIT', SHEETS.AUDIT, DB.HEADER_ORDER.AUDIT, createMissing);
  validateContractSheet_(ss, report, 'SETTINGS', SHEETS.SETTINGS, DB.HEADER_ORDER.SETTINGS, createMissing);

  return report;
}

function validateContractSheet_(ss, report, key, sheetName, expectedHeaders, createMissing) {
  var sheet = ss.getSheetByName(sheetName);

  if (!sheet) {
    if (!createMissing) {
      addSheetError_(report, key, sheetName, 'Missing sheet "' + sheetName + '".');
      return;
    }

    sheet = ss.insertSheet(sheetName);
    writeHeaderRow_(sheet, expectedHeaders);
    report.sheets[key] = {
      sheetName: sheetName,
      status: 'created',
      ok: true,
      message: sheetName + ' created with official headers.',
      missingColumns: [],
      wrongColumns: [],
      extraColumns: []
    };
    return;
  }

  if (isSheetCompletelyEmpty_(sheet)) {
    if (!createMissing) {
      addSheetError_(report, key, sheetName, 'Sheet exists but header row is empty.');
      return;
    }

    writeHeaderRow_(sheet, expectedHeaders);
    report.sheets[key] = {
      sheetName: sheetName,
      status: 'initialized',
      ok: true,
      message: sheetName + ' initialized with official headers.',
      missingColumns: [],
      wrongColumns: [],
      extraColumns: []
    };
    return;
  }

  var existingHeaders = readHeaderRow_(sheet, expectedHeaders.length);
  var details = compareHeaders_(existingHeaders, expectedHeaders);
  var isOk = details.missingColumns.length === 0 && details.wrongColumns.length === 0;

  report.sheets[key] = {
    sheetName: sheetName,
    status: isOk ? 'ok' : 'error',
    ok: isOk,
    message: isOk ? sheetName + ' OK.' : sheetName + ' contract mismatch.',
    missingColumns: details.missingColumns,
    wrongColumns: details.wrongColumns,
    extraColumns: details.extraColumns
  };

  if (!isOk) {
    report.ok = false;
    report.errors.push(sheetName + ' contract mismatch.');
  } else {
    freezeAndResizeHeader_(sheet, expectedHeaders.length);
  }
}

function compareHeaders_(existingHeaders, expectedHeaders) {
  var normalizedExisting = [];
  var existingByName = {};
  var missingColumns = [];
  var wrongColumns = [];
  var extraColumns = [];

  for (var i = 0; i < existingHeaders.length; i++) {
    var value = cleanText_(existingHeaders[i]);
    normalizedExisting.push(value);
    if (value) {
      existingByName[value] = i + 1;
    }
  }

  for (var j = 0; j < expectedHeaders.length; j++) {
    var expected = expectedHeaders[j];
    var actual = normalizedExisting[j] || '';

    if (actual === expected) {
      continue;
    }

    if (existingByName[expected]) {
      wrongColumns.push({
        column: columnLetter_(j + 1),
        expected: expected,
        actual: actual,
        foundAtColumn: columnLetter_(existingByName[expected])
      });
    } else {
      missingColumns.push({
        column: columnLetter_(j + 1),
        expected: expected,
        actual: actual
      });
    }
  }

  for (var k = expectedHeaders.length; k < normalizedExisting.length; k++) {
    if (normalizedExisting[k]) {
      extraColumns.push({
        column: columnLetter_(k + 1),
        header: normalizedExisting[k]
      });
    }
  }

  return {
    missingColumns: missingColumns,
    wrongColumns: wrongColumns,
    extraColumns: extraColumns
  };
}

function ensureDefaultSettings_(ss, report) {
  var sheet = ss.getSheetByName(SHEETS.SETTINGS);
  if (!sheet) {
    return;
  }

  var settingsStatus = report.sheets.SETTINGS;
  if (!settingsStatus || !settingsStatus.ok) {
    return;
  }

  var existing = {};
  var lastRow = sheet.getLastRow();
  if (lastRow >= 2) {
    var values = sheet.getRange(2, SETTINGS_COLUMNS.SETTING, lastRow - 1, 2).getValues();
    for (var i = 0; i < values.length; i++) {
      var key = cleanText_(values[i][0]);
      if (!key) {
        continue;
      }
      if (existing[key]) {
        report.warnings.push('Settings has duplicate key "' + key + '". Keeping existing rows unchanged.');
      }
      existing[key] = true;
    }
  }

  var rowsToAppend = [];
  var defaults = DB.SETTINGS_DEFAULTS;
  var keys = Object.keys(defaults);
  for (var j = 0; j < keys.length; j++) {
    var defaultKey = keys[j];
    if (!existing[defaultKey]) {
      rowsToAppend.push([defaultKey, defaults[defaultKey]]);
    }
  }

  if (rowsToAppend.length) {
    sheet.getRange(sheet.getLastRow() + 1, 1, rowsToAppend.length, 2).setValues(rowsToAppend);
    report.warnings.push('Settings defaults added: ' + rowsToAppend.map(function (row) {
      return row[0];
    }).join(', ') + '.');
  }
}

function writeHeaderRow_(sheet, headers) {
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  freezeAndResizeHeader_(sheet, headers.length);
}

function freezeAndResizeHeader_(sheet, width) {
  sheet.setFrozenRows(1);
  sheet.getRange(1, 1, 1, width).setFontWeight('bold');
  sheet.autoResizeColumns(1, width);
}

function readHeaderRow_(sheet, expectedWidth) {
  var width = Math.max(sheet.getLastColumn(), expectedWidth);
  return sheet.getRange(1, 1, 1, width).getValues()[0];
}

function isSheetCompletelyEmpty_(sheet) {
  return sheet.getLastRow() === 0 || (sheet.getLastRow() === 1 && sheet.getLastColumn() === 0);
}

function addSheetError_(report, key, sheetName, message) {
  report.ok = false;
  report.errors.push(message);
  report.sheets[key] = {
    sheetName: sheetName,
    status: 'error',
    ok: false,
    message: message,
    missingColumns: [],
    wrongColumns: [],
    extraColumns: []
  };
}

function formatDatabaseReport_(report) {
  var lines = ['Database Check'];
  appendSheetStatus_(lines, report.sheets.ORDERS);
  appendSheetStatus_(lines, report.sheets.EMPLOYEES);
  appendSheetStatus_(lines, report.sheets.AUDIT);
  appendSheetStatus_(lines, report.sheets.SETTINGS);

  if (report.extraSheets.length) {
    lines.push('! Extra sheets kept unchanged: ' + report.extraSheets.join(', '));
  }

  if (report.warnings.length) {
    for (var i = 0; i < report.warnings.length; i++) {
      lines.push('! ' + report.warnings[i]);
    }
  }

  if (!report.ok) {
    lines.push('');
    lines.push('Operations depending on the database contract must stop until these issues are fixed.');
  }

  return lines.join('\n');
}

function appendSheetStatus_(lines, sheetStatus) {
  if (!sheetStatus) {
    return;
  }

  var prefix = sheetStatus.ok ? '✓ ' : '✗ ';
  lines.push(prefix + sheetStatus.message);

  for (var i = 0; i < sheetStatus.missingColumns.length; i++) {
    var missing = sheetStatus.missingColumns[i];
    lines.push('  Missing column at ' + missing.column + ': "' + missing.expected + '".');
  }

  for (var j = 0; j < sheetStatus.wrongColumns.length; j++) {
    var wrong = sheetStatus.wrongColumns[j];
    lines.push(
      '  Wrong column at ' + wrong.column + ': expected "' + wrong.expected +
      '", found "' + wrong.actual + '". Expected header currently at ' + wrong.foundAtColumn + '.'
    );
  }

  for (var k = 0; k < sheetStatus.extraColumns.length; k++) {
    var extra = sheetStatus.extraColumns[k];
    lines.push('  Extra column at ' + extra.column + ': "' + extra.header + '".');
  }
}

function getSpreadsheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  if (!ss) {
    throw new Error('Open this Apps Script project from the Delish Cake Google Sheet, then run setupSystem().');
  }
  return ss;
}

function cleanText_(value) {
  return value === null || value === undefined ? '' : String(value).trim();
}

function columnLetter_(columnNumber) {
  var letter = '';
  var n = columnNumber;
  while (n > 0) {
    var remainder = (n - 1) % 26;
    letter = String.fromCharCode(65 + remainder) + letter;
    n = Math.floor((n - 1) / 26);
  }
  return letter;
}
