const { makeModel } = require("../models/GenericDoc");
const Config = require("../models/Config");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { DEFAULT_RESPONSIBLE, DEFAULT_CATEGORIES, SEED_HOLIDAYS } = require("./data");

async function runSeed() {
  const adminUsername = (process.env.ADMIN_USERNAME || "").trim();
  const adminPassword = process.env.ADMIN_PASSWORD || "";

  if (adminUsername && adminPassword) {
    if (adminPassword.length < 6) {
      throw new Error("ADMIN_PASSWORD must be at least 6 characters");
    }

    const existingAdmin = await User.findOne({ username: adminUsername });
    if (!existingAdmin) {
      const passwordHash = await bcrypt.hash(adminPassword, 10);
      await User.create({ username: adminUsername, passwordHash });
      console.log(`[seed] created admin user: ${adminUsername}`);
    }
  } else {
    console.warn("[seed] ADMIN_USERNAME and ADMIN_PASSWORD are not set; skipped admin user");
  }

  const Holiday = makeModel("holidays");
  const holidayCount = await Holiday.countDocuments({});
  if (holidayCount === 0) {
    await Holiday.insertMany(SEED_HOLIDAYS);
    console.log(`[seed] inserted ${SEED_HOLIDAYS.length} holidays`);
  }

  const existingConfig = await Config.findById("singleton");
  if (!existingConfig) {
    await Config.create({ _id: "singleton", responsiblePersons: DEFAULT_RESPONSIBLE, categories: DEFAULT_CATEGORIES });
    console.log("[seed] created default config (responsible persons + categories)");
  }
}

module.exports = { runSeed };
