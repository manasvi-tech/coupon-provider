import Coupon from "../models/coupon.model.js";
import Claim from "../models/claim.model.js";

const getNextCoupon = async () => {
    return await Coupon.findOne({ isClaimed: false }).sort({ _id: 1 });
};

export const newCoupon = async (req, res) => {
    const userIP = req.ip;
    const userCookie = req.cookies.coupon_claimed;

    // Check IP restriction (2-hour cooldown)
    const existingClaim = await Claim.findOne({ ip: userIP, timestamp: { $gt: new Date(Date.now() - 7200000) } });
    if (existingClaim) {
        const timeLeft = (existingClaim.timestamp.getTime() + 7200000 - Date.now()) / 60000;
        return res.status(429).json({ message: `Try again in ${timeLeft.toFixed(1)} minutes` });
    }



    // Check cookie restriction (session-based)
    if (userCookie) {
        return res.status(429).json({ message: "You have already claimed a coupon in this session." });
    }

    // Get next available coupon
    const coupon = await getNextCoupon();
    if (!coupon) return res.status(404).json({ message: "No coupons available" });

    // Mark coupon as claimed
    coupon.isClaimed = true;
    coupon.claimedBy = userIP;
    coupon.timestamp = new Date();
    await coupon.save();

    // Store claim record
    await Claim.create({ ip: userIP, timestamp: Date.now() });
    res.cookie("coupon_claimed", "true", { httpOnly: true, maxAge: 3600000 });

    return res.json({ coupon: coupon.code });
};

export const allCoupon = async (req, res) => {
    const coupons = await Coupon.find({ isClaimed: false }).select("code");
    res.json({ availableCoupons: coupons });
}
