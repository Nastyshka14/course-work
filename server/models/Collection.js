const { Schema, model, Types } = require("mongoose");

const schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  theme: { type: String },
  image: { type: String, default: ''},
  date: { type: Date, default: new Date() },
  items: { type: Types.ObjectId, ref: "Item" },
  owner: { type: Types.ObjectId, ref: "User" },
  ownerName:{type: String, ref: 'User'},
});

module.exports = model("Collection", schema);
