const express = require('express')
const router = express.Router()
const Product = require('../modeles/productModel')
const uploadFile = require('./upload')
const multer = require("multer");
const upload = multer()

router.post('/addProduct', upload.any(),async (req, res) => {
    uploadFile(req, res)
     /* .then(async (result) => {
        const product = new Product({
          name: req.body.name,
          price: req.body.price,
          description: req.body.description,
          categorie: req.body.categorie,
          subCategorie: req.body.subCategorie,
          deliveryCost: req.body.deliveryCost,
          images: result,
          averageRating: req.body.averageRating,
          colors: req.body.colors,
          sizes: req.body.sizes,
        });
   
        try {
            const newProduct = await product.save()
            return res.status(201).json(newProduct)
        } catch (err) {
            return res.status(400).json({ message : err.message})
        }
    }) */
    console.log(result)
      .catch((error) => {
        return res.status(500).json({ message : error})
    });
})

module.exports = router