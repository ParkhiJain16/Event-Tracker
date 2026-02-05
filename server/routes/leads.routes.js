const express = require("express");
const Lead = require("../models/Lead");

const router = express.Router();

router.post("/", async (req, res) => {
  const { email, consent, eventId } = req.body;

  if (!email || !consent || !eventId) {
    return res.status(400).json({ message: "Missing fields" });
  }

  try {
    await Lead.create({ email, consent, eventId });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
