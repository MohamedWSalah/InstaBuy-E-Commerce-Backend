const Joi = require('joi');
const mongoose = require('mongoose');



const categorySchema = mongoose.Schema
    (
        {
            name: { type: String, required: true, minlength: 2, maxlength: 50 },
            image: { type: [String], required: true },
            parentId: {type: [String],default:'root'}
            //parentId: {type: mongoose.Schema.ObjectId,default:'root'}
        }
    );

const Category = mongoose.model('Category',categorySchema);

function categoryValidation(cat)
{
    const schema = {
        name: Joi.string().min(2).max(50).required(),
        image: Joi.array().items(Joi.string()).required(),
        parentId: Joi.array().items(Joi.objectId())
    }
    return Joi.validate(cat,schema);
}

module.exports.Category = Category;
module.exports.categoryValidation = categoryValidation;