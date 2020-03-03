"use strict"

const express = require('express')
const jwt =require("jsonwebtoken")
const router = express.Router();
const User = require('../models/models')
const bcrypt = require('bcryptjs')
//var Joi = require('@hapi/joi');
const verify = require('../verifytoken')
const dontenv = require('dotenv');
dontenv.config();

const {registerValidation,loginValidation} = require('../validation');

var maincontroller= {}

maincontroller.sav = async function(req,res,next){
    
    
    const{error} = registerValidation(req.body);
    if(error) 
    return res.status(400).send(error.details[0].message)
    
    const emailexist = await User.findOne({email:req.body.email})
 
    if(emailexist) return res.status(400).send('email  already exist')
    
   // const hash = await bcrypt.hash(req.body.password, 8);
    const salt = await bcrypt.genSalt(10);
    
    const hashPassword = await bcrypt.hashSync(req.body.password,salt)
        const user = await new User({
          name : req.body.name,
          email : req.body.email,
          password : hashPassword,
          phonenumber : req.body.phonenumber,
        
         //date :  req.body.date
         })
        //  user.save((err) => {
        //     if (err) {
        //       return next(err);
        //     }
        //     res.send({user : user._id});
        //   });
        try{
            const savedUser =await user.save();
            res.send({user : user._id});
    
    
    
        }catch (err){
            res.status(400).send(err);
        }
       
    }
    
// login

maincontroller.logi = async function(req,res){

        const{error} = loginValidation(req.body);
        if(error) 
        return res.status(400).send(error.details[0].message)
    
        const user = await User.findOne({email:req.body.email})
    if(!user) return res.status(400).send('email  is not found')
    const validPass = await bcrypt.compare(req.body.password,user.password)
    if(!validPass) return res.status(400).send("invalid password")
    
   // crATE AND ASSIGN TOKEN
    
    const token = await jwt.sign({_id : user._id},process.env.TOKEN_SECRET)
    res.header("auth-token", token).send({"message":"logged in",token});
    
    res.send("logged in")
    }
    


maincontroller.data = async function(req,res)
    { 
    res.json({
        posts:{
            title:"my first post user",
        discription : "random data you not acess" }
    })
}

module.exports = maincontroller;

    
