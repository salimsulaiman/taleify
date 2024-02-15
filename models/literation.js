import mongoose, { Schema } from "mongoose";

const literationSchema = new mongoose.Schema(
  {
    title: String,
    slug: String,
    picture: String,
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Author",
    },
    genre: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Genre",
    },
    rating: Number,
    desc: String,
  },
  {
    timestamps: true,
  }
);

const Literation = mongoose.models.Literation || mongoose.model("Literation", literationSchema);

export default Literation;
