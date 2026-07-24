const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("✅ MongoDB Connected Successfully");
})
.catch((err) => {
    console.log("❌ MongoDB Connection Error:", err);
});

// Routes
const authRoutes = require("./routes/auth");
const taskRoutes = require("./routes/task");

app.use("/api", authRoutes);
app.use("/api", taskRoutes);

// Default Route
app.get("/", (req, res) => {
    res.send("Welcome to TaskFlow Backend!");
});

// Start Server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🚀 Server is running at http://localhost:${PORT}`);
});