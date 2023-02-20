const express = require('express');
const router = express.Router();

router.get('/displayData', (req,res)=>{
    res.send({'food_items':global.food_items ,
    'food_category':global.foodCategory});
})

module.exports = router;