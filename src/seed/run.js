require("dotenv").config();
const mongoose = require("mongoose");

const { connectDB } = require("../db");
const { runSeed } = require("./index");

async function main() {
  await connectDB();
  await runSeed();
}

main()
  .then(async () => {
    await mongoose.disconnect();
    console.log("[seed] completed");
  })
  .catch(async (error) => {
    console.error("[seed] failed:", error.message);
    await mongoose.disconnect();
    process.exitCode = 1;
  });