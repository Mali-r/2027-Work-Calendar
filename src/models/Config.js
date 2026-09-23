const mongoose = require("mongoose");

const configSchema = new mongoose.Schema(
  {
    _id: { type: String, default: "singleton" },
    responsiblePersons: { type: [String], default: [] },
    categories: { type: [mongoose.Schema.Types.Mixed], default: [] },
  },
  { collection: "config" }
);

module.exports = mongoose.models.Config || mongoose.model("Config", configSchema);
