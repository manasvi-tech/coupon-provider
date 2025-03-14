import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import cors from "cors";
import couponRoutes from "./routes/coupon.route.js"
import path from "path"

dotenv.config();
const PORT =  process.env.PORT || 3000;

const app = express();
const __dirname = path.resolve();


import connectToMongo from "./db/connect.js";
const LOCAL_IP = "192.168.1.16"
// Middleware
app.use(express.json())
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(cors({ 
    origin: [
      "http://localhost:5173",  // ✅ Allow local development
      "http://192.168.1.16:3000" // ✅ Allow your local IP
    ], 
    credentials: true 
  }));
  

// ✅ Fix: API routes should be defined BEFORE serving frontend files
app.use("/api/coupon", couponRoutes);  // ✅ API route comes first

// ✅ Serve React frontend *after* API routes
app.use(express.static(path.join(__dirname, "/frontend/dist"))); 
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});


app.get("/test", (req, res) => {
    res.send("API is working!");
  });


connectToMongo().then(() => {
    app.listen(PORT, () => console.log(`Server running on http://${LOCAL_IP}:${PORT}`));
}).catch(err => {
    console.error("Database connection failed", err);
});