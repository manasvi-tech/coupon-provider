import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import cors from "cors";
import couponRoutes from "../routes/coupon.route.js"

dotenv.config();
const PORT = 3000;
const LOCAL_IP = "192.168.1.16";

const app = express();


import connectToMongo from "../db/connect.js";

// Middleware
app.use(express.json())
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true })); // Allows frontend requests on cookies



app.use("/api/coupon",  couponRoutes);

app.get("/test", (req, res) => {
    res.send("API is working!");
  });


connectToMongo().then(() => {
    app.listen(PORT, LOCAL_IP, () => console.log(`Server running on http://${LOCAL_IP}:${PORT}`));
}).catch(err => {
    console.error("Database connection failed", err);
});