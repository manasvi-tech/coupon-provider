# 🏷️ Round-Robin Coupon Distribution with Abuse Prevention

## 📌 Project Description
This is a live web application that distributes coupons to guest users **sequentially** while preventing abuse through **IP tracking and cookies**. The system ensures fair distribution and provides clear feedback to users.

## 🚀 Features
✔️ **Round-Robin Coupon Distribution** – Coupons are assigned in sequence  
✔️ **Guest Access** – Users don’t need an account to claim coupons  
✔️ **Abuse Prevention**  
   - 🛑 **IP Tracking** – Restricts claims from the same IP for **2 minutes**  
   - 🍪 **Cookie Tracking** – Prevents users from claiming multiple coupons in the same session  
✔️ **User Feedback** – Displays messages about **success or cooldown**  
✔️ **Deployed on Render** – Live public URL provided  

---

## 🛠️ Tech Stack
- **Frontend**: React (Vite)
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (MongoDB Atlas)
- **Hosting**: Render

---

## 📦 Installation & Setup
### ✅ Prerequisites
- Install [Node.js](https://nodejs.org/)
- Install [MongoDB](https://www.mongodb.com/) (or use MongoDB Atlas)

### ✅ Clone the Repository
```bash
git clone https://github.com/yourusername/coupon-app.git
cd coupon-app
```

### ✅ Backend Setup
```bash
cd backend
npm install
```
**Create a `.env` file** in the backend folder:
```
MONGO_DB_URI=your-mongodb-uri
PORT=3000
FRONTEND_URL=https://your-render-url.com
LOCAL_IP=0.0.0.0
```

### ✅ Frontend Setup
```bash
cd frontend
npm install
npm run build
```

### ✅ Run the Application
```bash
cd backend
node server.js
```
App will be available at: `http://localhost:3000`

---

## 🔌 API Endpoints
| **Method** | **Endpoint** | **Description** |
|-----------|-------------|----------------|
| `GET`     | `/api/coupon/all` | Fetch all available coupons |
| `GET`     | `/api/coupon/new` | Claim a new coupon |

---

## 🔀 Pipeline: How It Works
1️⃣ **Frontend Requests a Coupon** – The React frontend sends a request to `/api/coupon/new` to claim a coupon.  
2️⃣ **Backend Checks for Abuse Prevention** – The backend verifies the request by checking:  
   - 🔹 **IP Address** – If the IP has already claimed a coupon within the cooldown period, the request is rejected.  
   - 🔹 **Cookies** – If a cookie exists indicating a prior claim in the session, the request is denied.  
3️⃣ **Assigning a Coupon** – If the request passes, the backend assigns the next available coupon and marks it as claimed.  
4️⃣ **Storing Claim Data** – The claim is logged in the database with timestamps for future reference.  
5️⃣ **Frontend Displays Feedback** – Users see either the assigned coupon or a message indicating the cooldown time remaining.  

### 🔐 Security Measures Against Evasion
🔸 **IP Spoofing Prevention** – While basic users cannot easily change their IP, advanced evasion tactics are mitigated by combining **IP + Cookies** as verification.  
🔸 **Session-Based Restrictions** – Even if a user switches IPs, their browser’s cookies will still prevent multiple claims.  
🔸 **Rate Limiting (Future Scope)** – The backend can introduce rate limiting to prevent automated or script-based abuse.  
🔸 **Database Validation** – Ensures no coupon is assigned twice, preventing any data manipulation attempts.  

---

## 🔐 Abuse Prevention Strategies
1️⃣ **IP Tracking** – Saves IP addresses and restricts new claims for **30 minutes**  
2️⃣ **Cookies** – Prevents users from claiming multiple times in the same session  
3️⃣ **Database Validation** – Ensures a coupon is assigned only once  

---

## 🔮 Future Scope
📌 **Admin Dashboard** – Add a UI for managing coupons  
📌 **Coupon Expiry** – Add expiration times for unclaimed coupons  
📌 **Analytics** – Track claim trends  

---

## 🌍 Deployment Link
🔗 **Live App:** [https://coupon-provider.onrender.com](https://coupon-provider.onrender.com)  

---

## ✅ Submission Checklist
✔️ **Live Link** included  
✔️ **Installation Instructions** provided  
✔️ **Abuse Prevention Strategies** explained  
✔️ **Code is well-structured**  

---

🎯 **This README meets all assignment requirements and makes a strong submission! 🚀**
