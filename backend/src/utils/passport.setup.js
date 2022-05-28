// const passport = require("passport");
// const GoogleStrategy = require("passport-google-oauth20").Strategy;
// const ggClient = require("../config/OAuth");

// let userProfile, accessTokenAuth, refreshTokenAuth

// passport.serializeUser(function(user, cb) {
//     cb(null, user);
// });

// passport.deserializeUser(function(obj, cb) {
//     cb(null, obj);
// });

// passport.use(
//     new GoogleStrategy({
//             clientID: ggClient.googleClientId,
//             clientSecret: ggClient.googleClientSecret,
//             callbackURL: "/auth/google/callback",
//             passReqToCallback: true
//         },
//         (request, accessToken, refreshToken, profile, done) => {
//             request.userProfile = profile
//             request.accessTokenAuth = accessToken
//             request.refreshTokenAuth = refreshToken
//             return (done(null, {
//                 userProfile,
//                 accessTokenAuth,
//                 refreshTokenAuth
//             }))
//         }
//     )
// );