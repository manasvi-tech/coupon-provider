import mongoose from "mongoose";
import Coupon  from "./models/coupon.model.js";
import crypto from "crypto";

const MONGO_DB_URI = "mongodb+srv://manasviarora28:m8hvq0jx8fpKi02T@cluster0.xylur.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
// Connect to MongoDB
mongoose.connect("mongodb+srv://manasviarora28:m8hvq0jx8fpKi02T@cluster0.xylur.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// Function to generate random coupon codes
const generateCouponCode = () => crypto.randomBytes(5).toString("hex").toUpperCase();

// Function to insert random coupons
const insertCoupons = async (numCoupons = 10) => {
  try {
    const coupons = Array.from({ length: numCoupons }, () => ({ code: generateCouponCode() }));
    await Coupon.insertMany(coupons);
    console.log(`${numCoupons} coupons inserted successfully.`);
    mongoose.disconnect();
  } catch (err) {
    console.error("Error inserting coupons:", err);
    mongoose.disconnect();
  }
};

insertCoupons(10); // Generate and insert 10 coupons