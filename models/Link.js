import pkg from "mongoose";
const { Types, Schema, model } = pkg;

const linkSchema = new Schema({
  from: { type: String, required: true },
  to: { type: String, required: true, unique: true },
  code: { type: String, required: true, unique: true },
  data: { type: Date, default: Date.now },
  click: { type: Number, default: 0 },
  owner: { type: Types.ObjectId, ref: "User" },
});

export default model("Link", linkSchema);
