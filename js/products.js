// LuxeVally — Electronic Accessories & Event Décor
const PRODUCTS = [
  {
    id: "led-fairy-warm-white",
    name: "Warm White LED Fairy String Lights (10m)",
    slug: "warm-white-led-fairy-string-lights-10m",
    price: 499,
    mrp: 799,
    fabric: "LED",
    category: "Decorative Lighting",
    color: "Warm White",
    occasion: "Home",
    rating: 4.8,
    reviews: 214,
    badge: "Bestseller",
    image: "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=800&q=80",
      "https://images.unsplash.com/photo-1482517965088-3a44b1e4f2f8?w=800&q=80"
    ],
    description: "Soft warm-white fairy lights for bedrooms, balconies and festive décor. Plug-in, low heat, long life LEDs.",
    length: "10 m",
    width: "—",
    blouse: "Adapter included",
    care: "Indoor use preferred. Keep dry.",
    features: ["Energy Saving", "Warm Glow", "Easy Setup"]
  },
  {
    id: "rgb-neon-strip",
    name: "RGB LED Neon Strip Light with Remote",
    slug: "rgb-led-neon-strip-light-remote",
    price: 1299,
    mrp: 1999,
    fabric: "LED Neon",
    category: "Decorative Lighting",
    color: "RGB",
    occasion: "Party",
    rating: 4.7,
    reviews: 156,
    badge: "Popular",
    image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=800&q=80",
      "https://images.unsplash.com/photo-1565814329452-7811bcbb0c9d?w=800&q=80"
    ],
    description: "Flexible RGB neon-style strip with remote control. Ideal for gaming setups, walls and event backdrops.",
    length: "5 m",
    width: "—",
    blouse: "Remote + adapter",
    care: "Avoid sharp bends. Indoor use.",
    features: ["16 Colors", "Remote", "Dimmable"]
  },
  {
    id: "crystal-pendant-lamp",
    name: "Modern Crystal Pendant Ceiling Light",
    slug: "modern-crystal-pendant-ceiling-light",
    price: 3499,
    mrp: 4999,
    fabric: "Crystal",
    category: "Decorative Lighting",
    color: "Chrome",
    occasion: "Home",
    rating: 4.9,
    reviews: 67,
    badge: "Premium",
    image: "https://images.unsplash.com/photo-1524484487850-8b0b0b0b0b0b?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&q=80",
      "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=800&q=80"
    ],
    description: "Elegant pendant light with crystal accents — perfect for dining and living spaces.",
    length: "Adjustable hang",
    width: "—",
    blouse: "E27 compatible",
    care: "Dust gently. Professional install recommended.",
    features: ["Premium", "Ambient", "Statement"]
  },
  {
    id: "silicone-phone-case",
    name: "Premium Matte Silicone Phone Case",
    slug: "premium-matte-silicone-phone-case",
    price: 399,
    mrp: 699,
    fabric: "Silicone",
    category: "Mobile Accessories",
    color: "Black",
    occasion: "Everyday",
    rating: 4.6,
    reviews: 320,
    badge: "Bestseller",
    image: "https://images.unsplash.com/photo-1601784551446-20c9e09cdb04?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1601784551446-20c9e09cdb04?w=800&q=80",
      "https://images.unsplash.com/photo-1592890288564-76628a30a657?w=800&q=80"
    ],
    description: "Soft-touch matte silicone case with raised edges for camera protection. Slim fit, non-slip grip.",
    length: "Universal fit options",
    width: "—",
    blouse: "—",
    care: "Wipe with soft cloth.",
    features: ["Drop Protect", "Matte", "Slim"]
  },
  {
    id: "fast-charger-20w",
    name: "20W Dual Port Fast Charger + Cable",
    slug: "20w-dual-port-fast-charger-cable",
    price: 799,
    mrp: 1299,
    fabric: "USB-C",
    category: "Mobile Accessories",
    color: "White",
    occasion: "Everyday",
    rating: 4.7,
    reviews: 189,
    badge: "New",
    image: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=800&q=80",
      "https://images.unsplash.com/photo-1591290619762-c588f0e8a5b6?w=800&q=80"
    ],
    description: "Compact 20W dual-port charger with braided USB-C cable. Safe multi-layer protection.",
    length: "1.2 m cable",
    width: "—",
    blouse: "Cable included",
    care: "Use with compatible devices only.",
    features: ["Fast Charge", "Dual Port", "Safe"]
  },
  {
    id: "tws-earbuds-pro",
    name: "Wireless TWS Earbuds Pro",
    slug: "wireless-tws-earbuds-pro",
    price: 1499,
    mrp: 2499,
    fabric: "Bluetooth",
    category: "Mobile Accessories",
    color: "Black",
    occasion: "Everyday",
    rating: 4.5,
    reviews: 412,
    badge: "Popular",
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&q=80",
      "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=800&q=80"
    ],
    description: "True wireless earbuds with deep bass, touch controls and charging case. Long battery life.",
    length: "—",
    width: "—",
    blouse: "Case included",
    care: "Keep dry. Charge regularly.",
    features: ["TWS", "Bass", "Touch Control"]
  },
  {
    id: "powerbank-10000",
    name: "10,000 mAh Slim Power Bank",
    slug: "10000mah-slim-power-bank",
    price: 999,
    mrp: 1599,
    fabric: "Lithium",
    category: "Mobile Accessories",
    color: "Blue",
    occasion: "Travel",
    rating: 4.6,
    reviews: 278,
    badge: "",
    image: "https://images.unsplash.com/photo-1609091839311-b74de64fc4f5?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1609091839311-b74de64fc4f5?w=800&q=80"
    ],
    description: "Slim dual-output power bank with LED indicator. Pocket-friendly travel essential.",
    length: "—",
    width: "—",
    blouse: "—",
    care: "Do not expose to extreme heat.",
    features: ["10000mAh", "Slim", "Dual Output"]
  },
  {
    id: "birthday-balloon-arch",
    name: "Pastel Birthday Balloon Arch Kit",
    slug: "pastel-birthday-balloon-arch-kit",
    price: 899,
    mrp: 1499,
    fabric: "Latex",
    category: "Birthday Decorations",
    color: "Pastel",
    occasion: "Birthday",
    rating: 4.8,
    reviews: 145,
    badge: "Bestseller",
    image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&q=80",
      "https://images.unsplash.com/photo-1464349153735-7db50ed83c84?w=800&q=80"
    ],
    description: "Complete pastel balloon arch kit with strip, pump tip guide and mixed sizes. Party-ready in minutes.",
    length: "Arch ~2–3 m",
    width: "—",
    blouse: "Strip included",
    care: "Inflate same day for best look.",
    features: ["DIY Kit", "Pastel", "Reusable Strip"]
  },
  {
    id: "happy-birthday-banner-led",
    name: "Happy Birthday LED Neon Banner",
    slug: "happy-birthday-led-neon-banner",
    price: 1199,
    mrp: 1799,
    fabric: "LED",
    category: "Birthday Decorations",
    color: "Multicolor",
    occasion: "Birthday",
    rating: 4.7,
    reviews: 98,
    badge: "New",
    image: "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1464349153735-7db50ed83c84?w=800&q=80"
    ],
    description: "Bright LED ‘Happy Birthday’ banner for walls and photo corners. USB powered.",
    length: "Wall mount",
    width: "—",
    blouse: "USB cable",
    care: "Indoor use only.",
    features: ["LED", "Photo Ready", "USB"]
  },
  {
    id: "party-table-centrepiece",
    name: "Birthday Table Centrepiece Set",
    slug: "birthday-table-centrepiece-set",
    price: 599,
    mrp: 999,
    fabric: "Mixed",
    category: "Birthday Decorations",
    color: "Gold",
    occasion: "Birthday",
    rating: 4.5,
    reviews: 72,
    badge: "",
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&q=80"
    ],
    description: "Gold-accent table centrepiece pack with confetti, stands and decorative picks.",
    length: "Set of 5",
    width: "—",
    blouse: "—",
    care: "Store flat when not in use.",
    features: ["Table Décor", "Gold", "Reusable"]
  },
  {
    id: "wedding-string-curtain",
    name: "Wedding Fairy Light Curtain (3x3m)",
    slug: "wedding-fairy-light-curtain-3x3m",
    price: 1899,
    mrp: 2799,
    fabric: "LED",
    category: "Wedding Decorations",
    color: "Warm White",
    occasion: "Wedding",
    rating: 4.9,
    reviews: 88,
    badge: "Premium",
    image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&q=80",
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80"
    ],
    description: " cascading light curtain for mandap, stage and photo backdrop. Soft warm glow for weddings.",
    length: "3 × 3 m",
    width: "—",
    blouse: "Controller included",
    care: "Indoor / covered outdoor.",
    features: ["Backdrop", "Warm White", "Wedding"]
  },
  {
    id: "wedding-floral-lights",
    name: "Artificial Floral String with LEDs",
    slug: "artificial-floral-string-with-leds",
    price: 799,
    mrp: 1299,
    fabric: "Floral + LED",
    category: "Wedding Decorations",
    color: "Ivory",
    occasion: "Wedding",
    rating: 4.6,
    reviews: 54,
    badge: "",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80"
    ],
    description: "Ivory floral garland with embedded micro LEDs — elegant for entrances and tables.",
    length: "5 m",
    width: "—",
    blouse: "Battery pack",
    care: "Remove batteries after use.",
    features: ["Floral", "LED", "Elegant"]
  },
  {
    id: "photo-booth-props",
    name: "Wedding Photo Booth Props Pack",
    slug: "wedding-photo-booth-props-pack",
    price: 449,
    mrp: 799,
    fabric: "Card",
    category: "Wedding Decorations",
    color: "Mix",
    occasion: "Wedding",
    rating: 4.4,
    reviews: 110,
    badge: "Popular",
    image: "https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=800&q=80"
    ],
    description: "Fun printable-style photo props on sticks — perfect for reception photo corners.",
    length: "20 pcs",
    width: "—",
    blouse: "Sticks included",
    care: "Handle with care.",
    features: ["Photo Booth", "Fun", "Value Pack"]
  },
  {
    id: "car-phone-mount",
    name: "Magnetic Car Phone Mount",
    slug: "magnetic-car-phone-mount",
    price: 549,
    mrp: 899,
    fabric: "Metal",
    category: "Mobile Accessories",
    color: "Silver",
    occasion: "Travel",
    rating: 4.5,
    reviews: 201,
    badge: "",
    image: "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=800&q=80"
    ],
    description: "Strong magnetic mount for dashboard or vent. One-hand attach, secure hold.",
    length: "—",
    width: "—",
    blouse: "Metal plates included",
    care: "Clean magnet surface periodically.",
    features: ["Magnetic", "Strong Hold", "Car"]
  },
  {
    id: "desk-lamp-led",
    name: "Foldable LED Desk Study Lamp",
    slug: "foldable-led-desk-study-lamp",
    price: 899,
    mrp: 1399,
    fabric: "LED",
    category: "Decorative Lighting",
    color: "White",
    occasion: "Office",
    rating: 4.7,
    reviews: 133,
    badge: "New",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&q=80"
    ],
    description: "3-colour temperature desk lamp with touch control and USB power. Foldable arm.",
    length: "Foldable",
    width: "—",
    blouse: "USB powered",
    care: "Indoor use.",
    features: ["Touch", "3 Modes", "USB"]
  },
  {
    id: "party-string-multicolor",
    name: "Multicolor Party LED String Lights",
    slug: "multicolor-party-led-string-lights",
    price: 449,
    mrp: 699,
    fabric: "LED",
    category: "Birthday Decorations",
    color: "Multicolor",
    occasion: "Party",
    rating: 4.6,
    reviews: 167,
    badge: "",
    image: "https://images.unsplash.com/photo-1482517965088-3a44b1e4f2f8?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1482517965088-3a44b1e4f2f8?w=800&q=80"
    ],
    description: "Bright multicolor string lights for birthdays and celebrations. Easy plug-and-play.",
    length: "8 m",
    width: "—",
    blouse: "Adapter",
    care: "Keep dry.",
    features: ["Party", "Colorful", "Easy"]
  }
];

