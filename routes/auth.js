const express = require('express');
const { User } = require('../models/usermodel');
const jwt = require('jsonwebtoken')
const Joi = require('joi');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const router = express.Router();

router.use(express.json());

function validate(req) {
    const schema = {
        email: Joi.string().required().min(5).max(256).email(),
        password: Joi.string().required().min(8).max(1024)
    }

    const result = Joi.validate(req, schema);
    return result;
}

router.post("/", async (req, res) => {
    const { error } = validate(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
    }

    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('Invalid Email or Password!');

    const isValid = await bcrypt.compare(req.body.password, user.password);
    if (!isValid) return res.status(400).send('Invalid Email or Password!');

    const token = user.generateAuthToken();

    res.send(token);
});

module.exports = router;