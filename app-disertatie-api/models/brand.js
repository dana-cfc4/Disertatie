const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const BrandSchema = new Schema({
  nume: { type: String, required: true, maxLength: 100 },
  numeStrada: { type: String, required: true },
  numarStrada: { type: Number },
  email: { type: String, required: true },
  numarTelefon: { type: String, required: true },
});

module.exports = mongoose.model("Brand", BrandSchema);
