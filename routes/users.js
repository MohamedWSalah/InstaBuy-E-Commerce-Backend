const express = require('express');
const { User, userValidation } = require('../models/usermodel');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const router = express.Router();

router.use(express.json());
router.get("/me", async (req, res) => {
    const user = await User.findById(req.user._id).select('-password');
    res.send(user);
});

router.post("/", async (req, res) => {
    const { error } = userValidation(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
    }

    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send('Account with same E-Mail Already Exists!');

    user = new User(_.pick(req.body, ['name', 'email', 'password']));

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await user.save();

    const token = user.generateAuthToken();
    res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email']));
});

router.post("/editInfo", async (req, res) => {
    /*"""
        Router Endpoint to edit any of the user's information.
        Input: 
            User Object (logged in)

    """*/
    // require user
    const { error } = userValidation(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
    }

    let user = User.findById(req.body._id);
    user = new User(_.pick(req.body, ['name', 'email', 'billingInfo']));
    await user.save();
});

router.post("/editPassword", async (req, res) => {
    /*"""
        Router Endpoint to edit the user's password specifically.
        Input: 
            User Object (logged in)

    """*/
    // require user
    const { error } = userValidation(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
    }

    let user = User.findById(req.body._id);
    user = new User(_.pick(req.body, ['password']));

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);


    await user.save();
});

module.exports = router;