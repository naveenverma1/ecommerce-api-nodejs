const express = require('express')
const jwt =require("jsonwebtoken")
const router = express.Router();
const productm = require('../models/product')
//const verify = require('./verifytoke')

const dontenv = require('dotenv');
dontenv.config();

var thiscontroller= {}

thiscontroller.saveproduct =   function(req,res,next){
   
    const product = new productm({
        
            name : req.body.name,
      
      price : req.body.price,
         
           productImage:req.file.path
          
           
    });
    productm.init()
    product.save( err => {
        if (err) 
        {
            res.json({"error": err});
        }
        else 
        {
            res.json({
                        message: 'Product Created Successfully!',
                        product: {
                            _id: product._id,
                            name: product.name,
                            price: product.price,
                            productImage: product.productImage
                        }
        })
    }

});
 
};
thiscontroller.getproducts =   function(req,res,next){
    productm.paginate({}, { offset: 7, limit: 2}).then(function(result) {
        productm
.find()
.exec()
.then(products => {
    const response = {
        count: products.length,
        products: products.map(product => {
            return {
                name: product.name,
                price: product.price,
                productImage: product.productImage
            }
        })
    };
    res.status(200).json(response);
})
.catch(error => {
    next(error);
})



      });
    }

module.exports = thiscontroller;