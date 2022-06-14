const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  denumire: { type: String, required: true, maxLength: 100 },
  descriere: { type: String, required: true },
  pret: { type: Number, required: true },
  culoriDisponibile: [{ type: Object, required: true }],
  ingrediente: { type: String, required: true },
  imagini: [{ type: Object, required: true }],
  taguri: [{ type: Object, required: true }],
  idBrand: { type: Schema.Types.ObjectId, ref: "Brand" },
  idSubSubCategorie: { type: Schema.Types.ObjectId, ref: "SubSubCategory" },
});

module.exports = mongoose.model("Product", ProductSchema);
