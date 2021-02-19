// api/routes/profile.js
const express = require('express');
const jwt = require('jsonwebtoken');
const userService = require('../db/services/user')

const router = express()

router.use((req, res, next) => {
  const token = req.headers['authorization'];

  jwt.verify(token, jwtKey, function (err, data) {
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