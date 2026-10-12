/*
 * Nhà Bé Học — cấu hình website
 * Cập nhật: 10 trang = 15.000đ, 20 trang = 25.000đ (giảm 5.000đ)
 */
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbztOhIx_AbRT4IFpaf08V559fo6geFjbbgVae1YNXCjkK1h-xoKD2iYjyDloCKKDfIP/exec"; // Dán URL Web App kết thúc bằng /exec tại đây.
const THEMES = ["Con Vật", "Công Chúa", "Bánh Kẹo", "Kem", "Phương tiện giao thông", "Mix nhiều chủ đề"];
const PRODUCTS = [
  { id: "to-mau-theo-hinh-mau", name: "Tô màu theo hình mẫu", category: "Sáng tạo", description: "Bé quan sát mẫu màu và tô theo gợi ý.", image: "images/to-mau-theo-hinh-mau.jpg", price10: 15000, icon: "🎨" },
  { id: "to-mau-tu-do", name: "Tô màu tự do", category: "Sáng tạo", description: "Những bức tranh để bé thỏa sức sáng tạo.", image: "images/to-mau-tu-do.jpg", price10: 15000, icon: "🖍️" },
  { id: "tap-dem-1-10", name: "Tập đếm 1–10", category: "Toán học", description: "Làm quen số từ 1 đến 10 qua hình ảnh đáng yêu.", image: "images/tap-dem-1-10.jpg", price10: 15000, icon: "🔢" },
  { id: "tap-cong-pham-vi-10", name: "Tập cộng phạm vi 10", category: "Toán học", description: "Bước đầu làm quen với phép cộng.", image: "images/tap-cong-pham-vi-10.jpg", price10: 15000, icon: "➕" },
  { id: "tap-tru-pham-vi-10", name: "Tập trừ phạm vi 10", category: "Toán học", description: "Luyện tập phép trừ qua bài tập trực quan.", image: "images/tap-tru-pham-vi-10.jpg", price10: 15000, icon: "➖" },
  { id: "tap-dem-10-20", name: "Tập đếm 10–20", category: "Toán học", description: "Làm quen số từ 10 đến 20 qua hình ảnh.", image: "images/tap-dem-10-20.jpg", price10: 15000, icon: "🔟" },
  { id: "tap-cong-pham-vi-10-20", name: "Tập cộng phạm vi 10–20", category: "Toán học", description: "Thực hành phép cộng với các số lớn hơn.", image: "images/tap-cong-pham-vi-10-20.jpg", price10: 15000, icon: "🧮" },
  { id: "tap-tru-pham-vi-10-20", name: "Tập trừ phạm vi 10–20", category: "Toán học", description: "Luyện phép trừ trong phạm vi 10–20.", image: "images/tap-tru-pham-vi-10-20.jpg", price10: 15000, icon: "➖" },
  { id: "tap-dem-den-100", name: "Tập đếm đến 100", category: "Toán học", description: "Khám phá các số đến 100 theo cách dễ hiểu.", image: "images/tap-dem-den-100.jpg", price10: 15000, icon: "💯" },
  { id: "tap-cong-pham-vi-100", name: "Tập cộng phạm vi 100", category: "Toán học", description: "Bài tập cộng giúp bé rèn kỹ năng tính toán.", image: "images/tap-cong-pham-vi-100.jpg", price10: 15000, icon: "➕" },
  { id: "tap-tru-pham-vi-100", name: "Tập trừ phạm vi 100", category: "Toán học", description: "Thực hành phép trừ trong phạm vi 100.", image: "images/tap-tru-pham-vi-100.jpg", price10: 15000, icon: "➖" },
  { id: "tap-viet-chu-cai-viet-nam", name: "Tập viết chữ cái Việt Nam", category: "Tập viết", description: "Làm quen và luyện viết chữ cái tiếng Việt.", image: "images/tap-viet-chu-cai-viet-nam.jpg", price10: 15000, icon: "🔤" },
  { id: "tap-viet-chu-cai-tieng-anh", name: "Tập viết chữ cái tiếng Anh", category: "Tập viết", description: "Nhận diện và luyện viết chữ cái tiếng Anh.", image: "images/tap-viet-chu-cai-tieng-anh.jpg", price10: 15000, icon: "ABC" },
  { id: "tap-viet-so", name: "Tập viết số", category: "Tập viết", description: "Luyện nét và viết các chữ số.", image: "images/tap-viet-so.jpg", price10: 15000, icon: "✏️" },
  { id: "tu-duy-hinh-khoi", name: "Tư duy hình khối", category: "Tư duy", description: "Nhận diện hình dạng và rèn tư duy không gian.", image: "images/tu-duy-hinh-khoi.jpg", price10: 15000, icon: "🔷" },
  { id: "tro-choi-me-cung", name: "Trò chơi mê cung", category: "Tư duy", description: "Tìm đường đi và luyện khả năng quan sát.", image: "images/tro-choi-me-cung.jpg", price10: 15000, icon: "🌀" },
  { id: "sudoku-hinh-anh", name: "Sudoku hình ảnh", category: "Tư duy", description: "Sắp xếp hình ảnh theo quy luật đơn giản.", image: "images/sudoku-hinh-anh.jpg", price10: 15000, icon: "🧩" },
  { id: "tro-choi-tu-duy-logic", name: "Trò chơi rèn luyện tư duy logic", category: "Tư duy", description: "Những thử thách vui để bé suy luận.", image: "images/tro-choi-tu-duy-logic.jpg", price10: 15000, icon: "🧠" },
  { id: "noi-bong-va-hinh-anh", name: "Nối bóng và hình ảnh", category: "Tư duy", description: "Tìm hình phù hợp với chiếc bóng tương ứng.", image: "images/noi-bong-va-hinh-anh.jpg", price10: 15000, icon: "🌤️" },
  { id: "phan-biet-so-chan-le", name: "Phân biệt số chẵn, số lẻ", category: "Toán học", description: "Nhận biết số chẵn và số lẻ qua ví dụ.", image: "images/phan-biet-so-chan-le.jpg", price10: 15000, icon: "🔢" },
  { id: "so-sanh-so-lon-be", name: "So sánh số lớn, số bé", category: "Toán học", description: "Luyện so sánh và sắp xếp các số.", image: "images/so-sanh-so-lon-be.jpg", price10: 15000, icon: "⚖️" }
];

