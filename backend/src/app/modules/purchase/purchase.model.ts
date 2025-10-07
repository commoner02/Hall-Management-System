import mongoose from "mongoose";

const purchaseSchema = new mongoose.Schema(
  {
    manager: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    date: { type: Date, required: true }, // normalize when creating
    item_name: { type: String, required: true },
    quantity: { type: Number, default: 1 },
    cost: { type: Number, required: true },
  },
  { timestamps: true }
);

export const Purchase = mongoose.model("Purchase", purchaseSchema);
