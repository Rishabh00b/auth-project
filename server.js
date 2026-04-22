const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");

dotenv.config();

const app = express();

// ✅ Connect DB
connectDB();

// ✅ CORS FIX (VERY IMPORTANT)
app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://auth-project-sable.vercel.app"
  ],
  credentials: true
}));

// ✅ Middleware
app.use(express.json());

// ✅ Routes
app.use("/api/auth", authRoutes);

// ✅ Test route
app.get("/", (req, res) => {
  res.send("API Running");
});

// ✅ Global error handler (optional but good)
app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(500).send("Server Error");
});

// ✅ Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});