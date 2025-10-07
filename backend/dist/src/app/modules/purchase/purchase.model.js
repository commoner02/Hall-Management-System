"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Purchase = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const purchaseSchema = new mongoose_1.default.Schema({
    manager: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    date: { type: Date, required: true }, // normalize when creating
    item_name: { type: String, required: true },
    quantity: { type: Number, default: 1 },
    cost: { type: Number, required: true },
}, { timestamps: true });
exports.Purchase = mongoose_1.default.model("Purchase", purchaseSchema);
