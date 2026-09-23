const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

function signToken(user) {
  return jwt.sign({ sub: user._id.toString(), username: user.username }, process.env.JWT_SECRET, { expiresIn: "30d" });
}

router.post("/register", async (req, res) => {
  try {
    const { username, password, code } = req.body || {};
    if (!username || !password) return res.status(400).json({ error: "กรุณากรอกชื่อผู้ใช้และรหัสผ่าน" });
    if (password.length < 6) return res.status(400).json({ error: "รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร" });
    const requiredCode = process.env.REGISTER_CODE || "";
    if (requiredCode && code !== requiredCode) {
      return res.status(403).json({ error: "รหัสเชิญไม่ถูกต้อง" });
    }
    const existing = await User.findOne({ username: username.trim() });
    if (existing) return res.status(409).json({ error: "มีชื่อผู้ใช้นี้อยู่แล้ว" });
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ username: username.trim(), passwordHash });
    const token = signToken(user);
    res.json({ token, username: user.username });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "สมัครสมาชิกไม่สำเร็จ" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body || {};
    if (!username || !password) return res.status(400).json({ error: "กรุณากรอกชื่อผู้ใช้และรหัสผ่าน" });
    const user = await User.findOne({ username: username.trim() });
    if (!user) return res.status(401).json({ error: "ไม่พบชื่อผู้ใช้นี้" });
    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(401).json({ error: "รหัสผ่านไม่ถูกต้อง" });
    const token = signToken(user);
    res.json({ token, username: user.username });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "เข้าสู่ระบบไม่สำเร็จ" });
  }
});

router.get("/me", authMiddleware, (req, res) => {
  res.json({ username: req.username });
});

module.exports = router;
