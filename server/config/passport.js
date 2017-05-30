var OAuth2Strategy = require('passport-oauth2'),
  passport = require('passport'),
  session = require('express-session');

var Profile = require('../models/Profile.js');

passport.serializeUser(function (pf, cb) {
  cb(null, pf.ProfileID);
});

passport.deserializeUser(function (id, cb) {
  Profile.findOne({ProfileID:id}, (err, pf) => {
    cb(err, pf);
  });
});

passport.use(new OAuth2Strategy({
  authorizationURL: 'https://accounts.yokena.cn/authorize',
    tokenURL: 'https://accounts.yokena.cn/token',
  clientID: 'androidClient',
  clientSecret: 'testpass',
  callbackURL: 'http://127.0.0.1:3000/request/callback',
},
  function (accessToken, refreshToken, params, profile, cb) {
    // TODO:assign token and user data here
    console.log(refreshToken);
    console.log("!PARAMS")
    console.log(params);
    Profile.findOne({ProfileID:params.profile_id}, function (err, pf) {
      if (err) { return cb(err); }
      if (pf) {
        return cb(null, pf);
      }
      const u = new Profile();
      u.ProfileID = params.profile_id;
      u.AccessToken = accessToken;
      u.RefreshToken = refreshToken;
      u.ExpiresIn = params.expires_in
      u.DisplayName = params.display_name;
      u.RoleName = params.role_name;
      u.TokenType = params.token_type;
      u.save((err) => {
        cb(err, u);
      });
    });
  }
));

/*
 * Login Required middleware.
 */
exports.isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  console.log(req.session._id)
  res.status(401).json("Unauthohukhjihrized");
};
