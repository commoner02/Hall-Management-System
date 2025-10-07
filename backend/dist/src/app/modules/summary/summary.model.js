"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Summary = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const summarySchema = new mongoose_1.default.Schema({
    date: { type: Date, unique: true, required: true },
    totalLunch: { type: Number, default: 0 },
    totalDinner: { type: Number, default: 0 },
    totalCost: { type: Number, default: 0 },
    mealRate: { type: Number, default: 0 }, // cost per meal
}, { timestamps: true });
exports.Summary = mongoose_1.default.model("Summary", summarySchema);
