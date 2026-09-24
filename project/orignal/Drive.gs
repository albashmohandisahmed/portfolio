function uploadDesignImage(token, orderNumber, fileName, mimeType, base64Data) {
  var user = requirePermission_(token, 'uploadDesign');
  var rowNumber = findOrderRow_(orderNumber);
  if (!rowNumber) {
    throw new Error('الطلب غير موجود.');
  }

  var sheet = getSheet_(SHEETS.ORDERS);
  var order = readRowObject_(sheet, rowNumber, DB.HEADER_ORDER.ORDERS);
  if (!canEditOrder_(user, order)) {
    throw new Error('ليست لديك صلاحية رفع صورة لهذا الطلب.');
  }

  if (!base64Data) {
    throw new Error('لم يتم استلام ملف الصورة.');
  }

  var folder = getDesignFolder_();
  var bytes = Utilities.base64Decode(String(base64Data).replace(/^data:[^,]+,/, ''));
  var safeName = normalize_(orderNumber) + '_' + normalize_(fileName || 'design-image');
  var blob = Utilities.newBlob(bytes, mimeType || 'application/octet-stream', safeName);
  var file = folder.createFile(blob);
  file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);

  var oldValue = order[HEADERS.ORDERS.DESIGN_IMAGE];
  var url = file.getUrl();
  sheet.getRange(rowNumber, ORDER_COLUMNS.DESIGN_IMAGE).setValue(url);
  sheet.getRange(rowNumber, ORDER_COLUMNS.LAST_MODIFIED_BY).setValue(user.employeeId);
  sheet.getRange(rowNumber, ORDER_COLUMNS.LAST_MODIFIED_DATE).setValue(now_());
  appendAudit_(user, orderNumber, 'Edit', HEADERS.ORDERS.DESIGN_IMAGE, oldValue, url);
  return {ok: true, url: url};
}

function getDesignFolder_() {
  var folderId = normalize_(getSetting_('DESIGN_FOLDER_ID'));
  if (folderId) {
    try {
      return DriveApp.getFolderById(folderId);
    } catch (error) {
      setSetting_('DESIGN_FOLDER_ID', '');
    }
  }

  var folder = DriveApp.createFolder('Delish Cake Design Images');
  setSetting_('DESIGN_FOLDER_ID', folder.getId());
  return folder;
}
