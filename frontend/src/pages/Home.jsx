import React, { useState } from "react";
import CouponClaim from "../components/CouponClaim";
import AvailableCoupons from "../components/AvailableCoupons";

const Home = () => {
  const [showCoupons, setShowCoupons] = useState(false);

  return (
    <div>
      <h1>Round-Robin Coupon Distribution</h1>
      <button onClick={() => setShowCoupons(!showCoupons)}>
        {showCoupons ? "Hide Available Coupons" : "Show Available Coupons"}
      </button>
      {showCoupons && <AvailableCoupons />}
      <CouponClaim />
    </div>
  );
};

export default Home;
