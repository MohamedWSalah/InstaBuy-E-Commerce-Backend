const Joi = require('joi');
const mongoose = require('mongoose');



const categorySchema = mongoose.Schema
    (
        {
            name: { type: String, required: true, minlength: 2, maxlength: 50 },
            image: { type: [String], required: true},
            parentId: {type: mongoose.Schema.Types.ObjectId,default:'root'}
        }
    );

const Category = mongoose.model('Category',categorySchema);

function categoryValidation(cat)
{
    const schema = {
        name: Joi.string().min(2).max(50).required(),
        image: Joi.string().required(),
        parentId: Joi.ObjectId().default('root')
    }
    return Joi.validate(cat,schema);
}

module.exports = Category;
module.exports = categoryValidation;