const $ = (selector, root = document) => root.querySelector(selector); const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const money = n => new Intl.NumberFormat("vi-VN", {style:"currency",currency:"VND",maximumFractionDigits:0}).format(n);
const escapeHtml = value => String(value ?? "").replace(/[&<>"']/g, ch => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch]));
let activeCategory = "all";
let cart = [];
let orderBusy = false;

function productImageMarkup(p, extraClass = "") {
  return `<img class="${extraClass}" src="${escapeHtml(p.image)}" alt="${escapeHtml(p.name)}" loading="lazy" onerror="this.style.display='none';this.nextElementSibling.classList.remove('hidden')"><div class="image-fallback hidden"><span class="placeholder-icon">${escapeHtml(p.icon)}</span><strong>${escapeHtml(p.name)}</strong><small>Ảnh minh họa sẽ được cập nhật</small></div>`;
}
function renderProducts() {
  const term = ($("#searchInput").value || "").trim().toLocaleLowerCase("vi");
  const shown = PRODUCTS.filter(p => (activeCategory === "all" || p.category === activeCategory) &&
    `${p.name} ${p.description} ${p.category}`.toLocaleLowerCase("vi").includes(term));
  $("#productGrid").innerHTML = shown.map(p => `
    <article class="product-card" data-product-id="${escapeHtml(p.id)}">
      <div class="product-image-wrap">${productImageMarkup(p,"product-image")}</div>
      <div class="product-card-body">
        <span class="product-category">${escapeHtml(p.category)}</span>
        <h3>${escapeHtml(p.name)}</h3>
        <p>${escapeHtml(p.description)}</p>
        <div class="price-line"><strong>${money(p.price10)}</strong><small>/ 10 trang</small></div>
        <div class="product-options">
          <label>Số lượng trang
            <select class="page-select" aria-label="Số trang cho ${escapeHtml(p.name)}">
              <option value="10">10 trang — ${money(p.price10)}</option>
              <option value="20">20 trang — 25.000 đ</option>
            </select>
          </label>
          <label>Chủ đề minh họa
            <select class="theme-select" aria-label="Chủ đề minh họa cho ${escapeHtml(p.name)}">
              ${THEMES.map(t => `<option value="${escapeHtml(t)}">${escapeHtml(t)}</option>`).join("")}
            </select>
          </label>
          <button class="add-button" data-add="${escapeHtml(p.id)}">＋ Thêm vào giỏ hàng</button>
        </div>
      </div>
    </article>`).join("");
  $("#productCount").textContent = shown.length;
  $("#emptyState").classList.toggle("hidden", shown.length > 0);
}
function addToCart(id, card) {
  const p = PRODUCTS.find(item => item.id === id);
  if (!p) return;
  const pages = Number($(".page-select", card).value);
  const theme = $(".theme-select", card).value;
  const key = `${id}|${pages}|${theme}`;
  
  // Tính giá: 10 trang = 15000đ, 20 trang = 25000đ cố định
  let unitPrice = p.price10;
  if (pages === 20) {
    unitPrice = 25000;
  }

  const found = cart.find(item => item.key === key);
  if (found) found.qty += 1;
  else cart.push({key, id, name:p.name, category:p.category, image:p.image, icon:p.icon, pages, theme, unitPrice:unitPrice, qty:1});
  renderCart();
  openCart();
}
function cartTotal() { return cart.reduce((sum,item) => sum + item.unitPrice * item.qty, 0); }
function renderCart() {
  const count = cart.reduce((sum,item) => sum + item.qty, 0);
  $("#cartCount").textContent = count;
  $("#drawerCount").textContent = `(${count})`;
  $("#cartTotal").textContent = money(cartTotal());
  $("#checkoutTotal").textContent = money(cartTotal());
  $("#cartItems").innerHTML = cart.map(item => `
    <article class="cart-item">
      <div class="cart-thumb"><img src="${escapeHtml(item.image)}" alt="" onerror="this.style.display='none';this.parentElement.textContent='${escapeHtml(item.icon)}'"></div>
      <div><h4>${escapeHtml(item.name)}</h4><small>${item.pages} trang · ${escapeHtml(item.theme)}</small>
        <div class="cart-item-actions"><button class="qty-btn" data-qty="${escapeHtml(item.key)}" data-delta="-1" aria-label="Giảm số lượng">−</button><span>${item.qty}</span><button class="qty-btn" data-qty="${escapeHtml(item.key)}" data-delta="1" aria-label="Tăng số lượng">+</button><button class="remove-btn" data-remove="${escapeHtml(item.key)}">Xóa</button></div>
      </div><strong>${money(item.unitPrice * item.qty)}</strong>
    </article>`).join("");
  $("#cartEmpty").classList.toggle("hidden", cart.length > 0);
  $("#cartItems").classList.toggle("hidden", cart.length === 0);
  $("#cartBottom").classList.toggle("hidden", cart.length === 0);
}
function openCart() {
  $("#cartDrawer").classList.add("open");
  $("#cartDrawer").setAttribute("aria-hidden","false");
  $("#overlay").classList.remove("hidden");
  document.body.style.overflow = "hidden";
}
function closeCart() {
  $("#cartDrawer").classList.remove("open");
  $("#cartDrawer").setAttribute("aria-hidden","true");
  $("#overlay").classList.add("hidden");
  document.body.style.overflow = "";
}
function openCheckout() {
  if (!cart.length) return;
  closeCart();
  $("#formMessage").textContent = "";
  $("#formMessage").className = "form-message";
  $("#checkoutModal").classList.remove("hidden");
  document.body.style.overflow = "hidden";
}
function closeCheckout() {
  $("#checkoutModal").classList.add("hidden");
  document.body.style.overflow = "";
}
function buildOrder(form) {
  const fd = new FormData(form);
  const orderId = `NBH-${Date.now().toString().slice(-9)}`;
  const items = cart.map(item => ({
    productId:item.id, productName:item.name, category:item.category, pages:item.pages,
    theme:item.theme, quantity:item.qty, unitPrice:item.unitPrice, subtotal:item.unitPrice*item.qty
  }));
  return {
    orderId, createdAt:new Date().toISOString(),
    customerName:String(fd.get("customerName") || "").trim(),
    phone:String(fd.get("phone") || "").trim(),
    address:String(fd.get("address") || "").trim(),
    notes:String(fd.get("notes") || "").trim(),
    items, itemSummary:items.map(i=>`${i.productName} (${i.pages} trang, ${i.theme}) x${i.quantity}`).join(" | "),
    total:cartTotal(), currency:"VND", deliveryStatus:"Chưa giao", paymentStatus:"Chưa thu tiền"
  };
}
async function submitOrder(event) {
  event.preventDefault();
  if (orderBusy || !cart.length) return;
  const form = event.currentTarget;
  const order = buildOrder(form);
  const message = $("#formMessage");
  const button = $("#submitOrder");
  if (!GOOGLE_SCRIPT_URL.trim()) {
    message.className = "form-message error";
    message.textContent = "Website chưa được cấu hình Google Sheets. Đơn chưa được gửi. Vui lòng liên hệ shop hoặc cấu hình URL trong script.js.";
    return;
  }
  orderBusy = true;
  button.disabled = true;
  button.textContent = "Đang gửi đơn...";
  message.className = "form-message";
  try {
    await fetch(GOOGLE_SCRIPT_URL, {
      method:"POST", mode:"no-cors", redirect:"follow",
      headers:{"Content-Type":"text/plain;charset=utf-8"},
      body:JSON.stringify(order)
    });
    message.className = "form-message success
