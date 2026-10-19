/*
 * Học liệu thông minh — Bé chơi mà học
 * Cập nhật:
 * - Thương hiệu: "Học liệu thông minh", Slogan: "Bé chơi mà học"
 * - Bỏ phần "Cách đặt hàng"
 * - Hình ảnh minh họa Hero rẻ quạt (xếp 3 trang từ folder images) + Icon dễ thương
 * - Bỏ lựa chọn chủ đề minh họa
 * - Tính giá: 1.500đ/trang, 50 trang giảm 5%, 100 trang giảm 10%
 */

const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbztOhIx_AbRT4IFpaf08V559fo6geFjbbgVae1YNXCjkK1h-xoKD2iYjyDloCKKDfIP/exec";
const PAGE_OPTIONS = [5, 10, 15, 20, 30, 50];
const PRICE_PER_PAGE = 1500; // 1.500 VNĐ / trang

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

// 1. Cập nhật thương hiệu, slogan và loại bỏ "Cách đặt hàng"
function updateBranding() {
  // Thay đổi tiêu đề thương hiệu & slogan
  $$(".brand strong").forEach(el => el.textContent = "Học liệu thông minh"); $$
(".brand small").forEach(el => el.textContent = "Bé chơi mà học");
  if (document.title) document.title = "Học liệu thông minh | Bé chơi mà học";

  // Bỏ phần "Cách đặt hàng" ở Navigation và Section
  const navHow = $('a[href="#how"]');
  if (navHow) navHow.remove();

  const sectionHow = $("#how");
  if (sectionHow) sectionHow.remove();

  const heroActionHow = $('.hero-actions a[href="#how"]');
  if (heroActionHow) heroActionHow.remove();
}

// 2. Tạo hình ảnh minh họa Hero dạng Rẻ Quạt với 3 trang ngẫu nhiên + Icon dễ thương
function setupHeroFanArt() {
  const heroArt = $(".hero-art");
  if (!heroArt) return;

  // Chọn 3 hình ảnh từ folder images (lấy từ PRODUCTS)
  const sampleImages = [
    PRODUCTS[0].image,
    PRODUCTS[2].image,
    PRODUCTS[12].image
  ];

  heroArt.innerHTML = `
    <div class="fan-container" style="position: relative; width: 100%; max-width: 380px; height: 320px; margin: 0 auto;">
      <!-- Card bên trái -->
      <div class="fan-card fan-left" style="position: absolute; left: 10px; top: 30px; transform: rotate(-18deg); z-index: 1; transition: all 0.3s ease;">
        <img src="${sampleImages[0]}" alt="Học liệu 1" style="width: 170px; height: 230px; object-fit: cover; border-radius: 12px; box-shadow: 0 8px 20px rgba(0,0,0,0.15); border: 4px solid #fff;">
      </div>
      
      <!-- Card ở giữa -->
      <div class="fan-card fan-center" style="position: absolute; left: 50%; top: 10px; transform: translateX(-50%) rotate(0deg); z-index: 3; transition: all 0.3s ease;">
        <img src="${sampleImages[1]}" alt="Học liệu 2" style="width: 180px; height: 240px; object-fit: cover; border-radius: 12px; box-shadow: 0 10px 25px rgba(0,0,0,0.2); border: 4px solid #fff;">
      </div>

      <!-- Card bên phải -->
      <div class="fan-card fan-right" style="position: absolute; right: 10px; top: 30px; transform: rotate(18deg); z-index: 2; transition: all 0.3s ease;">
        <img src="${sampleImages[2]}" alt="Học liệu 3" style="width: 170px; height: 230px; object-fit: cover; border-radius: 12px; box-shadow: 0 8px 20px rgba(0,0,0,0.15); border: 4px solid #fff;">
      </div>

      <!-- Các Icon trang trí dễ thương -->
      <span class="cute-icon" style="position: absolute; top: -10px; left: -10px; font-size: 2rem; animation: float 3s infinite ease-in-out;">🎈</span>
      <span class="cute-icon" style="position: absolute; top: 15px; right: -15px; font-size: 2.2rem; animation: float 2.5s infinite ease-in-out 0.5s;">🎨</span>
      <span class="cute-icon" style="position: absolute; bottom: 0px; left: 5px; font-size: 2rem; animation: float 3.2s infinite ease-in-out 1s;">🧸</span>
      <span class="cute-icon" style="position: absolute; bottom: -10px; right: 10px; font-size: 2.2rem; animation: float 2.8s infinite ease-in-out 0.2s;">✨</span>
      <span class="cute-icon" style="position: absolute; top: 45%; left: -25px; font-size: 1.8rem; animation: float 3.5s infinite ease-in-out 0.8s;">🧩</span>
      <span class="cute-icon" style="position: absolute; top: 40%; right: -25px; font-size: 1.8rem; animation: float 3s infinite ease-in-out 1.2s;">🚀</span>
    </div>
  `;
}

