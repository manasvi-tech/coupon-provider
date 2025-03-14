    import Coupon from "../models/coupon.model.js";
    import Claim from "../models/claim.model.js";

    const getNextCoupon = async () => {
        return await Coupon.findOne({ isClaimed: false }).sort({ _id: 1 });
    };

    export const newCoupon = async (req, res) => {
        const userIP = req.ip;
        const userCookie = req.cookies.coupon_claimed;
        
        const cooldownTime = 120000; // 2 minutes in milliseconds
        const existingClaim = await Claim.findOne({ ip: userIP, timestamp: { $gt: Date.now() - cooldownTime } });
    
        if (existingClaim) {
            const timeLeft = Math.ceil((existingClaim.timestamp + cooldownTime - Date.now()) / 1000); // Convert to seconds
            return res.status(429).json({ 
                message: `You have already claimed a coupon.`,
                timeLeft // Send remaining cooldown time in seconds
            });
        }
    
        if (userCookie) {
            return res.status(429).json({ message: "You have already claimed a coupon in this session." });
        }
    
        const coupon = await getNextCoupon();
        if (!coupon) return res.status(404).json({ message: "No coupons available" });
    
        coupon.isClaimed = true;
        coupon.claimedBy = userIP;
        coupon.timestamp = new Date();
        await coupon.save();
    
        await Claim.create({ ip: userIP, timestamp: Date.now() });
        res.cookie("coupon_claimed", "true", { httpOnly: true, maxAge: cooldownTime });
    
        return res.json({ coupon: coupon.code });
    };
      
      

    export const allCoupon = async (req, res) => {
        const coupons = await Coupon.find({ isClaimed: false }).select("code");
        res.json({ availableCoupons: coupons });
    }
