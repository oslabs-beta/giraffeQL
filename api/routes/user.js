const express = require('express');
const jwt = require('jsonwebtoken');
const userService = require('../db/services/user');
const diagramController = require('../db/services/diagrams');

let JWT_KEY;

if (process.env.NODE_ENV === 'development') {
    const variables = require('../../settings.js');
    JWT_KEY = variables.JWT_KEY;
} else {
    JWT_KEY = process.env.JWT_KEY;
}

const router = express()

router.use((req, res, next) => {
    const token = req.headers['authorization']

    jwt.verify(token, JWT_KEY, function (err, data) {
        if (err) {
            res.status(401).send({ error: "NotAuthorized" })
        } else {
            req.user = data;
            next();
        }
    })
})

router.get('/', async (req, res, next) => {
        res.locals.user = await userService.findById(req.user.id)
        return next();
    },
    diagramController.getAllDiagrams,
    (req, res, next) => {
        // spread in our values from res.locals.user 
        // _doc avoids spreading in system key value pairs
        const data = {
            ...res.locals.user._doc,
            diagrams: res.locals.diagrams
        }
        res.status(200).json(data)
    });

module.exports = router;