const express = require('express')
const jwt =require("jsonwebtoken")
const router = express.Router();

const categories = require('../models/categories')
const bcrypt = require('bcryptjs')
//var Joi = require('@hapi/joi');
//const verify = require('../admintoken')
const dontenv = require('dotenv');
dontenv.config();


var categoriescontroller= {}

categoriescontroller.savecat = async  function(req,res,next){

    // const cart = await Product.findOne({name:req.body.name})
    // if(!name) return res.status(400).send('product  is not found')

    const ccat=new categories({
        //  _id: mongoose.Types.ObjectId(),
           name: req.body.name,
         
           
       });
     

       try{
        const savedcart =await ccat.save();
        res.send({
                     message: 'categories was created',
                    
                     
                 });



    }catch (err){
        res.status(400).send(err);
    }

}


// categoriescontroller.getcat =   function(req,res,next){
// categories
//         .find()
//         .select('_id product quantity')
//         .populate('product', '_id name price')
//         .exec()
//         .then(orders => {
//             res.status(200).json({
//                 count: orders.length,
//                 orders: orders
//             });
//         })
//         .catch(error => {
//             next(error);
//         })
//     }


    // function createOrder(req) {
    //     return new Cart({
    //      //  _id: mongoose.Types.ObjectId(),
    //         product: req.body.productId,
    //         quantity: req.body.quantity
    //     });
    // }
module.exports = categoriescontroller;