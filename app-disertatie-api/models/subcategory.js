const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const SubCategorySchema = new Schema({
  nume: { type: String, required: true, maxLength: 100 },
  descriere: { type: String, required: true },
  status: { type: String, required: true },
  idCategorie: { type: Schema.Types.ObjectId, ref: "Category" },
});

module.exports = mongoose.model("SubCategory", SubCategorySchema);
