const express = require('express')
const jwt =require("jsonwebtoken")
const router = express.Router();
const Cart = require('../models/cart')
const Product = require('../models/product')
const bcrypt = require('bcryptjs')
//var Joi = require('@hapi/joi');
//const verify = require('../admintoken')
const dontenv = require('dotenv');
dontenv.config();


var cartcontroller= {}

cartcontroller.savecart =   async function(req,res,next){

    // const cart = await Product.findOne({name:req.body.name})
    // if(!name) return res.status(400).send('product  is not found')

    const ccart=new Cart({
        //  _id: mongoose.Types.ObjectId(),
           product: req.body.productId,
           quantity: req.body.quantity
       });
     

       try{
        const savedcart =await ccart.save();
        res.send({
                     message: 'Order was created',
                     order: {
                         _id: ccart._id,
                         product: ccart.product,
                        quantity: ccart.quantity
                     }
                 });



    }catch (err){
        res.status(400).send(err);
    }

    // Product
    // .findById(req.body.productId)
    // .exec()
    // .then(product => {
    //     if (!product) {
    //         return res.status(404).json({
    //             message: 'Product Not Found!'
    //         });
    //     }
    //     return createOrder(req);
    // })
    // .then(order => {
    //     return order.save();
    // })
    // .then(order => {
    //     return res.status(201).json({
    //         message: 'Order was created',
    //         order: {
    //             _id: order._id,
    //             product: order.product,
    //             quantity: order.quantity
    //         }
    //     });
    // })
    // .catch(error => {
    //     //next(error);
    // });

}


cartcontroller.getcart =   function(req,res,next){
Cart
        .find()
        .select('_id product quantity')
        .populate('product', '_id name price')
        .exec()
        .then(orders => {
            res.status(200).json({
                count: orders.length,
                orders: orders
            });
        })
        .catch(error => {
            next(error);
        })
    }


    function createOrder(req) {
        return new Cart({
         //  _id: mongoose.Types.ObjectId(),
            product: req.body.productId,
            quantity: req.body.quantity
        });
    }
module.exports = cartcontroller;