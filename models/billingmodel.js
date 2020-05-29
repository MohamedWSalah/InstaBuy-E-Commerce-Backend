const mongoose = require('mongoose');


const billingSchema = mongoose.Schema(
    {
        phone: { type: String, required: true },
        country: { type: String, required: true },
        city: { type: String, required: true },
        streetAddress: { type: String, required: true },
        block: { type: String, required: true }
    });


exports.billingSchema = billingSchema;