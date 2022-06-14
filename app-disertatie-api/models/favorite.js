const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const FavoriteSchema = new Schema({
  idProdus: { type: Schema.Types.ObjectId, ref: "Product" },
  idUtilizator: { type: Schema.Types.ObjectId, ref: "User" }
});

module.exports = mongoose.model("Favorite", FavoriteSchema);
