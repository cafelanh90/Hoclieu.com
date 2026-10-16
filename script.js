/*
 * Nhà Bé Học — cấu hình website
 * Cập nhật: Mở rộng bán Worksheet & Học liệu Nam châm / Routine cho bé
 */
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbztOhIx_AbRT4IFpaf08V559fo6geFjbbgVae1YNXCjkK1h-xoKD2iYjyDloCKKDfIP/exec";
const THEMES = ["Con Vật", "Công Chúa", "Bánh Kẹo", "Kem", "Phương tiện giao thông", "Mix nhiều chủ đề"];
const PAGE_OPTIONS = [5, 10, 15, 20];

const PRODUCTS = [
  // --- HỌC LIỆU NAM CHÂM & ROUTINE HÀNG NGÀY ---
  { 
    id: "bang-routine-hang-ngay", 
    name: "Bảng Routine nếp sống hàng ngày", 
    category: "Routine & Nam châm", 
    type: "magnet",
    description: "Bảng nam châm trực quan giúp bé tự giác thực hiện các hoạt động thức dậy, đánh răng, đi học, làm bài tập...", 
    image: "images/bang-routine-hang-ngay.jpg", 
    icon: "images/bang-routine-hang-ngay.jpg",
    options: ["Bộ cơ bản (20 thẻ hoạt động)", "Bộ nâng cao (35 thẻ hoạt động)", "Bộ đầy đủ + Bảng treo nam châm"]
  },
  { 
    id: "bo-nam-cham-chu-cai", 
    name: "Bộ chữ cái tiếng Việt nam châm", 
    category: "Routine & Nam châm", 
    type: "magnet",
    description: "Bộ chữ cái dán nam châm màu sắc rực rỡ, giúp bé ghép chữ trực quan trên bảng hoặc tủ lạnh.", 
    image: "images/bo-nam-cham-chu-cai.jpg", 
    icon: "images/bo-nam-cham-chu-cai.jpg",
    options: ["Chữ thường (29 chữ cái)", "Chữ in hoa (29 chữ cái)", "Bộ đầy đủ (Chữ hoa + Chữ thường + Dấu)"]
  },
  { 
    id: "bo-nam-cham-chu-so", 
    name: "Bộ chữ số & phép tính nam châm", 
    category: "Routine & Nam châm", 
    type: "magnet",
    description: "Các con số và dấu phép cộng, trừ, nhân, chia dán nam châm cho bé tập tính toán trực quan.", 
    image: "images/bo-nam-cham-chu-so.jpg", 
    icon: "images/bo-nam-cham-chu-so.jpg",
    options: ["Bộ số 0-9 & Dấu phép tính", "Bộ đầy đủ (Số 0-20 & Dấu phép tính)"]
  },
  { 
    id: "bo-the-hinh-anh-truc-quan", 
    name: "Bộ thẻ hình ảnh trực quan (Visual Cards)", 
    category: "Routine & Nam châm", 
    type: "magnet",
    description: "Thẻ hình ảnh cảm xúc, thời tiết, đồ vật, công việc hàng ngày gắn nam châm nhận biết trực quan.", 
    image: "images/bo-the-hinh-anh-truc-quan.jpg", 
    icon: "images/bo-the-hinh-anh-truc-quan.jpg",
    options: ["Chủ đề Cảm xúc & Thời tiết", "Chủ đề Hoạt động gia đình", "Trọn bộ tổng hợp (50 thẻ)"]
  },

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
  { id: "tu-duy-hinh-khoi", name: "Tư duy hình khối", category: "Tư duy", type: "worksheet", description: "Nhận diện hình dạng và rèn tư duy không gian.", image: "images/tu-duy-hinh-khoi.jpg", icon: "images/tu-duy-hinh-khoi.jpg" },
  { id: "tro-choi-me-cung", name: "Trò chơi mê cung", category: "Tư duy", type: "worksheet", description: "Tìm đường đi và luyện khả năng quan sát.", image: "images/tro-choi-me-cung.jpg", icon: "images/tro-choi-me-cung.jpg" },
  { id: "sudoku-hinh-anh", name: "Sudoku hình ảnh", category: "Tư duy", type: "worksheet", description: "Sắp xếp hình ảnh theo quy luật đơn giản.", image: "images/sudoku-hinh-anh.jpg", icon: "images/sudoku-hinh-anh.jpg" },
  { id: "tro-choi-tu-duy-logic", name: "Trò chơi rèn luyện tư duy logic", category: "Tư duy", type: "worksheet", description: "Những thử thách vui để bé suy luận.", image: "images/tro-choi-tu-duy-logic.jpg", icon: "images/tro-choi-tu-duy-logic.jpg" },
  { id: "noi-bong-va-hinh-anh", name: "Nối bóng và hình ảnh", category: "Tư duy", type: "worksheet", description: "Tìm hình phù hợp với chiếc bóng tương ứng.", image: "images/noi-bong-va-hinh-anh.jpg", icon: "images/noi-bong-va-hinh-anh.jpg" },
  { id: "phan-biet-so-chan-le", name: "Phân biệt số chẵn, số lẻ", category: "Toán học", type: "worksheet", description: "Nhận biết số chẵn và số lẻ qua ví dụ.", image: "images/phan-biet-so-chan-le.jpg", icon: "images/phan-biet-so-chan-le.jpg" },
  { id: "so-sanh-so-lon-be", name: "So sánh số lớn, số bé", category: "Toán học", type: "worksheet", description: "Luyện so sánh và sắp xếp các số.", image: "images/so-sanh-so-lon-be.jpg", icon: "images/so-sanh-so-lon-be.jpg" }
];

