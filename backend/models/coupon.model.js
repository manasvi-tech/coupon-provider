import mongoose from "mongoose";

const CouponSchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true },
    isClaimed: { type: Boolean, default: false }, // Track if the coupon is already assigned
    claimedBy: { type: String, default: null }, // Store IP or user identifier
    timestamp: { type: Date, default: null }, // Store when the coupon was claimed
  });

export default mongoose.model("Coupon", CouponSchema);
