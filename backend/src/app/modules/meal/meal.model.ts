import mongoose from "mongoose";
import { IMeal, IType } from "./meal.interface";

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
      type: String,
      default: IType.normal
    },
    totalCost: {
      type: Number,
      required: true
    },
    date:{
      type: String,
      required: true,
      unique: true
    }
  },
  { timestamps: true }
);


export const Meal = mongoose.model("Meal", MealSchema);
