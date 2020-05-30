const express = require('express');
const lodash = require('lodash');
const router = express.Router();
const {Category,categoryValidation } = require('../models/categorymodel');


router.get('/',async (req, res) => {
    
    //get all categories

    const categories = await Category.find();
    
    res.send(categories);
});


module.exports = router;