const WHATSAPP_NUMBER = "919911523068";

function resolveAsset(src, basePath) {
  if (!src) return "";
  if (/^(https?:|data:|\/)/i.test(src)) return src;
  let clean = String(src).replace(/^(\.\.\/)+/, "").replace(/^\//, "");
  if (!clean.startsWith("assets/")) clean = "assets/" + clean;
  if (basePath === "pages/") return clean;
  return "../" + clean;
}

function getProductImages(product) {
  const raw =
    product.images && product.images.length
      ? product.images
      : product.image
        ? [product.image]
        : [];
  return raw.map((s) => resolveAsset(s, "")).filter(Boolean);
}

function escapeHtml(str) {
  if (str == null) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function formatPrice(price) {
  return "₹" + Number(price).toLocaleString("en-IN");
}

function getWhatsAppLink(product, quantity = 1) {
  const pageUrl =
    window.location.origin +
    window.location.pathname.replace(/\/[^/]*$/, "") +
    "/pages/product.html?id=" +
    product.id;
  const message = `Hi LuxeVally, I would like to order:
Product: ${product.name}
Price: ${formatPrice(product.price)}
Link: ${pageUrl}
Quantity: ${quantity}
Please confirm availability and payment details.`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function createProductCard(product, basePath = "pages/") {
  const productHref = `${basePath}product.html?id=${product.id}`;
  const rawImgs =
    product.images && product.images.length
      ? product.images
      : product.image
        ? [product.image]
        : [];
  const imgs = rawImgs.map((s) => resolveAsset(s, basePath)).filter(Boolean);
  const img1 = imgs[0] || "";
  const img2 = imgs[1] || imgs[0] || "";
  const hasMulti = imgs.length > 1;
  const stars = Math.round(product.rating || 0);
  const starSvg = (filled) =>
    `<svg class="w-3.5 h-3.5 ${filled ? "text-luxe-gold" : "text-gray-300"}" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>`;
  let starHtml = "";
  for (let i = 1; i <= 5; i++) starHtml += starSvg(i <= stars);

  return `
    <div class="product-card group" data-product-id="${product.id}">
      <div class="relative aspect-[3/4] overflow-hidden rounded-2xl bg-luxe-cream">
        <a href="${productHref}" class="absolute inset-0 z-0 block">
          <img src="${img1}" alt="${escapeHtml(product.name)}" class="card-img-primary w-full h-full object-cover transition-opacity duration-500 ${hasMulti ? "group-hover:opacity-0" : ""} absolute inset-0" loading="lazy" onerror="this.style.opacity='0.35'" />
          ${hasMulti ? `<img src="${img2}" alt="" class="card-img-secondary w-full h-full object-cover absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" loading="lazy" onerror="this.style.opacity='0'" />` : ""}
        </a>
        ${product.badge ? `<span class="absolute top-3 left-3 z-10 bg-white/90 backdrop-blur text-luxe-deep text-[11px] px-2.5 py-1 rounded-full font-medium shadow-sm pointer-events-none">${product.badge}</span>` : ""}
        <div class="absolute inset-x-0 bottom-0 p-3 z-20 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
          <button type="button" data-order-whatsapp="${product.id}" class="block w-full bg-[#25D366] text-white text-xs font-medium py-2.5 rounded-lg text-center hover:bg-[#20bd5a] shadow-sm">Order on WhatsApp</button>
        </div>
      </div>
      <div class="pt-4 pb-2 px-1 text-center">
        <a href="${productHref}" class="block">
          <h3 class="text-sm text-gray-800 font-normal tracking-wide mb-1.5 hover:text-luxe-green transition line-clamp-2 min-h-[2.5rem]">${escapeHtml(product.name)}</h3>
        </a>
        <div class="flex items-center justify-center gap-2 text-sm mb-1.5">
          <span class="text-gray-800">Rs. ${Number(product.price).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
          ${product.mrp > product.price ? `<span class="text-gray-400 line-through text-sm">Rs. ${Number(product.mrp).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>` : ""}
        </div>
        <div class="flex items-center justify-center gap-1">
          ${starHtml}
          <span class="text-xs text-gray-500 ml-1">(${Number(product.rating).toFixed(1)})</span>
        </div>
      </div>
    </div>
  `;
}
