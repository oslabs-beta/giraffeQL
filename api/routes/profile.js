// api/routes/profile.js
const express = require('express');
const jwt = require('jsonwebtoken');
const userService = require('../db/services/user');

let JWT_KEY;

if (process.env.NODE_ENV === 'development') {
  const variables = require('../../settings.js');
  JWT_KEY = variables.JWT_KEY;
} else {
  JWT_KEY = process.env.JWT_KEY;
}

const router = express()

router.use((req, res, next) => {
  const token = req.headers['authorization'];

  jwt.verify(token, JWT_KEY, function (err, data) {
    if (err) {
      res.status(401).send({ error: "NotAuthorized" })
    } else {
      req.user = data;
      return next();
    }
  })
})

router.get('/', async (req, res) => {
  user = await userService.findById(req.user.id);
  res.send(user);
})

module.exports = router;