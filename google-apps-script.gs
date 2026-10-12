/**
 * Nhà Bé Học — Google Apps Script
 * Dùng với Google Sheet: Extensions / Tiện ích mở rộng → Apps Script.
 * Lần chạy đầu tiên, hàm setupSheet() sẽ tạo tab DonHang và checkbox quản lý.
 */
const SHEET_NAME = "DonHang";
const HEADERS = [
  "Mã đơn", "Thời gian", "Họ tên", "Số điện thoại", "Địa chỉ",
  "Chi tiết sản phẩm", "Tổng tiền (VND)", "Ghi chú", "Trạng thái giao hàng",
  "Đã giao?", "Trạng thái thanh toán", "Đã thu tiền?"
];

function doGet() {
  return ContentService.createTextOutput("Nha Be Hoc order endpoint is ready.")
    .setMimeType(ContentService.MimeType.TEXT);
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(15000);
    const raw = e && e.postData && e.postData.contents;
    if (!raw) throw new Error("Không có dữ liệu đơn hàng.");
    const order = JSON.parse(raw);
    const required = ["orderId", "customerName", "phone", "address", "items", "total"];
    required.forEach(key => { if (order[key] === undefined || order[key] === null || order[key] === "") throw new Error("Thiếu trường: " + key); });
    if (!Array.isArray(order.items) || !order.items.length) throw new Error("Đơn hàng không có sản phẩm.");
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    if (!ss) throw new Error("Không tìm thấy bảng tính gắn với Apps Script.");
    let sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      sheet.appendRow(HEADERS);
      sheet.setFrozenRows(1);
      sheet.getRange(1,1,1,HEADERS.length).setFontWeight("bold").setBackground("#f6b8c8");
    } else if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS);
      sheet.setFrozenRows(1);
    }
    const items = order.items.map(item =>
      `${item.productName} | ${item.pages} trang | ${item.theme} | SL ${item.quantity} | ${Number(item.subtotal || 0).toLocaleString("vi-VN")}đ`
    ).join("\n");
    const row = [
      String(order.orderId), new Date(), String(order.customerName), String(order.phone),
      String(order.address), items, Number(order.total), String(order.notes || ""),
      "Chưa giao", false, "Chưa thu tiền", false
    ];
    sheet.appendRow(row);
    const r = sheet.getLastRow();
    sheet.getRange(r, 2).setNumberFormat("dd/MM/yyyy HH:mm:ss");
    sheet.getRange(r, 7).setNumberFormat("#,##0");
    sheet.getRange(r, 10).insertCheckboxes().setValue(false);
    sheet.getRange(r, 12).insertCheckboxes().setValue(false);
    sheet.getRange(r, 6).setWrap(true);
    sheet.autoResizeColumns(1, HEADERS.length);
    sheet.setColumnWidth(5, 240);
    sheet.setColumnWidth(6, 330);
    sheet.setColumnWidth(8, 220);
    return ContentService.createTextOutput(JSON.stringify({ok:true, orderId:order.orderId}))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    console.error(err);
    return ContentService.createTextOutput(JSON.stringify({ok:false, error:String(err)}))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    try { lock.releaseLock(); } catch (_) {}
  }
}

/**
 * Optional: run manually from Apps Script editor to create the header/checkbox columns.
 */
function setupSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) sheet = ss.insertSheet(SHEET_NAME);
  if (sheet.getLastRow() === 0) sheet.appendRow(HEADERS);
  sheet.setFrozenRows(1);
  sheet.getRange(1,1,1,HEADERS.length).setFontWeight("bold").setBackground("#f6b8c8");
  sheet.setColumnWidth(5, 240);
  sheet.setColumnWidth(6, 330);
  sheet.setColumnWidth(8, 220);
}
