const Joi = require('joi');
const mongoose = require('mongoose');
const JWT = require('jsonwebtoken');
const config = require('config');
const { billingSchema } = require('./billingmodel');

const userSchema = mongoose.Schema
    (
        {
            name: { type: String, required: true, minlength: 2, maxlength: 50 },
            email: { type: String, unique: true, required: true, minlength: 5, maxlength: 256 },
            password: { type: String, required: true, minlength: 8, maxlength: 1024 },
            billingInfo: { type: [billingSchema] }
        });


userSchema.methods.generateAuthToken = function () {
    const Token = JWT.sign({ _id: this._id}, config.get('jwtPrivateKey'));
    return Token;
}

const User = mongoose.model('User', userSchema);

function userValidation(user) {
    const schema =
    {
        name: Joi.string().min(2).max(50).required(),
        email: Joi.string().min(5).max(256).required().email(),
        password: Joi.string().min(8).max(1024).required(),
    }

    return Joi.validate(user, schema);
}

function passwordValidation(pw)
{
    const schema = 
    {
        oldPassword: Joi.string().required(),
        newPassword: Joi.string().min(8).max(1024).required()
    }

    return Joi.validate(pw,schema);
}



exports.User = User;
exports.userValidation = userValidation;
exports.passwordValidation = passwordValidation;