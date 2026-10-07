/**
 * Order on WhatsApp: summary + address form → WhatsApp message
 */
(function (global) {
  "use strict";

  const WA = typeof WHATSAPP_NUMBER !== "undefined" ? WHATSAPP_NUMBER : "919911523068";

  function ensureModal() {
    if (document.getElementById("order-modal")) return;
    const el = document.createElement("div");
    el.id = "order-modal";
    el.className =
      "fixed inset-0 z-[80] hidden items-center justify-center p-4 bg-black/50";
    el.innerHTML = `
      <div class="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto" role="dialog" aria-modal="true" aria-labelledby="order-modal-title">
        <div class="sticky top-0 bg-white border-b border-gray-100 px-5 py-4 flex items-center justify-between">
          <h2 id="order-modal-title" class="text-lg font-medium text-luxe-deep">Order Summary</h2>
          <button type="button" id="order-modal-close" class="text-gray-400 hover:text-gray-600 text-2xl leading-none" aria-label="Close">&times;</button>
        </div>
        <form id="order-form" class="p-5 space-y-4">
          <div class="flex gap-3 p-3 bg-luxe-cream/60 rounded-xl">
            <img id="order-img" src="" alt="" class="w-16 h-20 object-cover rounded-lg bg-luxe-cream" />
            <div class="flex-1 min-w-0">
              <p id="order-name" class="text-sm font-medium text-luxe-deep line-clamp-2"></p>
              <p id="order-price" class="text-sm text-gray-600 mt-1"></p>
              <div class="flex items-center gap-2 mt-2">
                <span class="text-xs text-gray-500">Qty</span>
                <button type="button" id="order-qty-minus" class="w-7 h-7 border border-gray-200 rounded flex items-center justify-center text-sm">−</button>
                <span id="order-qty" class="text-sm font-medium w-6 text-center">1</span>
                <button type="button" id="order-qty-plus" class="w-7 h-7 border border-gray-200 rounded flex items-center justify-center text-sm">+</button>
              </div>
            </div>
          </div>
          <div class="border border-gray-100 rounded-xl p-3 text-sm space-y-1">
            <div class="flex justify-between"><span class="text-gray-500">Subtotal</span><span id="order-subtotal" class="font-medium"></span></div>
            <p class="text-xs text-gray-400 pt-1">Final confirmation on WhatsApp. No online payment.</p>
          </div>
          <div>
            <label class="block text-sm font-medium mb-1" for="order-customer-name">Full name *</label>
            <input id="order-customer-name" required maxlength="80" class="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-luxe-green" />
          </div>
          <div>
            <label class="block text-sm font-medium mb-1" for="order-phone">Phone / WhatsApp *</label>
            <input id="order-phone" type="tel" required maxlength="15" pattern="[0-9+\\s-]{10,15}" class="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-luxe-green" placeholder="10-digit mobile" />
          </div>
          <div>
            <label class="block text-sm font-medium mb-1" for="order-address">Delivery address *</label>
            <textarea id="order-address" required rows="3" maxlength="400" class="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-luxe-green" placeholder="House no, street, area, city, pincode"></textarea>
          </div>
          <div>
            <label class="block text-sm font-medium mb-1" for="order-note">Note (optional)</label>
            <input id="order-note" maxlength="200" class="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-luxe-green" />
          </div>
          <button type="submit" class="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white py-3 rounded-lg text-sm font-medium transition">
            Send order on WhatsApp
          </button>
        </form>
      </div>`;
    document.body.appendChild(el);

    el.addEventListener("click", (e) => {
      if (e.target === el) closeOrderModal();
    });
    document.getElementById("order-modal-close").addEventListener("click", closeOrderModal);
    document.getElementById("order-qty-minus").addEventListener("click", () => {
      const state = el._orderState;
      if (!state || state.qty <= 1) return;
      state.qty -= 1;
      refreshTotals();
    });
    document.getElementById("order-qty-plus").addEventListener("click", () => {
      const state = el._orderState;
      if (!state) return;
      state.qty += 1;
      refreshTotals();
    });
    document.getElementById("order-form").addEventListener("submit", onSubmit);
  }

  function refreshTotals() {
    const el = document.getElementById("order-modal");
    const state = el && el._orderState;
    if (!state) return;
    document.getElementById("order-qty").textContent = String(state.qty);
    const total = state.product.price * state.qty;
    document.getElementById("order-subtotal").textContent =
      "₹" + total.toLocaleString("en-IN");
    document.getElementById("order-price").textContent =
      "₹" +
      Number(state.product.price).toLocaleString("en-IN") +
      (state.product.mrp > state.product.price
        ? "  ·  MRP ₹" + Number(state.product.mrp).toLocaleString("en-IN")
        : "");
  }

  function openOrderModal(product, qty) {
    if (!product) return;
    ensureModal();
    const el = document.getElementById("order-modal");
    el._orderState = { product: product, qty: Math.max(1, Number(qty) || 1) };
    document.getElementById("order-img").src = product.image || "";
    document.getElementById("order-name").textContent = product.name || "";
    refreshTotals();
    el.classList.remove("hidden");
    el.classList.add("flex");
    document.body.style.overflow = "hidden";
  }

  function closeOrderModal() {
    const el = document.getElementById("order-modal");
    if (!el) return;
    el.classList.add("hidden");
    el.classList.remove("flex");
    document.body.style.overflow = "";
  }

  function onSubmit(e) {
    e.preventDefault();
    const el = document.getElementById("order-modal");
    const state = el && el._orderState;
    if (!state) return;

    const name = document.getElementById("order-customer-name").value.trim();
    const phone = document.getElementById("order-phone").value.trim();
    const address = document.getElementById("order-address").value.trim();
    const note = document.getElementById("order-note").value.trim();

    if (!name || !phone || !address) return;

    const p = state.product;
    const qty = state.qty;
    const total = p.price * qty;
    const pageUrl =
      location.origin && location.origin !== "null"
        ? location.href.split("?")[0] + "?id=" + encodeURIComponent(p.id)
        : "";

    let message =
      "Hi LuxeVally, I would like to order:\n\n" +
      "*Order Summary*\n" +
      "Product: " +
      p.name +
      "\n" +
      "Price: ₹" +
      Number(p.price).toLocaleString("en-IN") +
      "\n" +
      "Quantity: " +
      qty +
      "\n" +
      "Total: ₹" +
      total.toLocaleString("en-IN") +
      "\n";
    if (pageUrl) message += "Link: " + pageUrl + "\n";
    message +=
      "\n*Delivery Details*\n" +
      "Name: " +
      name +
      "\n" +
      "Phone: " +
      phone +
      "\n" +
      "Address: " +
      address +
      "\n";
    if (note) message += "Note: " + note + "\n";
    message += "\nPlease confirm availability and price. Thank you!";

    const url =
      "https://wa.me/" + WA + "?text=" + encodeURIComponent(message);
    window.open(url, "_blank", "noopener");
    closeOrderModal();
  }

  // Event delegation for product cards
  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-order-whatsapp]");
    if (!btn) return;
    e.preventDefault();
    const id = btn.getAttribute("data-order-whatsapp");
    if (!id || typeof PRODUCTS === "undefined") return;
    const product = PRODUCTS.find((p) => p.id === id);
    if (product) openOrderModal(product, 1);
  });

  global.openOrderModal = openOrderModal;
  global.closeOrderModal = closeOrderModal;
})(typeof window !== "undefined" ? window : globalThis);
