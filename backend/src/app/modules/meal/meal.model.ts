import mongoose from "mongoose";

const mealSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    date: { type: Date, required: true },
    lunch: { type: Boolean, default: false },
    dinner: { type: Boolean, default: false },
  },
  { timestamps: true }
);

mealSchema.index({ user: 1, date: 1 }, { unique: true });

export const Meal = mongoose.model("Meal", mealSchema);
