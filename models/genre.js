import mongoose, { Schema } from "mongoose";

const genreSchema = new mongoose.Schema(
  {
    name: String,
  },
  {
    timestamps: true,
  }
);

const Genre = mongoose.models.Genre || mongoose.model("Genre", genreSchema);

export default Genre;
