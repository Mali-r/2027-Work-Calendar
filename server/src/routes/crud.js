const express = require("express");
const authMiddleware = require("../middleware/auth");

function serialize(doc) {
  const obj = doc.toObject();
  const { _id, __v, ...rest } = obj;
  return { id: _id.toString(), ...rest };
}

function crudRouter(Model) {
  const router = express.Router();
  router.use(authMiddleware);

  router.get("/", async (req, res) => {
    try {
      const docs = await Model.find({}).sort({ _id: 1 });
      res.json(docs.map(serialize));
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: "โหลดข้อมูลไม่สำเร็จ" });
    }
  });

  router.post("/", async (req, res) => {
    try {
      const doc = await Model.create(req.body || {});
      res.json(serialize(doc));
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: "บันทึกไม่สำเร็จ" });
    }
  });

  router.put("/:id", async (req, res) => {
    try {
      const doc = await Model.findByIdAndUpdate(req.params.id, req.body || {}, { new: true, upsert: true });
      res.json(serialize(doc));
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: "บันทึกไม่สำเร็จ" });
    }
  });

  router.delete("/:id", async (req, res) => {
    try {
      await Model.findByIdAndDelete(req.params.id);
      res.json({ ok: true });
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: "ลบไม่สำเร็จ" });
    }
  });

  return router;
}

module.exports = crudRouter;
