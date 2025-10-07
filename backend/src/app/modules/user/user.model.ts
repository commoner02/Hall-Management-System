import mongoose from "mongoose";
import { IROLE, IStatus, IUser } from "./user.interface";

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
    mealStatus:{
      type: String,
      enum: IStatus,
      default: IStatus.on
    }
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
