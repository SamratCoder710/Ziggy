const express = require("express");
const Order = require("../models/Order");
const router = express.Router();

router.post("/myorders",async(req,res)=>{
  const foundOrder = await Order.findOne({ name: req.body.name });
  if(foundOrder){
  res.send({foundOrder});
  }else{
    res.send({success:false}); 
  }
})

router.post("/createorder", async (req, res) => {
  if (req.body.name) {
    const foundOrder = await Order.findOne({ name: req.body.name });
    if (foundOrder) {
      foundOrder.orders.push({
        items: req.body.orders[0].items,
        date: req.body.orders[0].date,
      });
      await foundOrder.save();
    } else {
      await Order.create({ ...req.body });
    }
    res.json({ success: true });
  }
});

module.exports = router;
