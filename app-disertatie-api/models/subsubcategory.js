const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const SubSubCategorySchema = new Schema({
  nume: { type: String, required: true, maxLength: 100 },
  descriere: { type: String, required: true },
  status: { type: String, required: true },
  idSubCategorie: { type: Schema.Types.ObjectId, ref: "SubCategory" },
});

module.exports = mongoose.model("SubSubCategory", SubSubCategorySchema);
