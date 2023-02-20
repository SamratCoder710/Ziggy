const mongoose = require("mongoose");
require('dotenv').config();
mongoose.set("strictQuery", false);
const MONGO_PASS = process.env.MONGO_PASS;
const mongoURI =
  "mongodb+srv://gofood:"+MONGO_PASS+"@cluster0.ncja165.mongodb.net/gofoodmern?retryWrites=true&w=majority";
const connect = mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    const fetchedData = mongoose.connection.db.collection("food_items");
    fetchedData
      .find({})
      .toArray()
      .then(data => {
        const foodCategory = mongoose.connection.db.collection("food_Category");
        foodCategory.find({}).toArray().then(foodCategory => {
          global.food_items = data;
          global.foodCategory = foodCategory;
        }).catch(err=>
          console.log(err))
        
      })
      .catch((err) => console.log(err));
  })
  .catch((error) => console.error(error));

// use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled

module.exports = connect;
