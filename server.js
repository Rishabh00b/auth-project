const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");

dotenv.config();

const app = express();

// ✅ CONNECT DB
connectDB();

// ✅ VERY IMPORTANT CORS FIX
app.use(cors({
  origin: "*",   // <-- TEMP FIX (allow all)
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

// Middleware
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("API Running");
});

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running");
});