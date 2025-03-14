const API_BASE = "http://localhost:3000";


export const getAvailableCoupons = async () => {
  try {
    const response = await fetch(`${API_BASE}/api/coupon/all`);
    return response.json();
  } catch (error) {
    console.error("Error fetching coupons:", error);
    return { availableCoupons: [] };
  }
};

export const claimCoupon = async () => {
    try {
      const response = await fetch(`${API_BASE}/api/coupon/new`, { 
        method: "GET",  // Change to POST
        credentials: "include",
        headers: { "Content-Type": "application/json" }
      });
      return response.json();
    } catch (error) {
      console.error("Error claiming coupon:", error);
      return { message: "Server error, try again later." };
    }
  };
  