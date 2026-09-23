const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;
  if (!token) return res.status(401).json({ error: "ไม่ได้เข้าสู่ระบบ (missing token)" });
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = payload.sub;
    req.username = payload.username;
    next();
  } catch (e) {
    return res.status(401).json({ error: "เซสชันหมดอายุหรือไม่ถูกต้อง" });
  }
}

module.exports = auth;
