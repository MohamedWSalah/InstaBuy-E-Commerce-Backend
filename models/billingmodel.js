const Joi = require('joi');
const mongoose = require('mongoose');
const JWT = require('jsonwebtoken');
const config = require('config');

const billingSchema = mongoose.Schema(
    {
        phone: {type:String, required:true},
        country: {type:String, required:true},
        city: {type:String, required:true},
        streetAddress : {type:String, required:true},
        block: {type:String, required:true}
    });


exports.billingSchema = billingSchema;