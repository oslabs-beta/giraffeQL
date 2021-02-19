const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
require('./db/mongoose');

const app = express();

// Parse json encoded in the request body
app.use(bodyParser.json({ limit: '50mb' }));

// allow cors from all - no hustle and never safe
app.use((_, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    return next();
})

app.use(passport.initialize());

passport.serializeUser(function (user, cb) {
  cb(null, user);
});

app.use('/auth', require('./routes/auth'));
app.use('/user', require('./routes/user'));
app.use('/profile', require('./routes/profile'));

// start server
app.listen(3001, () => console.log("Server listening on http://localhost:3001"))