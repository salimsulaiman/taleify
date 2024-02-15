import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    picture: String,
    password: String,
  },
  {
    timestamps: true,
  }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
