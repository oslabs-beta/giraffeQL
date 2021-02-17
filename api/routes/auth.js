const express = require('express');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const { Strategy } = require('passport-github');

const users = require('../db/services/user');
const JWT_KEY = "something_private_and_long_enough_to_secure"

const router = express();

const { GITHUB_CLIENT_ID } = require('../../settings.js');
const { GITHUB_CLIENT_SECRET } = require('../../settings.js');
const { GITHUB_CALLBACK_URL } = require('../../settings.js');

passport.use(new Strategy({
  clientID: GITHUB_CLIENT_ID,
  clientSecret: GITHUB_CLIENT_SECRET,
  callbackURL: GITHUB_CALLBACK_URL
  },

  function (accessToken, refreshToken, profile, cb) {
    users.findOrCreate(profile);
    return cb(null, profile);
  }
));

router.get('/github', (req, res, next) => {
  const { redirectTo } = req.query;
  const state = JSON.stringify({ redirectTo });
  const authenticator = passport.authenticate('github', { scope: [], state, session: true });
  authenticator(req, res, next);
}, (req, res, next) =>{
  return next();
});

router.get(
  '/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }), 
  (req, res, next) => {
    const token = jwt.sign({id: req.user.id}, JWT_KEY, {expiresIn: 60 * 60 * 24 * 1000})
    req.logIn(req.user, function(err) {
      console.log('req.user: ', req.user);
      if (err) return next(err); ;
      res.redirect(`http://localhost:3000?token=${token}`)
    });
        
  },
);

module.exports = router;