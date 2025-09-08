import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: {
      required: true,
      type: String,
    },
    body: {
      required: true,
      type: String,
    },
    author: {
      required: true,
      type: String,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true
    }
  },
  { timestamps: true }
);

const BLOG = mongoose.models.blog || mongoose.model("blog", blogSchema);

export default BLOG