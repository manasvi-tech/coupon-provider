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
const LOCAL_IP = process.env.LOCAL_IP || "127.0.0.1"; // Use localhost for dev, 0.0.0.0 for cloud
// Middleware
app.use(express.json())
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.use(cors({ 
    origin: function (origin, callback) {
      const allowedOrigins = [
        "http://localhost:5173",  
        "https://coupon-provider-8m3w.onrender.com",  // ✅ Explicit Render domain
        process.env.FRONTEND_URL  
      ];
  
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.error(`❌ CORS BLOCKED: ${origin}`);
        callback(new Error("CORS Not Allowed"));
      }
    },
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
    app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
}).catch(err => {
    console.error("❌ Database connection failed", err);
    process.exit(1);  // Exit only in dev, handle better in production
});
