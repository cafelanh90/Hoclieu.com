/*
 * Nhà Bé Học — cấu hình website
 * Cập nhật: Tính tiền 1.500đ/trang, ẩn form sau khi gửi và hiển thị thông báo thành công/thất bại kèm SĐT hỗ trợ
 */
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbztOhIx_AbRT4IFpaf08V559fo6geFjbbgVae1YNXCjkK1h-xoKD2iYjyDloCKKDfIP/exec";
const PAGE_OPTIONS = [5, 10, 15, 20];
const PRICE_PER_PAGE = 1500; // Đơn giá 1.500đ / trang

const PRODUCTS = [
  // --- WORKSHEET / TRANG IN ---
  { id: "to-mau-theo-hinh-mau", name: "Tô màu theo hình mẫu", category: "Sáng tạo", type: "worksheet", description: "Bé quan sát mẫu màu và tô theo gợi ý.", image: "images/to-mau-theo-hinh-mau.jpg", icon: "images/to-mau-theo-hinh-mau.jpg" },
  { id: "to-mau-tu-do", name: "Tô màu tự do", category: "Sáng tạo", type: "worksheet", description: "Những bức tranh để bé thỏa sức sáng tạo.", image: "images/to-mau-tu-do.jpg", icon: "images/to-mau-tu-do.jpg" },
  { id: "tap-dem-1-10", name: "Tập đếm 1–10", category: "Toán học", type: "worksheet", description: "Làm quen số từ 1 đến 10 qua hình ảnh đáng yêu.", image: "images/tap-dem-1-10.jpg", icon: "images/tap-dem-1-10.jpg" },
  { id: "be-hoc-dem-va-viet-so", name: "Bé học đếm và viết số", category: "Toán học", type: "worksheet", description: "Làm quen với chữ số, thực hành đếm và tập viết nét số cơ bản.", image: "images/be-hoc-dem-va-viet-so.jpg", icon: "images/be-hoc-dem-va-viet-so.jpg" },
  { id: "tap-cong-pham-vi-10", name: "Tập cộng phạm vi 10", category: "Toán học", type: "worksheet", description: "Bước đầu làm quen với phép cộng.", image: "images/tap-cong-pham-vi-10.jpg", icon: "images/tap-cong-pham-vi-10.jpg" },
  { id: "tap-tru-pham-vi-10", name: "Tập trừ phạm vi 10", category: "Toán học", type: "worksheet", description: "Luyện tập phép trừ qua bài tập trực quan.", image: "images/tap-tru-pham-vi-10.jpg", icon: "images/tap-tru-pham-vi-10.jpg" },
  { id: "tap-dem-10-20", name: "Tập đếm 10–20", category: "Toán học", type: "worksheet", description: "Làm quen số từ 10 đến 20 qua hình ảnh.", image: "images/tap-dem-10-20.jpg", icon: "images/tap-dem-10-20.jpg" },
  { id: "tap-cong-pham-vi-10-20", name: "Tập cộng phạm vi 10–20", category: "Toán học", type: "worksheet", description: "Thực hành phép cộng với các số lớn hơn.", image: "images/tap-cong-pham-vi-10-20.jpg", icon: "images/tap-cong-pham-vi-10-20.jpg" },
  { id: "tap-tru-pham-vi-10-20", name: "Tập trừ phạm vi 10–20", category: "Toán học", type: "worksheet", description: "Luyện phép trừ trong phạm vi 10–20.", image: "images/tap-tru-pham-vi-10-20.jpg", icon: "images/tap-tru-pham-vi-10-20.jpg" },
  { id: "tap-dem-den-100", name: "Tập đếm đến 100", category: "Toán học", type: "worksheet", description: "Khám phá các số đến 100 theo cách dễ hiểu.", image: "images/tap-dem-den-100.jpg", icon: "images/tap-dem-den-100.jpg" },
  { id: "tap-cong-pham-vi-100", name: "Tập cộng phạm vi 100", category: "Toán học", type: "worksheet", description: "Bài tập cộng giúp bé rèn kỹ năng tính toán.", image: "images/tap-cong-pham-vi-100.jpg", icon: "images/tap-cong-pham-vi-100.jpg" },
  { id: "tap-tru-pham-vi-100", name: "Tập trừ phạm vi 100", category: "Toán học", type: "worksheet", description: "Thực hành phép trừ trong phạm vi 100.", image: "images/tap-tru-pham-vi-100.jpg", icon: "images/tap-tru-pham-vi-100.jpg" },
  { id: "lam-quen-chu-cai-viet-nam", name: "Làm quen chữ cái Việt Nam", category: "Tập viết", type: "worksheet", description: "Làm quen và luyện viết chữ cái tiếng Việt.", image: "images/lam-quen-chu-cai-viet-nam.jpg", icon: "images/lam-quen-chu-cai-viet-nam.jpg" },
  { id: "tap-viet-chu-cai-tieng-anh", name: "Tập viết chữ cái tiếng Anh", category: "Tập viết", type: "worksheet", description: "Nhận diện và luyện viết chữ cái tiếng Anh.", image: "images/tap-viet-chu-cai-tieng-anh.jpg", icon: "images/tap-viet-chu-cai-tieng-anh.jpg" },
  { id: "tap-viet-so", name: "Tập viết số", category: "Tập viết", type: "worksheet", description: "Luyện nét và viết các chữ số.", image: "images/tap-viet-so.jpg", icon: "images/tap-viet-so.jpg" },
  { id: "tu-duy-hinh-khoi", name: "Tư duy hình khối và không gian", category: "Tư duy", type: "worksheet", description: "Nhận diện hình dạng và rèn luyện tư duy về không gian.", image: "images/tu-duy-hinh-khoi.jpg", icon: "images/tu-duy-hinh-khoi.jpg" },
  { id: "tro-choi-me-cung", name: "Trò chơi mê cung", category: "Tư duy", type: "worksheet", description: "Tìm đường đi và luyện khả năng quan sát.", image: "images/tro-choi-me-cung.jpg", icon: "images/tro-choi-me-cung.jpg" },
  { id: "sudoku-hinh-anh", name: "Sudoku hình ảnh", category: "Tư duy", type: "worksheet", description: "Sắp xếp hình ảnh theo quy luật đơn giản.", image: "images/sudoku-hinh-anh.jpg", icon: "images/sudoku-hinh-anh.jpg" },
  { id: "tro-choi-tu-duy-logic", name: "Trò chơi rèn luyện tư duy logic", category: "Tư duy", type: "worksheet", description: "Những thử thách vui để bé suy luận.", image: "images/tro-choi-tu-duy-logic.jpg", icon: "images/tro-choi-tu-duy-logic.jpg" },
  { id: "noi-bong-va-hinh-anh", name: "Nối bóng và hình ảnh", category: "Tư duy", type: "worksheet", description: "Tìm hình phù hợp với chiếc bóng tương ứng.", image: "images/noi-bong-va-hinh-anh.jpg", icon: "images/noi-bong-va-hinh-anh.jpg" },
  { id: "phan-biet-so-chan-le", name: "Phân biệt số chẵn, số lẻ", category: "Toán học", type: "worksheet", description: "Nhận biết số chẵn và số lẻ qua ví dụ.", image: "images/phan-biet-so-chan-le.jpg", icon: "images/phan-biet-so-chan-le.jpg" },
  { id: "so-sanh-so-lon-be", name: "So sánh số lớn, số bé", category: "Toán học", type: "worksheet", description: "Luyện so sánh và sắp xếp các số.", image: "images/so-sanh-so-lon-be.jpg", icon: "images/so-sanh-so-lon-be.jpg" }
];

