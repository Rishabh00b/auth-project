const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");

dotenv.config();

const app = express();

// Connect DB
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("API Running");
});

// Start server
app.listen(process.env.PORT || 5000, () => {
  console.log("Server running");
});