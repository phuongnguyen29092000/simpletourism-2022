const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const ggClient = require("../config/OAuth");

const loginWithGoogle = passport.use(
  new GoogleStrategy(
    {
      clientID: ggClient.googleClientID,
      clientSecret: ggClient.googleClientSecret,
    },
    (accessToken) => {
      console.log(accessToken);
    }
  )
);

module.exports = {
  loginWithGoogle,
};
