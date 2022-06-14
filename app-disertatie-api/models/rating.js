const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const RatingSchema = new Schema({
  idProdus: { type: Schema.Types.ObjectId, ref: "Product" },
  idUtilizator: { type: Schema.Types.ObjectId, ref: "User" },
  comentariu: { type: String, required: true },
  rating: { type: Number, required: true },
  data: { type: Date, required: true },
});

module.exports = mongoose.model("Rating", RatingSchema);
