/**
 * LuxeVally — static site + contact mail API
 * Gmail SMTP via Google App Password (never expose in frontend)
 *
 * Setup:
 *   1. Copy ../.env.example to ../.env (or server/.env)
 *   2. Set GMAIL_USER + GMAIL_APP_PASSWORD
 *   3. cd server && npm install && npm start
 *   4. Open http://localhost:3001
 */
const http = require("http");
const fs = require("fs");
const path = require("path");
const { URL } = require("url");

let nodemailer;
try {
  nodemailer = require("nodemailer");
} catch (e) {
  try {
    nodemailer = require(path.join(__dirname, "..", "node_modules", "nodemailer"));
  } catch (e2) {
    nodemailer = null;
  }
}

function loadEnv() {
  const candidates = [
    path.join(__dirname, ".env"),
    path.join(__dirname, "..", ".env"),
  ];
  for (const file of candidates) {
    if (!fs.existsSync(file)) continue;
    const lines = fs.readFileSync(file, "utf8").split(/\r?\n/);
    for (const line of lines) {
      const t = line.trim();
      if (!t || t.startsWith("#")) continue;
      const i = t.indexOf("=");
      if (i < 1) continue;
      const key = t.slice(0, i).trim();
      let val = t.slice(i + 1).trim();
      if (
        (val.startsWith('"') && val.endsWith('"')) ||
        (val.startsWith("'") && val.endsWith("'"))
      ) {
        val = val.slice(1, -1);
      }
      if (process.env[key] === undefined) process.env[key] = val;
    }
  }
}

loadEnv();

const PORT = Number(process.env.PORT) || 3001;
const ROOT = path.join(__dirname, "..");
const GMAIL_USER = (process.env.GMAIL_USER || "").trim();
const GMAIL_APP_PASSWORD = (process.env.GMAIL_APP_PASSWORD || "")
  .replace(/\s+/g, "")
  .trim();
const CONTACT_TO = (process.env.CONTACT_TO || GMAIL_USER).trim();
const CORS_ORIGIN = process.env.CORS_ORIGIN || "*";

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".txt": "text/plain; charset=utf-8",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
};

const hits = new Map();
function rateLimit(ip) {
  const now = Date.now();
  const windowMs = 15 * 60 * 1000;
  const max = 8;
  let list = (hits.get(ip) || []).filter((t) => now - t < windowMs);
  if (list.length >= max) {
    hits.set(ip, list);
    return false;
  }
  list.push(now);
  hits.set(ip, list);
  return true;
}

function sanitize(str, max) {
  return String(str || "")
    .replace(/[\u0000-\u001f\u007f]/g, " ")
    .trim()
    .slice(0, max);
}

function isEmail(s) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    let size = 0;
    req.on("data", (c) => {
      size += c.length;
      if (size > 50_000) {
        reject(new Error("Payload too large"));
        req.destroy();
        return;
      }
      chunks.push(c);
    });
    req.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
    req.on("error", reject);
  });
}

function sendJson(res, status, obj) {
  const body = JSON.stringify(obj);
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Content-Length": Buffer.byteLength(body),
    "Access-Control-Allow-Origin": CORS_ORIGIN,
    "Access-Control-Allow-Methods": "POST, OPTIONS, GET",
    "Access-Control-Allow-Headers": "Content-Type",
  });
  res.end(body);
}

function safeJoin(root, reqPath) {
  const decoded = decodeURIComponent(reqPath.split("?")[0]);
  const cleaned = path.normalize(decoded).replace(/^(\.\.[/\\])+/, "");
  const full = path.join(root, cleaned);
  if (!full.startsWith(root)) return null;
  return full;
}

function serveStatic(req, res, urlPath) {
  let rel = urlPath === "/" ? "/index.html" : urlPath;
  let filePath = safeJoin(ROOT, rel);
  if (!filePath) {
    res.writeHead(400);
    return res.end("Bad path");
  }
  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, "index.html");
  }
  if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    return res.end("Not found");
  }
  const ext = path.extname(filePath).toLowerCase();
  const type = MIME[ext] || "application/octet-stream";
  res.writeHead(200, { "Content-Type": type });
  fs.createReadStream(filePath).pipe(res);
}

