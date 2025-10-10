"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Summary = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const summary_interface_1 = require("./summary.interface");
const summarySchema = new mongoose_1.default.Schema({
    date: { type: String, unique: true, required: true },
    totalMeal: {
        type: Number,
        required: true,
    },
    mealRate: { type: Number, enum: summary_interface_1.IRate, default: summary_interface_1.IRate.normal },
    totalMoney: {
        type: Number,
        required: true,
    },
}, { timestamps: true });
exports.Summary = mongoose_1.default.model("Summary", summarySchema);
