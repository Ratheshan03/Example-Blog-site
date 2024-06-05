import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: { required: true, type: String, unique: true, min: 3, max: 20 },
    email: { required: true, type: String, unique: true, max: 50 },
    password: { required: true, type: String, min: 6 },
    img: { type: String },
    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const postSchema = new mongoose.Schema(
  {
    title: { required: true, type: String },
    desc: { required: true, type: String },
    img: { type: String },
    userId: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

export const User = mongoose.models?.User || mongoose.model("User", userSchema);
export const Post = mongoose.models?.Post || mongoose.model("Post", postSchema);
