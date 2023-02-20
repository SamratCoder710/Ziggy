const express = require('express');
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const user = require("../models/User");

router.post("/genuineuser", async (req, res) => {
    if (!(req.body.email && req.body.password)) {
      return res.status(401).json({ errors: "Enter valid credentials" });
    }
    const founduser = await user.findOne({ email: req.body.email });
    if (founduser) {
      const autheticated = await bcrypt.compare(
        req.body.password,
        founduser.password
      );
      let token;
      if (autheticated) {
        const payload = {
          email: req.body.email,
          id: founduser.id,
        };
        const options = { expiresIn: "1h" };
        token = jwt.sign(payload, process.env.JWT_SECRET_KEY, options);
        res.status(200).json({ autheticated, "AuthToken": `${token}`,'user':founduser.name });
      } else {
        res.status(401).json({ errors: "Enter valid Password" });
      }
    } else {
      res.status(401).json({ errors: "User not found" });
    }
  });

module.exports = router;