import mongoose from "mongoose";
import { IMeal } from "./meal.interface";

const MealSchema = new mongoose.Schema<IMeal>(
  {
    meals:{
      type: [String],
      required: true
    },
    items: {
      type: [{
        item: { type: String, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true }
      }],
      required: true
    },
    type: {
      type: String
    }
  },
  { timestamps: true }
);


export const Meal = mongoose.model("Meal", MealSchema);
