import Coupon from "../models/coupon.model.js";
import Claim from "../models/claim.model.js";

const getNextCoupon = async () => {
    return await Coupon.findOne({ isClaimed: false }).sort({ _id: 1 });
};

export const newCoupon = async (req, res) => {
    const userIP = req.headers["x-forwarded-for"] || req.socket.remoteAddress; // Get real IP
  const userCookie = req.cookies.coupon_claimed;

  console.log(`User IP: ${userIP}`); // Debugging: Ensure IP is correctly logged

  // Check if the IP has already claimed a coupon in the last hour
  const existingClaim = await Coupon.findOne({
    claimedBy: userIP,
    timestamp: { $gt: new Date(Date.now() - 3600000) }, // 1-hour restriction
  });

  if (existingClaim) {
    const timeLeft = Math.ceil((existingClaim.timestamp.getTime() + 3600000 - Date.now()) / 1000);
    return res.status(429).json({ message: "Try again in", countdown: timeLeft });
  }

  // Check session-based cookie restriction
  if (userCookie) {
    return res.status(429).json({ message: "You have already claimed a coupon in this session." });
  }

  // Get the next available coupon
  const coupon = await getNextCoupon();
  if (!coupon) return res.status(404).json({ message: "No coupons available" });

  // Mark the coupon as claimed
  coupon.isClaimed = true;
  coupon.claimedBy = userIP; // ✅ Store IP address
  coupon.timestamp = new Date();
  await coupon.save();

  res.cookie("coupon_claimed", "true", { httpOnly: true, maxAge: 3600000 }); // 1-hour cookie

  return res.json({ coupon: coupon.code });
};

export const allCoupon = async (req, res) => {
    const coupons = await Coupon.find({ isClaimed: false }).select("code");
    res.json({ availableCoupons: coupons });
}
