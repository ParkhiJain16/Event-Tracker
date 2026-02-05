require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const session = require("express-session");

const startScrapingJob = require("./cron/scrape.job");
const eventRoutes = require("./routes/events.routes");
const leadRoutes = require("./routes/leads.routes");
const authRoutes = require("./routes/auth.routes");
const passport = require("./auth/passport");

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ FIXED CORS CONFIG (IMPORTANT)
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true
  })
);

app.use(express.json());

// Sessions (required for OAuth)
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false
  })
);

app.use(passport.initialize());
app.use(passport.session());

// MongoDB
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
app.use("/api/leads", leadRoutes);
app.use("/auth", authRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
