import mongoose from "mongoose";
import { IROLE, IUser } from "./user.interface";

const userSchema = new mongoose.Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: IROLE,
      default: IROLE.student,
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
