/**
 * Delish Cake Orders Management System
 * Phase 1: Database Contract and setup validation.
 *
 * All sheet names, header names, header order, enum values, and setting keys
 * must be changed here first before any application logic changes.
 */

var DB = (function () {
  var SHEETS = Object.freeze({
    ORDERS: 'Orders',
    EMPLOYEES: 'Employees',
    AUDIT: 'AuditLog',
    SETTINGS: 'Settings'
  });

  var HEADERS = Object.freeze({
    ORDERS: Object.freeze({
      ORDER_ID: 'Order ID',
      ORDER_NUMBER: 'Order Number',
      CUSTOMER_NAME: 'Customer Name',
      CUSTOMER_PHONE: 'Customer Phone',
      RECIPIENT_NAME: 'Recipient Name',
      RECIPIENT_PHONE: 'Recipient Phone',
      ORDER_TYPE: 'Order Type',
      PRODUCT: 'Product',
      QUANTITY: 'Quantity',
      SIZE_PERSONS: 'Size / Persons',
      FILLING: 'Filling',
      CAKE_WRITING: 'Cake Writing',
      ADD_ONS: 'Add-ons',
      DESIGN_IMAGE: 'Design Image',
      DELIVERY_PICKUP: 'Delivery / Pickup',
      DELIVERY_ADDRESS: 'Delivery Address',
      DELIVERY_FEE: 'Delivery Fee',
      ORDER_DATE: 'Order Date',
      DELIVERY_DATE: 'Delivery Date',
      DELIVERY_TIME: 'Delivery Time',
      PRODUCT_PRICE: 'Product Price',
      TOTAL: 'Total',
      PAYMENT_METHOD: 'Payment Method',
      PAID_AMOUNT: 'Paid Amount',
      REMAINING_AMOUNT: 'Remaining Amount',
      PAYMENT_STATUS: 'Payment Status',
      ORDER_STATUS: 'Order Status',
      STATUS: 'Order Status',
      ASSIGNED_EMPLOYEE: 'Assigned Employee',
      CREATED_BY: 'Created By',
      CREATED_DATE: 'Created Date',
      LAST_MODIFIED_BY: 'Last Modified By',
      LAST_MODIFIED_DATE: 'Last Modified Date',
      NOTES: 'Notes'
    }),
    EMPLOYEES: Object.freeze({
      EMPLOYEE_ID: 'Employee ID',
      EMPLOYEE_NAME: 'Employee Name',
      PHONE: 'Phone',
      USERNAME: 'Username',
      PASSWORD_HASH: 'Password Hash',
      ROLE: 'Role',
      ACTIVE: 'Active',
      CREATED_DATE: 'Created Date',
      LAST_LOGIN: 'Last Login'
    }),
    AUDIT: Object.freeze({
      LOG_ID: 'Log ID',
      ORDER_NUMBER: 'Order Number',
      EMPLOYEE_ID: 'Employee ID',
      EMPLOYEE_NAME: 'Employee Name',
      ACTION: 'Action',
      FIELD: 'Field',
      OLD_VALUE: 'Old Value',
      NEW_VALUE: 'New Value',
      TIMESTAMP: 'Timestamp'
    }),
    SETTINGS: Object.freeze({
      SETTING: 'Setting',
      VALUE: 'Value'
    })
  });

  var HEADER_ORDER = Object.freeze({
    ORDERS: Object.freeze([
      HEADERS.ORDERS.ORDER_ID,
      HEADERS.ORDERS.ORDER_NUMBER,
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
      HEADERS.ORDERS.TOTAL,
      HEADERS.ORDERS.PAYMENT_METHOD,
      HEADERS.ORDERS.PAID_AMOUNT,
      HEADERS.ORDERS.REMAINING_AMOUNT,
      HEADERS.ORDERS.PAYMENT_STATUS,
      HEADERS.ORDERS.STATUS,
      HEADERS.ORDERS.ASSIGNED_EMPLOYEE,
      HEADERS.ORDERS.CREATED_BY,
      HEADERS.ORDERS.CREATED_DATE,
      HEADERS.ORDERS.LAST_MODIFIED_BY,
      HEADERS.ORDERS.LAST_MODIFIED_DATE,
      HEADERS.ORDERS.NOTES
    ]),
    EMPLOYEES: Object.freeze([
      HEADERS.EMPLOYEES.EMPLOYEE_ID,
      HEADERS.EMPLOYEES.EMPLOYEE_NAME,
      HEADERS.EMPLOYEES.PHONE,
      HEADERS.EMPLOYEES.USERNAME,
      HEADERS.EMPLOYEES.PASSWORD_HASH,
      HEADERS.EMPLOYEES.ROLE,
      HEADERS.EMPLOYEES.ACTIVE,
      HEADERS.EMPLOYEES.CREATED_DATE,
      HEADERS.EMPLOYEES.LAST_LOGIN
    ]),
    AUDIT: Object.freeze([
      HEADERS.AUDIT.LOG_ID,
      HEADERS.AUDIT.ORDER_NUMBER,
      HEADERS.AUDIT.EMPLOYEE_ID,
      HEADERS.AUDIT.EMPLOYEE_NAME,
      HEADERS.AUDIT.ACTION,
      HEADERS.AUDIT.FIELD,
      HEADERS.AUDIT.OLD_VALUE,
      HEADERS.AUDIT.NEW_VALUE,
      HEADERS.AUDIT.TIMESTAMP
    ]),
    SETTINGS: Object.freeze([
      HEADERS.SETTINGS.SETTING,
      HEADERS.SETTINGS.VALUE
    ])
  });

  var SETTINGS_DEFAULTS = Object.freeze({
    SHOP_NAME: 'Delish Cake',
    ORDER_PREFIX: '11_',
    NEXT_ORDER_NUMBER: '1',
    CURRENCY: 'JOD',
    TIMEZONE: 'Asia/Amman',
    CONFIRMATION_TEMPLATE: 'تم تأكيد طلبكم من Delish Cake%0Aرقم الطلب: {{Order Number}}%0Aالمنتج: {{Product}}%0Aتاريخ التسليم: {{Delivery Date}}%0Aوقت التسليم: {{Delivery Time}}%0Aالإجمالي: {{Total}} {{Currency}}',
    DESIGN_FOLDER_ID: ''
  });

  var ENUMS = Object.freeze({
    ROLES: Object.freeze([
      'Admin',
      'Social Media Employee',
      'Sales Employee'
    ]),
    ORDER_STATUSES: Object.freeze([
      'جديد',
      'قيد المتابعة',
      'بانتظار التأكيد',
      'مثبت',
      'قيد التجهيز',
      'جاهز',
      'تم التسليم',
      'ملغي'
    ]),
    PAYMENT_STATUSES: Object.freeze([
      'غير مدفوع',
      'مدفوع جزئيًا',
      'مدفوع بالكامل'
    ]),
    PAYMENT_METHODS: Object.freeze([
      'Cash',
      'Click',
      'PayPal',
      'Western Union',
      'Bank Transfer',
      'Other'
    ]),
    ORDER_TYPES: Object.freeze([
      'كيكة',
      'ميني كيك',
      'بوكس',
      'أخرى'
    ]),
    DELIVERY_TYPES: Object.freeze([
      'توصيل',
      'استلام'
    ]),
    AUDIT_ACTIONS: Object.freeze([
      'Create',
      'Edit',
      'Status Change',
      'Payment Change',
      'Employee Assignment',
      'Cancel',
      'Reactivate'
    ])
  });

  var PERMISSIONS = Object.freeze({
    Admin: Object.freeze({
      manageEmployees: true,
      manageSettings: true,
      viewAllOrders: true,
      editAllOrders: true,
      viewReports: true,
      viewAudit: true,
      managePayments: true,
      uploadDesign: true
    }),
    'Social Media Employee': Object.freeze({
      manageEmployees: false,
      manageSettings: false,
      viewAllOrders: false,
      editAllOrders: false,
      viewReports: false,
      viewAudit: false,
      managePayments: false,
      uploadDesign: true
    }),
    'Sales Employee': Object.freeze({
      manageEmployees: false,
      manageSettings: false,
      viewAllOrders: true,
      editAllOrders: false,
      viewReports: false,
      viewAudit: false,
      managePayments: true,
      uploadDesign: false
    })
  });

  return Object.freeze({
    VERSION: '1.0.0-phase-1',
    SHEETS: SHEETS,
    HEADERS: HEADERS,
    HEADER_ORDER: HEADER_ORDER,
    COLUMNS: Object.freeze({
      ORDERS: Object.freeze(buildColumnMap_(HEADER_ORDER.ORDERS)),
      EMPLOYEES: Object.freeze(buildColumnMap_(HEADER_ORDER.EMPLOYEES)),
      AUDIT: Object.freeze(buildColumnMap_(HEADER_ORDER.AUDIT)),
      SETTINGS: Object.freeze(buildColumnMap_(HEADER_ORDER.SETTINGS))
    }),
    SETTINGS_DEFAULTS: SETTINGS_DEFAULTS,
    ENUMS: ENUMS,
    PERMISSIONS: PERMISSIONS
  });
})();

var SHEETS = DB.SHEETS;
var HEADERS = DB.HEADERS;
var ORDER_COLUMNS = DB.COLUMNS.ORDERS;
var EMPLOYEE_COLUMNS = DB.COLUMNS.EMPLOYEES;
var AUDIT_COLUMNS = DB.COLUMNS.AUDIT;
var SETTINGS_COLUMNS = DB.COLUMNS.SETTINGS;

function buildColumnMap_(headers) {
  var columns = {};
  for (var i = 0; i < headers.length; i++) {
    columns[toConstantKey_(headers[i])] = i + 1;
  }
  if (columns.ORDER_STATUS) {
    columns.STATUS = columns.ORDER_STATUS;
  }
  return columns;
}

function toConstantKey_(header) {
  return String(header)
    .toUpperCase()
    .replace(/\//g, ' ')
    .replace(/[^A-Z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '');
}