function productImageMarkup(p, extraClass = "") {
  return `<img class="${extraClass}" src="${escapeHtml(p.image)}" alt="${escapeHtml(p.name)}" loading="lazy" onerror="this.style.display='none';this.nextElementSibling.classList.remove('hidden')"><div class="image-fallback hidden"><img src="${escapeHtml(p.icon)}" alt="${escapeHtml(p.name)}" class="icon-img"><strong>${escapeHtml(p.name)}</strong><small>Ảnh minh họa sẽ được cập nhật</small></div>`;
}

// 3. Render Sản phẩm (Bỏ chọn Chủ đề minh họa)
function renderProducts() {
  const grid = $("#productGrid");
  if (!grid) return;

  const searchInput = $("#searchInput");
  const countEl = $("#productCount");
  const emptyState = $("#emptyState");

  const term = (searchInput ? searchInput.value : "").trim().toLocaleLowerCase("vi");
  const shown = PRODUCTS.filter(p => (activeCategory === "all" || p.category === activeCategory) &&
    `${p.name} ${p.description} ${p.category}`.toLocaleLowerCase("vi").includes(term));
  
  grid.innerHTML = shown.map(p => `
    <article class="product-card" data-product-id="${escapeHtml(p.id)}">
      <div class="product-image-wrap">${productImageMarkup(p,"product-image")}</div>
      <div class="product-card-body">
        <span class="product-category">${escapeHtml(p.category)}</span>
        <h3>${escapeHtml(p.name)}</h3>
        <p>${escapeHtml(p.description)}</p>
        <div class="price-info" style="margin: 8px 0; font-size: 0.9rem; color: #e65100; font-weight: 600;">
          <span>Đơn giá: 1.500 đ / trang</span>
        </div>
        <div class="product-options">
          <label>Số lượng trang
            <select class="page-select" aria-label="Số trang cho ${escapeHtml(p.name)}">
              ${PAGE_OPTIONS.map(pg => `<option value="${pg}">${pg} trang (${formatVND(pg * PRICE_PER_PAGE)})</option>`).join("")}
            </select>
          </label>
          <button class="add-button" data-add="${escapeHtml(p.id)}">＋ Thêm vào giỏ hàng</button>
        </div>
      </div>
    </article>`).join("");
  
  if (countEl) countEl.textContent = shown.length;
  if (emptyState) emptyState.classList.toggle("hidden", shown.length > 0);
}

// 4. Thêm vào Giỏ hàng
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

// 5. Tính tổng giá tiền & Giảm giá theo số trang (50 trang giảm 5%, 100 trang giảm 10%)
function calculateCartTotals() {
  const totalPages = cart.reduce((sum, item) => sum + (item.pages * item.qty), 0);
  const rawTotal = totalPages * PRICE_PER_PAGE;
  let discountPercent = 0;

  if (totalPages >= 100) {
    discountPercent = 0.10; // 10% cho 100 trang trở lên
  } else if (totalPages >= 50) {
    discountPercent = 0.05; // 5% cho 50 trang trở lên
  }

  const discountAmount = rawTotal * discountPercent;
  const finalTotal = rawTotal - discountAmount;

  return { totalPages, rawTotal, discountPercent, discountAmount, finalTotal };
}

