const mongoose = require("mongoose");

// Every app collection (tasks, meetings, notes, followups, monthlygoals,
// weeklygoals, holidays) stores whatever shape the frontend sends — schema
// is intentionally loose (strict:false) so the client and server never need
// to be kept in lockstep field-by-field.
function makeModel(collectionName) {
  const schemaKey = "Generic_" + collectionName;
  if (mongoose.models[schemaKey]) return mongoose.models[schemaKey];
  const schema = new mongoose.Schema({}, { strict: false, timestamps: false, collection: collectionName });
  return mongoose.model(schemaKey, schema);
}

module.exports = { makeModel };
