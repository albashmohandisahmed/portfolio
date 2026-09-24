/**
 * Web entry points and small UI helpers for phase 1.
 */

function doGet() {
  return HtmlService.createTemplateFromFile('Index')
    .evaluate()
    .setTitle('Delish Cake Orders')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

function getPhaseOneState() {
  return {
    appName: DB.SETTINGS_DEFAULTS.SHOP_NAME,
    version: DB.VERSION,
    database: getDatabaseStatus(),
    contract: getDatabaseContract_()
  };
}

function runSetupFromUi() {
  return setupSystem();
}

function getSettingsForAdmin(token) {
  requirePermission_(token, 'manageSettings');
  return getSettingsMap_();
}

function saveSettings(token, settings) {
  requirePermission_(token, 'manageSettings');
  settings = settings || {};
  var allowed = Object.keys(DB.SETTINGS_DEFAULTS);
  for (var i = 0; i < allowed.length; i++) {
    var key = allowed[i];
    if (settings[key] !== undefined) {
      setSetting_(key, settings[key]);
    }
  }
  return {ok: true};
}

function getDatabaseContract_() {
  return {
    sheets: SHEETS,
    headers: {
      Orders: DB.HEADER_ORDER.ORDERS,
      Employees: DB.HEADER_ORDER.EMPLOYEES,
      AuditLog: DB.HEADER_ORDER.AUDIT,
      Settings: DB.HEADER_ORDER.SETTINGS
    },
    settingsDefaults: DB.SETTINGS_DEFAULTS,
    enums: DB.ENUMS
  };
}
