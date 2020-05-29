const Joi = require('joi');
const mongoose = require('mongoose');

const itemSchema = mongoose.Schema
    (
        {
            name: { type: String, required: true, minlength: 2, maxlength: 50 },
            price: { type: Number, required: true },
            description: { type: String },
            quantity: { type: Number, required: true },
            subCategoryId: { type: [String], required: true },
            availableColors: { type: [String] },
            discount: { type: Number }
        });

const Item = mongoose.model('Item', itemSchema);


function itemValidation(item) {
    const schema =
    {
        name: Joi.string().min(2).max(50).required(),
        price: Joi.number().required(),
        description: Joi.string(),
        quantity: Joi.number().required(),
        subCategoryId: Joi.array().items(Joi.objectId).required(),
        availableColors: Joi.array().items(Joi.objectId).required(),
        discount: Joi.number()
    }
    return Joi.validate(item, schema);
}

exports.itemValidation = itemValidation;
exports.Item = Item;