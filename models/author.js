import mongoose, { Schema } from "mongoose";

const authorSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    password: String,
    picture: String,
  },
  {
    timestamps: true,
  }
);

const Author = mongoose.models.Author || mongoose.model("Author", authorSchema);

export default Author;
