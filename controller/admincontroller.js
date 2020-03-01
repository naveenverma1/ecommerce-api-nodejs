const express = require('express')
const jwt =require("jsonwebtoken")
const router = express.Router();
const Admin = require('../models/adminmodel')
const bcrypt = require('bcryptjs')
//var Joi = require('@hapi/joi');
const verify = require('../admintoken')
const dontenv = require('dotenv');
dontenv.config();
var admin
const {registerValidation,loginValidation} = require('../validation');

var maincontroller= {}

maincontroller.sav = async function(req,res,next){
   
    const{error} = registerValidation(req.body);
    if(error) 
    return res.status(400).send(error.details[0].message)
    
    const emailexist = await Admin.findOne({email:req.body.email})
 
    if(emailexist) return res.status(400).send('email  already exist')
    
 
    const salt = await bcrypt.genSalt(10);
    
    const hashPassword = await bcrypt.hash(req.body.password,salt)
    
         admin = new Admin({
          name : req.body.name,
    
    
          email : req.body.email,
          password : hashPassword,
          phonenumber : req.body.phonenumber,
  
         //date :  req.body.date
         })
        
        try{
            const savedadmin =await admin.save();
            res.send({admin : admin._id});
    
        }catch (err){
            res.status(400).send(err);
        }
       
    }
    
// login

maincontroller.logi = async function(req,res){

        const{error} = loginValidation(req.body);
        if(error) 
        return res.status(400).send(error.details[0].message)
    
    const admin = await Admin.findOne({email:req.body.email})
    if(!admin) return res.status(400).send('email  is not found')
    const validPass = await bcrypt.compare(req.body.password,admin.password)
    if(!validPass) return res.status(400).send("invalid password")
    
   // crATE AND ASSIGN TOKEN
    
    const toke = await jwt.sign({_id : admin._id},process.env.Token_secre)
    res.header("admin-token", toke).send(toke);
    
    res.send("logged in")
    }
    


maincontroller.data = async function(req,res)
    { 
    res.json({
        posts:{
            title:"my first post admin",
        discription : "random data you not acess" }
    })
}

module.exports = maincontroller;

    
