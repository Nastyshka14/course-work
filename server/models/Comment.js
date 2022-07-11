const { Schema, model, Types } = require("mongoose");

const schema = new Schema({
  comment: { type: String, required: true },
  date: { type: Date, required: true, default: new Date() },
  item: { type: Types.ObjectId, required: true, ref: "Item" },
  author: { type: Types.ObjectId, required: true, ref: "User" },
  authorName: { type: String, required: true },
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },
  liked: [{type: Types.ObjectId, ref: "User", default: [] }],
  disliked: [{type: Types.ObjectId, ref: "User", default: [] }],
  editedAt: { type: Date }
});

module.exports = model("Comment", schema);
