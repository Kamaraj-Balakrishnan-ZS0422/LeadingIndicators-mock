require("dotenv").config();
const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");

const router = express.Router();

// Google OAuth routes
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: `${process.env.APP_URL}/login`,
    session: false, // Disable session if using JWT
  }),
  (req, res) => {
    // Generate Access Token and Refresh Token
    const accessToken = jwt.sign(
      { user: req.user },
      process.env.JWT_SECRET,
      { expiresIn: "30m" }
    );
    const refreshToken = jwt.sign(
      { user: req.user },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    // Set Refresh Token Cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false, // Set true in production with HTTPS
      sameSite: "none", // Adjust based on cross-origin needs
      maxAge: 24 * 60 * 60 * 1000, // 1 day
      path: "/", // Make cookie available across the site
    });

    // Redirect with Access Token
    res.redirect(`${process.env.APP_URL}/login?token=${accessToken}`);
  }
);


router.post("/auth/refresh", (req, res) => {

  const refreshToken = req.cookies;
  console.log("Refresh Token Retrieved:", refreshToken);

  if (!refreshToken) return res.sendStatus(401); // Unauthorized

  // Verify Refresh Token
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403); // Forbidden

    // Generate New Access Token
    const accessToken = jwt.sign(
      { user: user.user },
      process.env.JWT_SECRET,
      { expiresIn: "1m" } // Adjust as needed
    );
    res.json({ accessToken });
  });
});

module.exports = router;
