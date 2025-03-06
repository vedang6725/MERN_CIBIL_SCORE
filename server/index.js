import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authroutes.js";
import equifaxRoutes from "./routes/equifaxRoutes.js"; // Import Equifax route

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
mongoose
  .connect(process.env.MONGO_URI || "mongodb://localhost:27017/Bankdata")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

// Routes
app.use("/user", authRoutes);
app.use("/api/equifax", equifaxRoutes); // New API route

// Start Server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