async function handleContact(req, res) {
  if (!nodemailer) {
    return sendJson(res, 503, {
      error: "nodemailer not installed. Run: cd server && npm install",
    });
  }
  if (!GMAIL_USER || !GMAIL_APP_PASSWORD) {
    return sendJson(res, 503, {
      error:
        "Mail not configured. Create .env with GMAIL_USER and GMAIL_APP_PASSWORD (Google App Password).",
    });
  }
  if (GMAIL_APP_PASSWORD.length < 16) {
    return sendJson(res, 503, {
      error: "GMAIL_APP_PASSWORD looks invalid. Use the 16-character Google App Password.",
    });
  }

  const ip =
    (req.headers["x-forwarded-for"] || "").split(",")[0].trim() ||
    req.socket.remoteAddress ||
    "unknown";
  if (!rateLimit(ip)) {
    return sendJson(res, 429, { error: "Too many requests. Try again later." });
  }

  let raw;
  try {
    raw = await readBody(req);
  } catch {
    return sendJson(res, 400, { error: "Invalid body" });
  }

  let data;
  try {
    data = JSON.parse(raw || "{}");
  } catch {
    return sendJson(res, 400, { error: "Invalid JSON" });
  }

  const name = sanitize(data.name, 80);
  const email = sanitize(data.email, 120);
  const phone = sanitize(data.phone, 20);
  const subject = sanitize(data.subject, 120);
  const message = sanitize(data.message, 2000);

  if (!name || !email || !subject || !message) {
    return sendJson(res, 400, { error: "Missing required fields" });
  }
  if (!isEmail(email)) {
    return sendJson(res, 400, { error: "Invalid email" });
  }

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: { user: GMAIL_USER, pass: GMAIL_APP_PASSWORD },
  });

  const text = [
    "New contact form message from LuxeVally website",
    "",
    "Name: " + name,
    "Email: " + email,
    "Phone: " + (phone || "—"),
    "Subject: " + subject,
    "",
    message,
    "",
    "—",
    "IP: " + ip,
    "Time: " + new Date().toISOString(),
  ].join("\n");

  try {
    await transporter.sendMail({
      from: `"LuxeVally Contact" <${GMAIL_USER}>`,
      to: CONTACT_TO,
      replyTo: email,
      subject: "[LuxeVally Contact] " + subject,
      text,
    });
    return sendJson(res, 200, { ok: true });
  } catch (err) {
    console.error("Mail error:", err && err.message ? err.message : err);
    return sendJson(res, 500, {
      error:
        "Gmail rejected the send. Check App Password, 2-Step Verification, and that GMAIL_USER matches the Google account.",
    });
  }
}

const server = http.createServer(async (req, res) => {
  const method = req.method || "GET";
  const url = new URL(req.url || "/", "http://localhost");

  if (method === "OPTIONS") {
    res.writeHead(204, {
      "Access-Control-Allow-Origin": CORS_ORIGIN,
      "Access-Control-Allow-Methods": "POST, OPTIONS, GET",
      "Access-Control-Allow-Headers": "Content-Type",
    });
    return res.end();
  }

  if (method === "GET" && url.pathname === "/api/health") {
    return sendJson(res, 200, {
      ok: true,
      nodemailer: Boolean(nodemailer),
      mailConfigured: Boolean(GMAIL_USER && GMAIL_APP_PASSWORD && GMAIL_APP_PASSWORD.length >= 16),
      user: GMAIL_USER ? GMAIL_USER.replace(/(.{2}).+(@.+)/, "$1***$2") : null,
    });
  }

  if (method === "POST" && url.pathname === "/api/contact") {
    return handleContact(req, res);
  }

  if (method === "GET" || method === "HEAD") {
    return serveStatic(req, res, url.pathname);
  }

  sendJson(res, 405, { error: "Method not allowed" });
});

server.listen(PORT, () => {
  console.log("");
  console.log("LuxeVally running at  http://localhost:" + PORT);
  console.log("Contact page         http://localhost:" + PORT + "/pages/contact.html");
  console.log("Health check         http://localhost:" + PORT + "/api/health");
  console.log(
    "Mail configured:     " +
      (GMAIL_USER && GMAIL_APP_PASSWORD ? "yes (" + GMAIL_USER + ")" : "NO — set GMAIL_USER + GMAIL_APP_PASSWORD in .env")
  );
  console.log("nodemailer:          " + (nodemailer ? "ok" : "MISSING — run npm install in server/"));
  console.log("");
});
