document.addEventListener("DOMContentLoaded", function () {
  const path = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-link").forEach(a => {
    const href = a.getAttribute("href") || "";
    if (href === path || (path === "" && href === "index.html") ||
        (href === "services.html" && window.location.pathname.includes("/services/")) ||
        (href === "products.html" && window.location.pathname.includes("/products/")) ||
        (href === "ar-services.html" && window.location.pathname.includes("ar-services-")) ||
        (href === "ar-products.html" && window.location.pathname.includes("ar-products-"))) {
      a.classList.add("active");
    }
  });

  document.querySelectorAll(".current-year").forEach(el => {
    el.textContent = new Date().getFullYear();
  });

  // Back to top
  const topBtn = document.getElementById("topBtn");
  if (topBtn) {
    const toggleTop = () => { topBtn.style.display = window.scrollY > 350 ? "flex" : "none"; };
    window.addEventListener("scroll", toggleTop, { passive: true });
    topBtn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
    toggleTop();
  }

  // Mobile navigation: dropdowns open on tap; leaf links close the menu.
  document.querySelectorAll(".navbar .dropdown-toggle").forEach(toggle => {
    toggle.addEventListener("click", function (e) {
      if (window.innerWidth <= 991) {
        e.preventDefault();
        e.stopPropagation();
        const menu = this.parentElement.querySelector(".dropdown-menu");
        if (!menu) return;
        const isOpen = menu.classList.contains("show");
        document.querySelectorAll(".navbar .dropdown-menu.show").forEach(m => {
          if (m !== menu) m.classList.remove("show");
        });
        menu.classList.toggle("show", !isOpen);
        this.parentElement.classList.toggle("show", !isOpen);
      }
    });
  });

  document.querySelectorAll(".dropdown-menu .dropdown-item").forEach(item => {
    item.addEventListener("click", () => {
      const nav = document.querySelector(".navbar-collapse.show");
      if (nav && window.bootstrap) bootstrap.Collapse.getOrCreateInstance(nav).hide();
    });
  });

  // Quote modal
  const isArabic = document.documentElement.lang === "ar" || document.body.classList.contains("rtl");
  const modal = document.createElement("div");
  modal.className = "modal fade";
  modal.id = "quoteModal";
  modal.tabIndex = -1;
  modal.setAttribute("aria-labelledby", "quoteModalLabel");
  modal.setAttribute("aria-hidden", "true");

  const formFields = isArabic ? `
    <div class="row g-3">
      <div class="col-md-6"><label class="form-label fw-semibold">الاسم الكامل *</label><input name="Name" class="form-control" required></div>
      <div class="col-md-6"><label class="form-label fw-semibold">الهاتف / واتساب *</label><input name="Phone" class="form-control" required></div>
      <div class="col-md-6"><label class="form-label fw-semibold">البريد الإلكتروني *</label><input type="email" name="Email" class="form-control" required></div>
      <div class="col-md-6"><label class="form-label fw-semibold">نوع الطلب</label><select name="Request Type" class="form-select"><option>خدمة إصلاح</option><option>طلب منتج</option><option>توريد صناعي</option><option>استفسار عام</option></select></div>
      <div class="col-12"><label class="form-label fw-semibold">الخدمة / المنتج</label><input name="Service or Product" class="form-control" placeholder="مثال: حاقن كومون ريل، خرطوم هيدروليكي، صمام هوائي"></div>
      <div class="col-12"><label class="form-label fw-semibold">التفاصيل *</label><textarea name="Message" class="form-control" required placeholder="اذكر رقم القطعة والمواصفات أو تفاصيل المعدة إن وجدت."></textarea></div>
    </div>` : `
    <div class="row g-3">
      <div class="col-md-6"><label class="form-label fw-semibold">Full Name *</label><input name="Name" class="form-control" required></div>
      <div class="col-md-6"><label class="form-label fw-semibold">Phone / WhatsApp *</label><input name="Phone" class="form-control" required></div>
      <div class="col-md-6"><label class="form-label fw-semibold">Email *</label><input type="email" name="Email" class="form-control" required></div>
      <div class="col-md-6"><label class="form-label fw-semibold">Request Type</label><select name="Request Type" class="form-select"><option>Repair Service</option><option>Product Enquiry</option><option>Industrial Procurement</option><option>General Enquiry</option></select></div>
      <div class="col-12"><label class="form-label fw-semibold">Service / Product</label><input name="Service or Product" class="form-control" placeholder="e.g. Common rail injector, hydraulic hose, pneumatic valve"></div>
      <div class="col-12"><label class="form-label fw-semibold">Requirement Details *</label><textarea name="Message" class="form-control" required placeholder="Include part number, specification or equipment details if available."></textarea></div>
    </div>`;

  modal.innerHTML = `
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content quote-modal border-0">
        <div class="quote-modal-head">
          <div class="d-flex align-items-center gap-3">
            <img src="${location.pathname.includes('/services/') || location.pathname.includes('/products/') ? '../' : ''}assets/preloader-logo.jpg" alt="Super Charge" class="quote-logo">
            <div><div class="small text-danger fw-bold">${isArabic ? "سوبر شارج للمعدات الهيدروليكية" : "SUPER CHARGE HYDRAULIC MACHINERY LLC"}</div>
            <h4 class="modal-title fw-bold mb-0" id="quoteModalLabel">${isArabic ? "اطلب عرض سعر" : "Request a Quote"}</h4></div>
          </div>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="${isArabic ? "إغلاق" : "Close"}"></button>
        </div>
        <div class="modal-body p-4 p-md-5">
          <p class="text-secondary mb-4">${isArabic ? "أرسل تفاصيل طلبك وسيتواصل معك فريقنا بأسرع وقت ممكن." : "Send your requirement and our team will contact you with the next steps."}</p>
          <form class="quote-form" action="mailto:info@superchargehm.com" method="post" enctype="text/plain">
            ${formFields}
            <div class="d-flex flex-wrap gap-2 mt-4">
              <button class="btn btn-brand px-4" type="submit">${isArabic ? "إرسال طلب العرض" : "Send Quote Request"} <i class="bi bi-send ms-1"></i></button>
              <a class="btn btn-outline-brand px-4" href="https://wa.me/971509506188" target="_blank" rel="noopener"><i class="bi bi-whatsapp me-1"></i>${isArabic ? " واتساب" : " WhatsApp"}</a>
            </div>
          </form>
        </div>
      </div>
    </div>`;
  document.body.appendChild(modal);

  document.querySelectorAll("a,button").forEach(el => {
    const label = (el.textContent || "").replace(/\s+/g, " ").trim().toLowerCase();
    if (label === "get a quote" || label === "اطلب عرض سعر" || label.startsWith("get a quote ")) {
      el.setAttribute("href", "#quoteModal");
      el.setAttribute("data-bs-toggle", "modal");
      el.setAttribute("data-bs-target", "#quoteModal");
      el.addEventListener("click", function (e) {
        if (window.bootstrap) { e.preventDefault(); bootstrap.Modal.getOrCreateInstance(modal).show(); }
      });
    }
  });

  // Premium preloader using the supplied SC logo.
  const pre = document.createElement("div");
  pre.id = "sitePreloader";
  const inNested = /\/(services|products)\//.test(window.location.pathname);
  const logo = (inNested ? "../" : "") + "assets/preloader-logo.jpg";
  pre.innerHTML = `<div class="preloader-inner">
    <div class="preloader-orbit"><span></span><img class="preloader-logo" src="${logo}" alt="Super Charge"></div>
    <div class="preloader-name">SUPER CHARGE</div>
    <div class="preloader-sub">HYDRAULIC MACHINERY LLC</div>
    <div class="preloader-line"><span></span></div>
  </div>`;
  document.body.prepend(pre);

  const hidePreloader = () => {
    setTimeout(() => {
      pre.classList.add("hide");
      setTimeout(() => pre.remove(), 650);
    }, 350);
  };
  if (document.readyState === "complete") hidePreloader();
  else window.addEventListener("load", hidePreloader, { once: true });
});
