const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  role: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  emailAddress: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  password: { type: String, required: true },
  birthday: { type: Date, required: true },
  country: { type: String },
  county: { type: String },
  city: { type: String },
  sector: { type: Number },
  streetName: { type: String },
  streetNumber: { type: Number },
  bloc: { type: String },
  scara: { type: String },
  apartmentNumber: { type: Number },
  etaj: { type: String },
  puncteFidelitate: {type: Number}
});

module.exports = mongoose.model('User', UserSchema);