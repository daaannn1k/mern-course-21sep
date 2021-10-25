import pkg from "mongoose";
const { Types, Schema, model } = pkg;

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  links: [{ type: Types.ObjectId, ref: "Link" }],
});

export default model("User", userSchema);