const $ = (selector, root = document) => root.querySelector(selector); const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const escapeHtml = value => String(value ?? "").replace(/[&<>"']/g, ch => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch]));
const formatVND = num => new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(num);

let activeCategory = "all";
let cart = [];
let orderBusy = false;

function productImageMarkup(p, extraClass = "") {
  return `<img class="${extraClass}" src="${escapeHtml(p.image)}" alt="${escapeHtml(p.name)}" loading="lazy" onerror="this.style.display='none';this.nextElementSibling.classList.remove('hidden')"><div class="image-fallback hidden"><img src="${escapeHtml(p.icon)}" alt="${escapeHtml(p.name)}" class="icon-img"><strong>${escapeHtml(p.name)}</strong><small>Ảnh minh họa sẽ được cập nhật</small></div>`;
}

function renderProducts() {
  const grid = $("#productGrid");
  if (!grid) return;

  const searchInput = $("#searchInput");
  const countEl = $("#productCount");
  const emptyState = $("#emptyState");

  const term = (searchInput ? searchInput.value : "").trim().toLocaleLowerCase("vi");
  const shown = PRODUCTS.filter(p => (activeCategory === "all" || p.category === activeCategory) &&
    `${p.name} ${p.description} ${p.category}`.toLocaleLowerCase("vi").includes(term));
  
  grid.innerHTML = shown.map(p => {
    let optionsHTML = `
      <label>Số lượng trang
        <select class="page-select" aria-label="Số trang cho ${escapeHtml(p.name)}">
          ${PAGE_OPTIONS.map(pg => `<option value="${pg}">${pg} trang (${formatVND(pg * PRICE_PER_PAGE)})</option>`).join("")}
        </select>
      </label>
    `;

    return `
      <article class="product-card" data-product-id="${escapeHtml(p.id)}">
        <div class="product-image-wrap">${productImageMarkup(p,"product-image")}</div>
        <div class="product-card-body">
          <span class="product-category">${escapeHtml(p.category)}</span>
          <h3>${escapeHtml(p.name)}</h3>
          <p>${escapeHtml(p.description)}</p>
          <div style="font-size:0.85rem; color:#e65100; font-weight:600; margin:6px 0;">Đơn giá: 1.500đ / trang</div>
          <div class="product-options">
            ${optionsHTML}
            <button class="add-button" data-add="${escapeHtml(p.id)}">＋ Thêm vào giỏ hàng</button>
          </div>
        </div>
      </article>`;
  }).join("");
  
  if (countEl) countEl.textContent = shown.length;
  if (emptyState) emptyState.classList.toggle("hidden", shown.length > 0);
}

function addToCart(id, card) {
  const p = PRODUCTS.find(item => item.id === id);
  if (!p) return;

  const pages = Number($(".page-select", card).value);
  const key = `${id}|${pages}`;

  const found = cart.find(item => item.key === key);
  if (found) {
    found.qty += 1;
  } else {
    cart.push({
      key,
      id: p.id,
      name: p.name,
      category: p.category,
      image: p.image,
      icon: p.icon,
      pages,
      qty: 1
    });
  }

  renderCart();
  openCart();
}

function calculateCartTotal() {
  return cart.reduce((sum, item) => sum + (item.pages * item.qty * PRICE_PER_PAGE), 0);
}

function renderCart() {
  const count = cart.reduce((sum,item) => sum + item.qty, 0);
  if ($("#cartCount")) $("#cartCountent") ? $("#cartCountent").textContent = count : $("#cartCount").textContent = count;
  if ($("#drawerCount")) $("#drawerCount").textContent = `(${count})`;
  
  const totalMoney = calculateCartTotal();
  const cartItemsEl = $("#cartItems");
  
  if (cartItemsEl) {
    cartItemsEl.innerHTML = cart.map(item => {
      const itemSubtotal = item.pages * item.qty * PRICE_PER_PAGE;
      return `
        <article class="cart-item">
          <div class="cart-thumb"><img src="${escapeHtml(item.image)}" alt="" onerror="this.src='${escapeHtml(item.icon)}'"></div>
          <div style="flex:1;">
            <h4>${escapeHtml(item.name)}</h4>
            <small>${item.pages} trang · ${formatVND(item.pages * PRICE_PER_PAGE)}/bộ</small>
            <div class="cart-item-actions">
              <button class="qty-btn" data-qty="${escapeHtml(item.key)}" data-delta="-1" aria-label="Giảm">−</button>
              <span>${item.qty}</span>
              <button class="qty-btn" data-qty="${escapeHtml(item.key)}" data-delta="1" aria-label="Tăng">+</button>
              <button class="remove-btn" data-remove="${escapeHtml(item.key)}">Xóa</button>
            </div>
          </div>
          <div style="font-weight:bold; font-size:0.9rem;">${formatVND(itemSubtotal)}</div>
        </article>`;
    }).join("");
  }

  let cartSummary = $("#cartSummary");
  if (!cartSummary && $("#cartBottom")) {
    cartSummary = document.createElement("div");
    cartSummary.id = "cartSummary";
    $("#cartBottom").prepend(cartSummary);
  }
  if (cartSummary) {
    cartSummary.innerHTML = `
      <div style="display:flex; justify-content:space-between; font-weight:bold; font-size:1.1rem; color:#2e7d32; margin-bottom:10px;">
        <span>Tổng cộng:</span>
        <span>${formatVND(totalMoney)}</span>
      </div>
    `;
  }

  if ($("#cartEmpty")) $("#cartEmpty").classList.toggle("hidden", cart.length > 0);
  if ($("#cartItems")) $("#cartItems").classList.toggle("hidden", cart.length === 0);
  if ($("#cartBottom")) $("#cartBottom").classList.toggle("hidden", cart.length === 0);
}

function openCart() {
  const drawer = $("#cartDrawer");
  if (drawer) {
    drawer.classList.add("open");
    drawer.setAttribute("aria-hidden","false");
  }
  if ($("#overlay")) $("#overlay").classList.remove("hidden");
  document.body.style.overflow = "hidden";
}

function closeCart() {
  const drawer = $("#cartDrawer");
  if (drawer) {
    drawer.classList.remove("open");
    drawer.setAttribute("aria-hidden","true");
  }
  if ($("#overlay")) $("#overlay").classList.add("hidden");
  document.body.style.overflow = "";
}

function openCheckout() {
  if (!cart.length) return;
  closeCart();
  
  // Đảm bảo hiện lại form và ẩn màn hình thông báo cũ khi mở modal
  const formWrap = $("#checkoutForm") \vert{}\vert{} $("#checkoutFormWrap");
  if (formWrap) {
    formWrap.style.display = "block";
    formWrap.reset ? formWrap.reset() : null;
  }
  const successBox = $("#successScreen") \vert{}\vert{} $("#orderSuccessBox");
  if (successBox) successBox.classList.add("hidden");

  if ($("#checkoutModal")) $("#checkoutModal").classList.remove("hidden");
  document.body.style.overflow = "hidden";
}

function closeCheckout() {
  if ($("#checkoutModal")) $("#checkoutModal").classList.add("hidden");
  document.body.style.overflow = "";
}

function buildOrder(form) {
  const fd = new FormData(form);
  const orderId = `NBH-${Date.now().toString().slice(-9)}`;
  const totalMoney = calculateCartTotal();

  const items = cart.map(item => ({
    productId: item.id, 
    productName: item.name, 
    category: item.category, 
    pages: item.pages,
    subtotal: item.pages * item.qty * PRICE_PER_PAGE,
    quantity: item.qty
  }));

  return {
    orderId, 
    createdAt: new Date().toISOString(),
    customerName: String(fd.get("customerName") || "").trim(),
    phone: String(fd.get("phone") || "").trim(),
    address: String(fd.get("address") || "").trim(),
    notes: String(fd.get("notes") || "").trim(),
    items, 
    itemSummary: items.map(i => `${i.productName} (${i.pages} trang) x${i.quantity}`).join(" | "),
    total: formatVND(totalMoney),
    deliveryStatus: "Chưa giao", 
    paymentStatus: "Chưa thu tiền"
  };
}

async function submitOrder(event) {
  event.preventDefault();
  if (orderBusy || !cart.length) return;

  const form = event.currentTarget;
  const order = buildOrder(form);
  const button = $("#submitOrder");
  
  if (!GOOGLE_SCRIPT_URL.trim()) {
    alert("Website chưa được cấu hình Google Sheets.");
    return;
  }

  orderBusy = true;
  if (button) {
    button.disabled = true;
    button.textContent = "Đang gửi đơn...";
  }

  try {
    await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST", 
      mode: "no-cors", 
      redirect: "follow",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(order)
    });

    // --- 1. TỰ ĐỘNG TẮT KHUNG NHẬP THÔNG TIN ---
    if (form) form.style.display = "none";
    let formWrap = $("#checkoutFormWrap");
    if (formWrap) formWrap.style.display = "none";

    // --- 2. HIỂN THỊ MÀN HÌNH THÔNG BÁO HOÀN THÀNH ---
    let successScreen = $("#successScreen") \vert{}\vert{} $("#orderSuccessBox");
    if (!successScreen) {
      successScreen = document.createElement("div");
      successScreen.id = "successScreen";
      successScreen.className = "success-screen";
      const modalContent = $(".checkout-modal") \vert{}\vert{} $(".modal-wrap");
      if (modalContent) modalContent.appendChild(successScreen);
    }

    successScreen.classList.remove("hidden");
    successScreen.style.display = "block";
    successScreen.innerHTML = `
      <div style="text-align: center; padding: 20px 10px;">
        <div style="font-size: 3.5rem; margin-bottom: 10px;">🎉</div>
        <h2 style="color: #2e7d32; font-size: 1.5rem; font-weight: bold; margin-bottom: 8px;">ĐẶT HÀNG THÀNH CÔNG!</h2>
        <p style="font-size: 1rem; color: #444; margin-bottom: 12px;">Đơn hàng mã <strong style="color: #d32f2f;">${order.orderId}</strong> đã hoàn thành. Khách hàng vui lòng chờ giao hàng trong <strong>1-2 ngày</strong> tới nhé!</p>
        
        <div style="background: #f9f9f9; padding: 12px; border-radius: 8px; text-align: left; border: 1px solid #e0e0e0; font-size: 0.9rem; margin-bottom: 15px;">
          <p><strong>Người nhận:</strong> ${escapeHtml(order.customerName)}</p>
          <p><strong>Số điện thoại:</strong> ${escapeHtml(order.phone)}</p>
          <p><strong>Địa chỉ:</strong> ${escapeHtml(order.address)}</p>
          <p><strong>Tổng tiền:</strong> <span style="color: #2e7d32; font-weight: bold;">${order.total}</span></p>
        </div>

        <button onclick="closeCheckout()" class="button primary" style="padding: 10px 25px; border-radius: 20px; cursor: pointer;">Đóng cửa sổ</button>
      </div>
    `;

    cart = [];
    renderCart();
    form.reset();

  } catch (error) {
    // --- XỬ LÝ KHI GỬI THẤT BẠI ---
    let successScreen = $("#successScreen") \vert{}\vert{} $("#orderSuccessBox");
    if (!successScreen) {
      successScreen = document.createElement("div");
      successScreen.id = "successScreen";
      successScreen.className = "success-screen";
      const modalContent = $(".checkout-modal") \vert{}\vert{} $(".modal-wrap");
      if (modalContent) modalContent.appendChild(successScreen);
    }

    if (form) form.style.display = "none";
    successScreen.classList.remove("hidden");
    successScreen.style.display = "block";
    successScreen.innerHTML = `
      <div style="text-align: center; padding: 20px 10px;">
        <div style="font-size: 3rem; margin-bottom: 10px;">⚠️</div>
        <h2 style="color: #d32f2f; font-size: 1.4rem; font-weight: bold; margin-bottom: 8px;">GỬI ĐƠN CHƯA THÀNH CÔNG</h2>
        <p style="font-size: 1rem; color: #444; margin-bottom: 15px; line-height: 1.5;">
          Do lỗi kết nối, hệ thống chưa ghi nhận được đơn hàng tự động.<br>
          Quý khách vui lòng liên hệ trực tiếp số điện thoại <a href="tel:0949648329" style="color: #e65100; font-weight: bold; text-decoration: underline;">0949.648.329</a> để đặt hàng nhanh chóng nhé!
        </p>
        <button onclick="closeCheckout()" class="button primary" style="padding: 10px 25px; border-radius: 20px; cursor: pointer;">Đóng cửa sổ</button>
      </div>
    `;
  } finally {
    orderBusy = false;
    if (button) {
      button.disabled = false;
      button.innerHTML = 'Gửi đơn hàng <span>→</span>';
    }
  }
}

