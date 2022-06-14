const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const SpecificationSchema = new Schema({
  denumire: { type: String, required: true },
  optiuni: [{ type: Object, required: true }],
  idSubSubCategorie: { type: Schema.Types.ObjectId, ref: "SubSubCategory" },
});

module.exports = mongoose.model("Specification", SpecificationSchema);
