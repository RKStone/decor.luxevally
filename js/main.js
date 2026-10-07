// LuxeVally Main JS — responsive header + utilities

document.addEventListener("DOMContentLoaded", () => {
  const mobileBtn = document.getElementById("mobile-menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  const mobileOverlay = document.getElementById("mobile-drawer-overlay");
  const mobileClose = document.getElementById("mobile-menu-close");

  function openMobileDrawer() {
    if (!mobileMenu) return;
    mobileMenu.classList.remove("-translate-x-full");
    mobileMenu.classList.add("translate-x-0");
    if (mobileOverlay) {
      mobileOverlay.classList.remove("opacity-0", "pointer-events-none");
      mobileOverlay.classList.add("opacity-100");
    }
    document.body.style.overflow = "hidden";
    if (mobileBtn) mobileBtn.setAttribute("aria-expanded", "true");
  }

  function closeMobileDrawer() {
    if (!mobileMenu) return;
    mobileMenu.classList.add("-translate-x-full");
    mobileMenu.classList.remove("translate-x-0");
    if (mobileOverlay) {
      mobileOverlay.classList.add("opacity-0", "pointer-events-none");
      mobileOverlay.classList.remove("opacity-100");
    }
    document.body.style.overflow = "";
    if (mobileBtn) mobileBtn.setAttribute("aria-expanded", "false");
  }

  if (mobileBtn) mobileBtn.addEventListener("click", openMobileDrawer);
  if (mobileClose) mobileClose.addEventListener("click", closeMobileDrawer);
  if (mobileOverlay) mobileOverlay.addEventListener("click", closeMobileDrawer);

  // Close drawer when a nav link is clicked (mobile)
  if (mobileMenu) {
    mobileMenu.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", () => closeMobileDrawer());
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMobileDrawer();
  });

  // Close drawer on resize to desktop
  window.addEventListener("resize", () => {
    if (window.matchMedia("(min-width: 1024px)").matches) closeMobileDrawer();
  });

  function bindAccordion(btnId, menuId, chevronId) {
    const btn = document.getElementById(btnId);
    const menu = document.getElementById(menuId);
    const chev = document.getElementById(chevronId);
    if (!btn || !menu) return;
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const open = menu.classList.contains("max-h-0");
      if (open) {
        menu.classList.remove("max-h-0", "opacity-0");
        menu.classList.add("max-h-96", "opacity-100");
      } else {
        menu.classList.add("max-h-0", "opacity-0");
        menu.classList.remove("max-h-96", "opacity-100");
      }
      if (chev) chev.classList.toggle("rotate-180", open);
    });
  }

  bindAccordion("mobile-shop-btn", "mobile-shop-menu", "mobile-shop-chevron");

  // Search overlay
  const searchBtn = document.getElementById("search-btn");
  const searchOverlay = document.getElementById("search-overlay");
  const closeSearch = document.getElementById("close-search");
  const searchInput = document.getElementById("search-input");
  const searchResults = document.getElementById("search-results");

  function openSearch() {
      if (!searchOverlay) return;
      searchOverlay.classList.remove("hidden");
      searchOverlay.classList.add("flex");
      if (searchInput) searchInput.focus();
    }
    function openSearch() {
    if (!searchOverlay) return;
    searchOverlay.classList.remove("hidden");
    searchOverlay.classList.add("flex");
    if (searchInput) searchInput.focus();
  }
  if (searchBtn) searchBtn.addEventListener("click", openSearch);
  const searchBtnMobile = document.getElementById("search-btn-mobile");
  if (searchBtnMobile) searchBtnMobile.addEventListener("click", openSearch);
  if (closeSearch && searchOverlay) {
    closeSearch.addEventListener("click", () => {
      searchOverlay.classList.add("hidden");
      searchOverlay.classList.remove("flex");
    });
  }
  if (searchOverlay) {
    searchOverlay.addEventListener("click", (e) => {
      if (e.target === searchOverlay) {
        searchOverlay.classList.add("hidden");
        searchOverlay.classList.remove("flex");
      }
    });
  }

  if (searchInput && searchResults && typeof PRODUCTS !== "undefined") {
    searchInput.addEventListener("input", () => {
      const q = searchInput.value.trim().toLowerCase();
      if (q.length < 2) {
        searchResults.classList.add("hidden");
        searchResults.innerHTML = "";
        return;
      }
      const hits = PRODUCTS.filter(
        (p) =>
          (p.name || "").toLowerCase().includes(q) ||
          (p.fabric || "").toLowerCase().includes(q) ||
          (p.color || "").toLowerCase().includes(q) ||
          (p.category || "").toLowerCase().includes(q)
      ).slice(0, 8);
      const base = location.pathname.includes("/pages/") ? "" : "pages/";
      const imgBase = location.pathname.includes("/pages/") ? "../" : "";
      searchResults.innerHTML = hits.length
        ? hits
            .map((p) => {
              let img = (p.images && p.images[0]) || p.image || "";
              if (img && !/^https?:/i.test(img)) {
                img = img.replace(/^(\.\.\/)+/, "");
                if (!img.startsWith("assets/")) img = "assets/" + img;
                img = imgBase + img;
              }
              return `<a href="${base}product.html?id=${encodeURIComponent(p.id)}" class="flex gap-3 p-3 hover:bg-luxe-cream rounded-lg">
                  <img src="${img}" alt="" class="w-12 h-14 object-cover rounded bg-luxe-cream" />
                  <span class="text-sm text-luxe-deep">${p.name}<br/><span class="text-gray-500">₹${Number(p.price).toLocaleString("en-IN")}</span></span>
                </a>`;
            })
            .join("")
        : `<p class="p-3 text-sm text-gray-500">No results</p>`;
      searchResults.classList.remove("hidden");
    });
  }

  // Scroll to top
  let scrollBtn = document.getElementById("scroll-top-btn");
  if (!scrollBtn) {
    scrollBtn = document.createElement("button");
    scrollBtn.id = "scroll-top-btn";
    scrollBtn.type = "button";
    scrollBtn.setAttribute("aria-label", "Scroll to top");
    scrollBtn.innerHTML =
      '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"/></svg>';
    scrollBtn.className =
      "fixed bottom-24 right-6 z-40 w-11 h-11 rounded-full bg-luxe-green text-white shadow-lg flex items-center justify-center opacity-0 pointer-events-none transition-all duration-300 hover:bg-luxe-deep";
    document.body.appendChild(scrollBtn);
  }
  window.addEventListener(
    "scroll",
    () => {
      if (window.scrollY > 400) {
        scrollBtn.classList.remove("opacity-0", "pointer-events-none");
        scrollBtn.classList.add("opacity-100");
      } else {
        scrollBtn.classList.add("opacity-0", "pointer-events-none");
        scrollBtn.classList.remove("opacity-100");
      }
    },
    { passive: true }
  );
  scrollBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  if (!localStorage.getItem("luxe_cookies_accepted")) {
    const banner = document.getElementById("cookie-banner");
    if (banner) banner.classList.remove("hidden");
  }
});

