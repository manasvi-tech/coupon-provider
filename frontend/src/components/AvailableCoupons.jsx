import React, { useState, useEffect } from "react";
import { getAvailableCoupons } from "../api/api";

const AvailableCoupons = () => {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCoupons = async () => {
    setLoading(true);
    const data = await getAvailableCoupons();
    setCoupons(data.availableCoupons || []);
    setLoading(false);
  };

  // ✅ Fetch coupons when the component mounts
  useEffect(() => {
    fetchCoupons();
  }, []);

  return (
    <div>
      <h3>Available Coupons:</h3>
      <button onClick={fetchCoupons}>Refresh Coupons</button>
      {loading ? (
        <p>Loading...</p>
      ) : coupons.length > 0 ? (
        <ul>
          {coupons.map((c, index) => <li key={index}>{c.code}</li>)}
        </ul>
      ) : (
        <p>No coupons available.</p>
      )}
    </div>
  );
};

export default AvailableCoupons;
