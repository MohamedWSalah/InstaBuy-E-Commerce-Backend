const lodash = require('lodash');
const express = require('express');
const router = express.Router();
const { Item, itemValidation } = require('../models/itemmodel');

//get itemdetails API
router.get('/itemdetails', async (req, res) => {

    const item = await Item.findById(req.headers._id)
        .catch(() => res.send('Invalid Object id'));
    if (!item) return res.send('ID not found');

    res.send(item);
});

router.get('/categoryitems', async (req, res) => {
    const result = await Item.findOne({"subCategoryId": req.headers.maincategoryid }).select("_id").lean();
    if(!result) return res.status(404).send('Main Category ID doesnt Exist');

    const mainCategoryItems = await Item.find({"subCategoryId": req.headers.maincategoryid });
    if (!mainCategoryItems) return res.status(404).send('Main Category wasn\'t found');

    
    const subCategoryItems = mainCategoryItems.filter(function (object) {
        if(object.subCategoryId.includes(req.headers.subcategoryid)) return true
        else return false 
    });
    
    if (subCategoryItems.length == 0) return res.status(404).send('Empty.\nNo items Available');
    // const subCategoryItems = await mainCategoryItems.find({ "subCategoryId": req.headers.subCategoryId });
    
    
    res.send(subCategoryItems.map(function (object) {
        return lodash.pick(object,['name','price','discount'])
    }));

});


router.post('/add', async (req, res) => {
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