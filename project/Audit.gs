function appendAudit_(actor, orderNumber, action, field, oldValue, newValue) {
  var sheet = getSheet_(SHEETS.AUDIT);
  sheet.appendRow([
    uuid_('LOG_'),
    orderNumber || '',
    actor && actor.employeeId ? actor.employeeId : '',
    actor && actor.employeeName ? actor.employeeName : '',
    action || '',
    field || '',
    oldValue === undefined || oldValue === null ? '' : String(oldValue),
    newValue === undefined || newValue === null ? '' : String(newValue),
    now_()
  ]);
}

function getAuditLog(token, orderNumber) {
  requirePermission_(token, 'viewAudit');
  var logs = readObjects_(SHEETS.AUDIT, DB.HEADER_ORDER.AUDIT);
  if (orderNumber) {
    logs = logs.filter(function (row) {
      return normalize_(row[HEADERS.AUDIT.ORDER_NUMBER]) === normalize_(orderNumber);
    });
  }
  logs.sort(function (a, b) {
    return new Date(b[HEADERS.AUDIT.TIMESTAMP]).getTime() - new Date(a[HEADERS.AUDIT.TIMESTAMP]).getTime();
  });
  return logs.slice(0, 500);
}
