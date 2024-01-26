const mongoose = require("mongoose");

const variationSchema = new mongoose.Schema({
  color: String,
  size: String,
  quantity: Number,
});

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  images: {
    type: Array,
    required: true,
  },
  averageRating: {
    type: String,
    required: true,
  },
  variations: {
    type: [variationSchema],
    required: true,
  },
  categorie: {
    type: String,
    required: true,
  },
  subCategorie: {
    type: String,
  },
  deliveryCost: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

module.exports = mongoose.model('Product', productSchema)