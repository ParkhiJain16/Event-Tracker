const express = require("express");
const passport = require("passport");

const router = express.Router();

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    successRedirect: "http://localhost:5173/dashboard"
  })
);

router.get("/me", (req, res) => {
  res.json(req.user || null);
});

router.get("/logout", (req, res) => {
  req.logout(() => {
    res.json({ success: true });
  });
});

module.exports = router;