function acceptCookies() {
  localStorage.setItem("luxe_cookies_accepted", "1");
  const banner = document.getElementById("cookie-banner");
  if (banner) banner.classList.add("hidden");
}

window.addEventListener("scroll", () => {
  const header = document.getElementById("main-header");
  if (!header) return;
  if (window.scrollY > 20) header.classList.add("shadow-md");
  else header.classList.remove("shadow-md");
});


// Hero carousel
  const slides = document.querySelectorAll(".hero-slide");
  const dots = document.querySelectorAll(".hero-dot");
  let currentSlide = 0;
  let heroInterval;

  function showSlide(index) {
    slides.forEach((s, i) => {
      s.style.opacity = i === index ? "1" : "0";
    });
    dots.forEach((d, i) => {
      d.classList.toggle("bg-white", i === index);
      d.classList.toggle("bg-white/40", i !== index);
    });
    currentSlide = index;
  }

  function nextSlide() {
    showSlide((currentSlide + 1) % slides.length);
  }

  if (slides.length > 0) {
    heroInterval = setInterval(nextSlide, 5000);
    dots.forEach((dot) => {
      dot.addEventListener("click", () => {
        clearInterval(heroInterval);
        showSlide(parseInt(dot.dataset.index));
        heroInterval = setInterval(nextSlide, 5000);
      });
    });
  }