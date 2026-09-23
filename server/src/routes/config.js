const express = require("express");
const authMiddleware = require("../middleware/auth");
const Config = require("../models/Config");

const router = express.Router();
router.use(authMiddleware);

router.get("/", async (req, res) => {
  try {
    let doc = await Config.findById("singleton");
    if (!doc) doc = await Config.create({ _id: "singleton", responsiblePersons: [], categories: [] });
    res.json({ responsiblePersons: doc.responsiblePersons, categories: doc.categories });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "โหลดการตั้งค่าไม่สำเร็จ" });
  }
});

router.put("/", async (req, res) => {
  try {
    const { responsiblePersons, categories } = req.body || {};
    const doc = await Config.findByIdAndUpdate(
      "singleton",
      { responsiblePersons: responsiblePersons || [], categories: categories || [] },
      { new: true, upsert: true }
    );
    res.json({ responsiblePersons: doc.responsiblePersons, categories: doc.categories });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "บันทึกการตั้งค่าไม่สำเร็จ" });
  }
});

module.exports = router;