// 6. Hiển thị Giỏ hàng
function renderCart() {
  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  if ($("#cartCount")) $("#cartCount").textContent = count;
  if ($("#drawerCount")) $("#drawerCount").textContent = `(${count})`;

  const { totalPages, rawTotal, discountPercent, discountAmount, finalTotal } = calculateCartTotals();
  
  const cartItemsEl = $("#cartItems");
  if (cartItemsEl) {
    cartItemsEl.innerHTML = cart.map(item => {
      const itemSubtotal = item.pages * item.qty * PRICE_PER_PAGE;

      return `
        <article class="cart-item">
          <div class="cart-thumb"><img src="${escapeHtml(item.image)}" alt="" onerror="this.src='${escapeHtml(item.icon)}'"></div>
          <div>
            <h4>${escapeHtml(item.name)}</h4>
            <small>${item.pages} trang · ${formatVND(item.pages * PRICE_PER_PAGE)}/bộ</small>
            <div class="cart-item-actions">
              <button class="qty-btn" data-qty="${escapeHtml(item.key)}" data-delta="-1" aria-label="Giảm số lượng">−</button>
              <span>${item.qty}</span>
              <button class="qty-btn" data-qty="${escapeHtml(item.key)}" data-delta="1" aria-label="Tăng số lượng">+</button>
              <button class="remove-btn" data-remove="${escapeHtml(item.key)}">Xóa</button>
            </div>
          </div>
          <div class="cart-item-price" style="font-weight: bold; margin-left: auto;">${formatVND(itemSubtotal)}</div>
        </article>`;
    }).join("");
  }
  
  // Hiển thị phần tổng kết giá và giảm giá trong Giỏ hàng
  let cartBottomEl = $("#cartBottom");
  if (cartBottomEl) {
    let summaryHTML = `
      <div style="padding: 10px 0; border-top: 1px dashed #ddd; margin-bottom: 10px;">
        <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
          <span>Tổng số trang:</span>
          <strong>${totalPages} trang</strong>
        </div>
        <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
          <span>Tạm tính:</span>
          <span>${formatVND(rawTotal)}</span>
        </div>
        ${discountPercent > 0 ? `
        <div style="display: flex; justify-content: space-between; margin-bottom: 4px; color: #d32f2f; font-weight: 600;">
          <span>Giảm giá (${discountPercent * 100}%):</span>
          <span>-${formatVND(discountAmount)}</span>
        </div>` : ''}
        <div style="display: flex; justify-content: space-between; font-size: 1.1rem; font-weight: bold; color: #2e7d32; margin-top: 8px;">
          <span>Tổng thanh toán:</span>
          <span>${formatVND(finalTotal)}</span>
        </div>
      </div>
      <button class="button primary full" id="goCheckout">Điền thông tin đặt hàng <span>→</span></button>
    `;
    cartBottomEl.innerHTML = summaryHTML;
    
    // Re-bind nút Checkout
    if ($("#goCheckout")) $("#goCheckout").addEventListener("click", openCheckout);
  }

  if ($("#cartTotal")) $("#cartTotal").textContent = formatVND(finalTotal);
  if ($("#checkoutTotal")) $("#checkoutTotal").textContent = formatVND(finalTotal);
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
  const orderId = `HTM-${Date.now().toString().slice(-9)}`;
  const { totalPages, rawTotal, discountPercent, discountAmount, finalTotal } = calculateCartTotals();

  const items = cart.map(item => ({
    productId: item.id, 
    productName: item.name, 
    category: item.category, 
    pages: item.pages,
    quantity: item.qty,
    subtotal: item.pages * item.qty * PRICE_PER_PAGE
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
    totalPages,
    rawTotal: formatVND(rawTotal),
    discountPercent: `${discountPercent * 100}%`,
    discountAmount: formatVND(discountAmount),
    total: formatVND(finalTotal),
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
  updateBranding();
  setupHeroFanArt();

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
