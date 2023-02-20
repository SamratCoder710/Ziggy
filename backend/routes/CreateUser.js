const express = require("express");
const router = express.Router();
const user = require("../models/User");
const axios = require('axios');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require("express-validator");


router.post(
  "/createuser",
  check("name")
    .notEmpty()
    .withMessage("Name is required")
    .bail()
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage("Invalid name"),
  check("password")
    .notEmpty()
    .withMessage("Password is required")
    .bail()
    .isLength({ min: 8, max: 15 })
    .withMessage("Invalid password minumum:8 maximum:15 characters"),
  check("email")
    .notEmpty()
    .withMessage("Email is required")
    .bail()
    .isEmail()
    .withMessage("Invalid email"),
  check("address")
    .notEmpty()
    .withMessage("Address is required")
    .bail()
    .matches(/^[a-zA-Z0-9\s, ]+$/)
    .withMessage("Invalid address"),

  async (req, res) => {
    const errors = validationResult(req);
    const clientIp = await axios.get('https://api.ipgeolocation.io/getip');
    const {ip} =  clientIp.data;
    const geolocation = await axios.get(`https://api.ipgeolocation.io/ipgeo?apiKey=${process.env.GEOLOCATION_API_KEY}&ip=${ip}`);
    const {city} = geolocation.data;
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() }); 
    }
    
    try {
        bcrypt.genSalt(12,(err,salt)=>{
            bcrypt.hash(req.body.password,salt,async(error,hash)=>{
                if(error){
                    throw error; 
                }
                 await user.create({ ...req.body,password:hash,location:city });
                 res.json({ success: true });

            })
        })
      
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);

module.exports = router;
