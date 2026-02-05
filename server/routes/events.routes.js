const express = require("express");
const Event = require("../models/Event");

const router = express.Router();

/**
 * PUBLIC EVENTS
 * GET /api/events
 * Shows only non-inactive events
 */
router.get("/", async (req, res) => {
  try {
    const events = await Event.find({
      status: { $ne: "inactive" }
    }).sort({ createdAt: -1 });

    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * ADMIN EVENTS
 * GET /api/events/admin
 * Shows ALL events (including inactive)
 */
router.get("/admin", async (req, res) => {
  try {
    const events = await Event.find().sort({ createdAt: -1 });
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * IMPORT EVENT (Admin action)
 * PATCH /api/events/:id/import
 */
router.patch("/:id/import", async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(
      req.params.id,
      {
        status: "imported",
        importedAt: new Date(),
        importedBy: req.user ? req.user._id : null
      },
      { new: true }
    );

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.json({ success: true, event });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
