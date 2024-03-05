const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true
    },
    brand: {
      type: String,
      required: true
    },
    size: {
      type: String,
      required: true
    },
    mrp: {
      type: String,
      default: false
    },
    price: {
      type: String,
      default: false
    },
    discount: {
      type: String,
      default: false
    },
    rating: {
      type: String,
      default: false
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: createdAt => dateFormat(createdAt, 'mm/dd/yyyy HH:MM:ss')
    },
  }
)

module.exports=mongoose.model("Product",productSchema);