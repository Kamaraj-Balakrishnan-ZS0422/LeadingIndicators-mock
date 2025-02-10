require('dotenv').config();
const passport = require('passport');
const { format } = require('date-fns');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { User } = require('../models');

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: `${process.env.BACKEND_URL}/auth/google/callback`
}, async (accessToken, refreshToken, profile, done) => {
  try {
    // Check if the user already exists
    let user = await User.findOne({ where: { email: profile.emails[0].value } });

    if (!user) {
      // If not, create a new user
      user = await User.create({
        name: profile.displayName,
        email: profile.emails[0].value,
      });
    }
    else{
      const formattedDate = format(new Date(), 'yyyy-MM-dd HH:mm:ss');
      const updatedata = {lastloggedin:formattedDate}
      await user.update(updatedata);
    }

    return done(null, user);
  } catch (error) {
    return done(error, null);
  }
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findByPk(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

module.exports = passport;
