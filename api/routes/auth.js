const express = require('express');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;
const users = require('../db/services/user');

const router = express();

let GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, GITHUB_CALLBACK_URL, JWT_KEY;

if (process.env.NODE_ENV === 'development') {
  const variables = require('../../settings.js');
  GITHUB_CLIENT_ID = variables.GITHUB_CLIENT_ID;
  GITHUB_CLIENT_SECRET = variables.GITHUB_CLIENT_SECRET;
  GITHUB_CALLBACK_URL = variables.GITHUB_CALLBACK_URL;
  JWT_KEY = variables.JWT_KEY;
} else {
  GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
  GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
  GITHUB_CALLBACK_URL = process.env.GITHUB_CALLBACK_URL;
  JWT_KEY = process.env.JWT_KEY;
}

passport.use(new GitHubStrategy({
  clientID: GITHUB_CLIENT_ID,
  clientSecret: GITHUB_CLIENT_SECRET,
  callbackURL: GITHUB_CALLBACK_URL
  },

  function (accessToken, refreshToken, profile, cb) {
    users.findOrCreate(profile);
    return cb(null, profile);
  }
));

passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});

router.use(passport.initialize());
router.use(passport.session());

router.get('/github', 
  passport.authenticate('github')
);

router.get(
  '/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  (req, res, next) => {
    const token = jwt.sign({ id: req.user.id }, JWT_KEY, { expiresIn: 60 * 60 * 24 * 1000 })
    req.logIn(req.user, function (err) {
      if (err) return next(err);
      const URL = process.env.NODE_ENV === 'development' ? 'http://localhost:3000/diagrams' : 'https://giraffeql.io/diagrams';
      res.redirect(`${URL}?token=${token}`)
    });
  },
);

module.exports = router;