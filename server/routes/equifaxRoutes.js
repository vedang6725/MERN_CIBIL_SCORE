import express from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

router.post("/credit-score", async (req, res) => {
  try {
    const { name, mobile, pan, dob } = req.body;

    const response = await axios.post(
      "https://api.equifax.com/personal/consumer-data-suite/v1/creditReport",
      { name, mobile, pan, dob },
      {
        headers: {
          Authorization: `Bearer ${process.env.EQUIFAX_API_KEY}`, // Store API key in .env
          "Content-Type": "application/json",
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error("Equifax API Error:", error.response ? error.response.data : error.message);
    res.status(error.response?.status || 500).json({
      message: error.response?.data?.message || "Failed to fetch credit score",
    });
  }
});

export default router;
