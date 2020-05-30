const express = require('express');
const { User, userValidation, passwordValidation } = require('../models/usermodel');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const router = express.Router();
const auth = require('../middleware/auth');

router.use(express.json());

router.get("/me", auth, async (req, res) => {
    /*"""
        Router Endpoint to get all information of user.
        Input: 
            Get Logged User ID.
        Output: 
             Current User Info.
        Validation:
            Auth Middleware (JWT Token)

    """*/

    const user = await User.findById(req.user._id).select('-password');
    res.send(user);
});

router.post("/register", async (req, res) => {
    /*"""
        Router Endpoint to Register new User.
        Input: 
            User Object

    """*/

    const { error } = userValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send('Account with same E-Mail Already Exists!');

    user = new User(_.pick(req.body, ['name', 'email', 'password']));

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await user.save();

    const token = user.generateAuthToken();
    res.header('x-auth-token', token).send(
        _.pick(user, ['name', 'email']));
});

router.put("/editinfo", auth, async (req, res) => {
    /*"""
        Router Endpoint to edit any of the user's information.
        Input: 
            User Object (logged in)

    """*/
    // require user
    let user = await User.findById(req.user);
    req.body.password = user.password;

    const { error } = userValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const eUser = await User.findByIdAndUpdate(req.user._id,
        {
            name: req.body.name,
            email: req.body.email
        },
        { new: true });


    res.send(eUser);
});

router.put("/editpassword", auth, async (req, res) => {
    /*"""
        Router Endpoint to edit the user's password specifically.
        Input: 
            User Object (logged in)

    """*/
    // require user
    let user = await User.findById(req.user);

    const { error } = passwordValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const validPassword = await bcrypt.compare(req.body.oldPassword, user.password);
    if (!validPassword) return res.status(400).send('Invalid Password.');

    console.log(validPassword);

    const salt = await bcrypt.genSalt(10);
    const NewPassword = await bcrypt.hash(req.body.newPassword, salt);

    const U = await User.findByIdAndUpdate(req.user._id,
        {
            password: NewPassword
        },
        { new: true });




    await U.save();
    res.send(U);
});

module.exports = router;