function initApp() {
  const productGrid = $("#productGrid");
  if (!productGrid) return;

  productGrid.addEventListener("click", event => {
    const button = event.target.closest("[data-add]");
    if (button) addToCart(button.dataset.add, button.closest(".product-card"));
  });

  const searchInput = $("#searchInput");
  if (searchInput) searchInput.addEventListener("input", renderProducts);

  const cartItems = $("#cartItems");
  if (cartItems) {
    cartItems.addEventListener("click", event => {
      const qtyButton = event.target.closest("[data-qty]");
      const removeButton = event.target.closest("[data-remove]");
      if (qtyButton) {
        const item = cart.find(i => i.key === qtyButton.dataset.qty);
        if (item) item.qty += Number(qtyButton.dataset.delta);
        cart = cart.filter(i => i.qty > 0);
        renderCart();
      }
      if (removeButton) {
        cart = cart.filter(i => i.key !== removeButton.dataset.remove);
        renderCart();
      }
    });
  }

  if ($("#openCart")) $("#openCart").addEventListener("click", openCart);
  if ($("#closeCart")) $("#closeCart").addEventListener("click", closeCart);
  if ($("#overlay")) $("#overlay").addEventListener("click", closeCart);
  if ($("#continueShopping")) $("#continueShopping").addEventListener("click", closeCart);
  if ($("#goCheckout")) $("#goCheckout").addEventListener("click", openCheckout);
  if ($("#closeCheckout")) $("#closeCheckout").addEventListener("click", closeCheckout);
  
  const checkoutModal = $("#checkoutModal");
  if (checkoutModal) {
    checkoutModal.addEventListener("click", event => { if (event.target === checkoutModal) closeCheckout(); });
  }

  const checkoutForm = $("#checkoutForm");
  if (checkoutForm) checkoutForm.addEventListener("submit", submitOrder);

  const menuToggle = $("#menuToggle");
  const mainNav = $("#mainNav");
  if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", () => mainNav.classList.toggle("open"));
    mainNav.addEventListener("click", event => { if (event.target.closest("a")) mainNav.classList.remove("open"); });
  }

  document.addEventListener("keydown", event => { if (event.key === "Escape") { closeCart(); closeCheckout(); } });
  
  const yearEl = $("#year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  renderProducts();
  renderCart();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initApp);
} else {
  initApp();
}
