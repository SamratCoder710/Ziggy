const mongoose = require("mongoose");

const { Schema } = mongoose;

const OrderSchema = new Schema({
    name: {
      type: String,
      required: true,
    },
    orders: [{
      items: {
        type: Array,
        required: true,
      },
      date: {
        type: Date,
        default: Date.now(),
      },
    }],
  });
  
module.exports = mongoose.model("order", OrderSchema);
