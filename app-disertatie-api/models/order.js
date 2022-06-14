const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  cosCumparaturi: { type: Object },
  idUtilizator: { type: Schema.Types.ObjectId, ref: "User" },
  data: { type: Date, required: true },
  valoareProduse: { type: Number, required: true },
  taxaLivrare: { type: Number, required: true },
  discount: { type: Number, required: true },
  modalitatePlata: { type: String, required: true },
  adresaLlivrare: { type: Object },
  datePersonale: { type: Object },
  status: { type: String },
});

module.exports = mongoose.model("Order", OrderSchema);
