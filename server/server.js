const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const startScrapingJob = require("./cron/scrape.job");
const eventRoutes = require("./routes/events.routes");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

// ✅ ALLOWED ORIGINS
const allowedOrigins = [
  "http://localhost:5173",
  "https://eventtracker2026.netlify.app"
];

// ✅ PROPER CORS CONFIG
app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (Postman, server-to-server)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true
  })
);

app.use(express.json());

// DB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
    startScrapingJob();
  })
  .catch(err => console.error(err));

// Routes
app.get("/", (req, res) => {
  res.send("Event Platform API running");
});

app.use("/api/events", eventRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
