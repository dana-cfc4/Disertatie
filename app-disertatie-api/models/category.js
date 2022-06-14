const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  nume: { type: String, required: true, maxLength: 100 },
  descriere: { type: String, required: true },
  status: { type: String, required: true },
});

module.exports = mongoose.model("Category", CategorySchema);
