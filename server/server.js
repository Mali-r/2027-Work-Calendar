require("dotenv").config();
const express = require("express");
const cors = require("cors");

const { connectDB } = require("./src/db");
const { runSeed } = require("./src/seed");
const { makeModel } = require("./src/models/GenericDoc");
const crudRouter = require("./src/routes/crud");
const authRoutes = require("./src/routes/auth");
const configRoutes = require("./src/routes/config");

const app = express();

const corsOrigin = process.env.CORS_ORIGIN || "*";
app.use(cors({ origin: corsOrigin === "*" ? true : corsOrigin.split(",").map((s) => s.trim()) }));
app.use(express.json({ limit: "5mb" }));

app.get("/", (req, res) => res.json({ ok: true, service: "2027-smart-work-calendar-api" }));
app.get("/api/health", (req, res) => res.json({ ok: true }));

app.use("/api/auth", authRoutes);
app.use("/api/config", configRoutes);
app.use("/api/tasks", crudRouter(makeModel("tasks")));
app.use("/api/meetings", crudRouter(makeModel("meetings")));
app.use("/api/notes", crudRouter(makeModel("notes")));
app.use("/api/followups", crudRouter(makeModel("followups")));
app.use("/api/monthlygoals", crudRouter(makeModel("monthlygoals")));
app.use("/api/weeklygoals", crudRouter(makeModel("weeklygoals")));
app.use("/api/holidays", crudRouter(makeModel("holidays")));

app.use((req, res) => res.status(404).json({ error: "Not found" }));

const PORT = process.env.PORT || 4000;

async function start() {
  await connectDB();
  await runSeed();
  app.listen(PORT, () => console.log(`[server] listening on port ${PORT}`));
}

start().catch((e) => {
  console.error("[server] failed to start:", e.message);
  process.exit(1);
});
