import mongoose from "mongoose";
import { IRate, ISummary } from "./summary.interface";

const summarySchema = new mongoose.Schema<ISummary>(
  {
    date: { type: String, unique: true, required: true },
    totalMeal: {
      type: Number,
      required: true,
    },
    mealRate: { type: Number, enum: IRate, default: IRate.normal },
    totalMoney: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export const Summary = mongoose.model("Summary", summarySchema);
