const express = require("express");
const router = express.Router();
const user = require("../models/User");


router.get("/getusers", async (req, res) => {
  const users = await user.find();
  res.status(200).send(users);
});



module.exports = router;
