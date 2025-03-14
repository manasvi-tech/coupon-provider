import express from "express"
const router = express.Router();
import {newCoupon, allCoupon} from "../controllers/coupon.controller.js"   

router.get("/new", newCoupon);

router.get("/all", allCoupon);

export default router;