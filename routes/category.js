const express = require('express');
const lodash = require('lodash');
const router = express.Router();
const {Category,categoryValidation } = require('../models/categorymodel');


router.get('/getall',async (req, res) => {
    
    //get all categories

    const categories = await Category.find();
    
    res.send(categories);
});

router.get('/getcategory',async(req,res)=>
{   
    const categories = await Category.find({"parentId": req.headers.parentid});
    
    
    res.send(categories);
});

router.post('/add',async(req,res)=>
{
    const { error } = categoryValidation(req.body);
    if (error) return res.send(error.details[0].message);

    const newcategory = new Category( lodash.pick(req.body,['name','image','parentId']));

    await newcategory.save();

    res.send(newcategory);
});


module.exports = router;