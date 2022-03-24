const { Schema, model, Types } = require("mongoose");

const schema = new Schema({
  product: { type: String, required: true },
  date: { type: Date, default: Date.now },
  createDate: { type: Date, default: Date.now },
  profit: { type: Types.Decimal128, required: true },
  price: { type: Types.Decimal128, required: true },
});

module.exports = model("Product", schema);
