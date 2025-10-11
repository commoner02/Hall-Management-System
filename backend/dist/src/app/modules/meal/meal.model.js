"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Meal = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const meal_interface_1 = require("./meal.interface");
const MealSchema = new mongoose_1.default.Schema({
    meals: {
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
        default: meal_interface_1.IType.normal
    },
    totalCost: {
        type: Number,
        required: true
    },
    date: {
        type: String,
        required: true,
        unique: true
    }
}, { timestamps: true });
exports.Meal = mongoose_1.default.model("Meal", MealSchema);