const $ = (selector, root = document) => root.querySelector(selector); const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const escapeHtml = value => String(value ?? "").replace(/[&<>"']/g, ch => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch]));

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
    let optionsHTML = "";
    
    if (p.type === "magnet") {
      // Tùy chọn cho Học liệu Nam châm / Routine
      optionsHTML = `
        <label>Phân loại / Gói học liệu
          <select class="variant-select" aria-label="Gói học liệu cho ${escapeHtml(p.name)}">
            ${(p.options || []).map(opt => `<option value="${escapeHtml(opt)}">${escapeHtml(opt)}</option>`).join("")}
          </select>
        </label>
      `;
    } else {
      // Tùy chọn cho Worksheet / Trang in
      optionsHTML = `
        <label>Số lượng trang
          <select class="page-select" aria-label="Số trang cho ${escapeHtml(p.name)}">
            ${PAGE_OPTIONS.map(pg => `<option value="${pg}">${pg} trang</option>`).join("")}
          </select>
        </label>
        <label>Chủ đề minh họa
          <select class="theme-select" aria-label="Chủ đề minh họa cho ${escapeHtml(p.name)}">
            ${THEMES.map(t => `<option value="${escapeHtml(t)}">${escapeHtml(t)}</option>`).join("")}
          </select>
        </label>
      `;
    }

    return `
      <article class="product-card" data-product-id="${escapeHtml(p.id)}">
        <div class="product-image-wrap">${productImageMarkup(p,"product-image")}</div>
        <div class="product-card-body">
          <span class="product-category">${escapeHtml(p.category)}</span>
          <h3>${escapeHtml(p.name)}</h3>
          <p>${escapeHtml(p.description)}</p>
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

  let key = "";
  let itemData = {
    id: p.id,
    name: p.name,
    category: p.category,
    type: p.type,
    image: p.image,
    icon: p.icon,
    qty: 1
  };

  if (p.type === "magnet") {
    const variant = $(".variant-select", card) ? $(".variant-select", card).value : "Mặc định";
    key = `${id}|${variant}`;
    itemData.variant = variant;
  } else {
    const pages = Number($(".page-select", card).value);
    const theme = $(".theme-select", card).value;
    key = `${id}|${pages}|${theme}`;
    itemData.pages = pages;
    itemData.theme = theme;
  }

  itemData.key = key;

  const found = cart.find(item => item.key === key);
  if (found) {
    found.qty += 1;
  } else {
    cart.push(itemData);
  }

  renderCart();
  openCart();
}

function renderCart() {
  const count = cart.reduce((sum,item) => sum + item.qty, 0);
  if ($("#cartCount")) $("#cartCount").textContent = count;
  if ($("#drawerCount")) $("#drawerCount").textContent = `(${count})`;
  
  const cartItemsEl = $("#cartItems");
  if (cartItemsEl) {
    cartItemsEl.innerHTML = cart.map(item => {
      let subInfo = item.type === "magnet" 
        ? `${escapeHtml(item.variant)}`
        : `${item.pages} trang · ${escapeHtml(item.theme)}`;

      return `
        <article class="cart-item">
          <div class="cart-thumb"><img src="${escapeHtml(item.image)}" alt="" onerror="this.src='${escapeHtml(item.icon)}'"></div>
          <div>
            <h4>${escapeHtml(item.name)}</h4>
            <small>${subInfo}</small>
            <div class="cart-item-actions">
              <button class="qty-btn" data-qty="${escapeHtml(item.key)}" data-delta="-1" aria-label="Giảm số lượng">−</button>
              <span>${item.qty}</span>
              <button class="qty-btn" data-qty="${escapeHtml(item.key)}" data-delta="1" aria-label="Tăng số lượng">+</button>
              <button class="remove-btn" data-remove="${escapeHtml(item.key)}">Xóa</button>
            </div>
          </div>
        </article>`;
    }).join("");
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
  if ($("#formMessage")) {
    $("#formMessage").textContent = "";
    $("#formMessage").className = "form-message";
  }
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
  const items = cart.map(item => ({
    productId: item.id, 
    productName: item.name, 
    category: item.category, 
    type: item.type,
    details: item.type === "magnet" ? item.variant : `${item.pages} trang (${item.theme})`,
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
    itemSummary: items.map(i => `${i.productName} [${i.details}] x${i.quantity}`).join(" | "),
    deliveryStatus: "Chưa giao", 
    paymentStatus: "Chưa thu tiền"
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
    if (message) {
      message.className = "form-message error";
      message.textContent = "Website chưa được cấu hình Google Sheets.";
    }
    return;
  }
  orderBusy = true;
  if (button) {
    button.disabled = true;
    button.textContent = "Đang gửi đơn...";
  }
  if (message) message.className = "form-message";
  try {
    await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST", 
      mode: "no-cors", 
      redirect: "follow",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(order)
    });
    if (message) {
      message.className = "form-message success";
      message.textContent = `🎉 Đặt hàng thành công! Mã đơn của bạn là: ${order.orderId}. Shop đã nhận được thông tin và sẽ chuẩn bị học liệu giao sớm nhất cho bé nhé!`;
    }
    cart = [];
    renderCart();
    form.reset();
  } catch (error) {
    if (message) {
      message.className = "form-message error";
      message.textContent = "Chưa gửi được đơn do lỗi kết nối. Vui lòng thử lại hoặc liên hệ shop.";
    }
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

  const categoryFilters = $("#categoryFilters"); if (categoryFilters) { categoryFilters.addEventListener("click", event => { const button = event.target.closest("[data-category]"); if (!button) return; activeCategory = button.dataset.category; $$(".filter", categoryFilters).forEach(el => el.classList.toggle("active", el === button));
      renderProducts();
    });
  }

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
