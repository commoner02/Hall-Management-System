"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Meal = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mealSchema = new mongoose_1.default.Schema({
    user: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "User", required: true },
    date: { type: Date, required: true },
    lunch: { type: Boolean, default: false },
    dinner: { type: Boolean, default: false },
}, { timestamps: true });
mealSchema.index({ user: 1, date: 1 }, { unique: true });
exports.Meal = mongoose_1.default.model("Meal", mealSchema);
