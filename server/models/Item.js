const { Schema, model, Types } = require("mongoose");

const schema = new Schema({
  name: { type: String, required: true },
  tags: { type: String, required: true },
  date: { type: Date, default: new Date() },
  collections: { type: Types.ObjectId, ref: "Collection" },
  collectionsName:{type: String, ref: 'Collection'},
  owner: { type: Types.ObjectId, ref: "User" },
  ownerName:{type: String, ref: 'User'},
});

module.exports = model("Item", schema);
