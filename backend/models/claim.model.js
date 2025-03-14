// here claim schema can be removed but if we do 
// it would be Harder to track multiple claims per user (if needed in the future).
import mongoose from "mongoose";

const ClaimSchema = new mongoose.Schema({
  ip: { 
    type: String, 
    required: true 
},
  timestamp: {
    type: Date,
    default: Date.now, // Auto-generate timestamp
    required: true },
});

export default mongoose.model("Claim", ClaimSchema);