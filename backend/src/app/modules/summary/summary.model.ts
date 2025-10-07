import mongoose from "mongoose";

const summarySchema = new mongoose.Schema(
  {
    date: { type: Date, unique: true, required: true },
    totalLunch: { type: Number, default: 0 },
    totalDinner: { type: Number, default: 0 },
    totalCost: { type: Number, default: 0 },
    mealRate: { type: Number, default: 0 }, // cost per meal
  },
  { timestamps: true }
);

export const Summary = mongoose.model("Summary", summarySchema);
