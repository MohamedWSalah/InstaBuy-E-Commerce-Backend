const Joi = require('joi');
const mongoose = require('mongoose');
const lodash = require('lodash');
const express = require('express');
const router = express.Router();
const { Item, itemValidation } = require('../models/itemmodel');

//get itemdetails API
router.get('/itemdetails', async (req, res) => {
        const item = await Item.findById(req.headers._id)
        .catch(()=> res.send('Invalid Object id'));
        if(!item) return res.send('ID not found');
        
        res.send(item);
});

router.post('/additem', async (req, res) => {
    const { error } = itemValidation(req.body);
    if (error) return res.send(error.details[0].message);
 
    /*
    check if the subcategoryId exists
    const subCatId = await Category.findById(req.body.subCategoryId);
    if (!subCatId) = return res.status(400).send('Sub Category wasn't found');
    */

    const newItem = new Item
        (
            lodash.pick(req.body,
                ['name', 'price', 'description', 'quantity',
                    'subCategoryId', 'availableColors', 'discount'])
        );

    await newItem.save();

    res.send(newItem);
});

module.exports = router;