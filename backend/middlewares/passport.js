// middleware/passport.js
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const dotenv = require("dotenv");
dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
      scope: ["profile", "email"],
    },
    (accessToken, refreshToken, profile, callback) => {
      // Handle user authentication and database operations here
      callback(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  // Serialize user (store user ID in the session)
  done(null, user);
});

passport.deserializeUser((user, done) => {
  // Deserialize user (retrieve user from the session)
  // You can use the user ID to fetch user data from your database
  done(null, user);
});

module.exports = passport;
