import React, { useState, useEffect } from "react";
import { claimCoupon } from "../api/api";

const CouponClaim = () => {
  const [message, setMessage] = useState(null);
  const [coupon, setCoupon] = useState(null);
  const [countdown, setCountdown] = useState(null);
  const [congratsMessage, setCongratsMessage] = useState(null);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [countdown]);

  const handleClaim = async () => {
    setMessage("Processing...");
    setCoupon(null);

    try {
      const data = await claimCoupon();
      if (data.coupon) {
        setCoupon(data.coupon);
        setMessage(null);
        setCongratsMessage(`🎉 Congratulations! You claimed Coupon: ${data.coupon}`);
        setTimeout(() => setCongratsMessage(null), 5000); // Remove after 5 sec
      } else if (data.message.includes("Try again in")) {
        const minutes = parseFloat(data.message.match(/([\d.]+) minutes/)[1]);
        setCountdown(minutes * 60);
        setMessage(null);
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage("Server error, try again later.");
    }
  };

  return (
    <div>
      <button onClick={handleClaim}>Claim Coupon</button>
      {congratsMessage && <p style={{ color: "green" }}>{congratsMessage}</p>}
      {message && <p>{message}</p>}
      {countdown !== null && countdown > 0 && (
        <p>⏳ Please wait {Math.floor(countdown / 60)}m {countdown % 60}s before claiming again.</p>
      )}
    </div>
  );
};

export default CouponClaim;
