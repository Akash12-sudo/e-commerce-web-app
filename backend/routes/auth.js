const router = require("express").Router();
const passport = require("passport");
require("dotenv").config();

router.get("/login/success", (req, res) => {
  if (req.user) {
    res.status(201).json({
      error: false,
      message: "Successfully logged In",
      user: req.user,
    });
  } else {
    res.status(403).json({ error: true, message: "Not Authorized" });
  }
});

router.get("/login/failed", (req, res) => {
  res.status(404).json({
    error: true,
    message: "Log In failed",
  });
});

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: process.env.GOOGLE_CLIENT_URL,
    failureRedirect: "/login/failed",
  }),
  (req, res) => {
    try {
      if (req.user) {
        res.status(200).json({
          error: false,
          message: "success",
          body: req.user,
        });
      }
    } catch (err) {
      console.log(err);
      res.status(403).json({
        error: true,
        message: "failure",
      });
    }
  }
);

router.get("/google", passport.authenticate("google", ["profile", "email"]));

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect(process.env.GOOGLE_CLIENT_URL);
});

module.exports = router;