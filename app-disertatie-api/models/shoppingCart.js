const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CartSchema = new Schema({
  produse: [{ type: Object, required: true }],
  idUtilizator: { type: Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Cart", CartSchema);
