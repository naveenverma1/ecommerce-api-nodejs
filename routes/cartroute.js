const router = require('express').Router();

const User = require('../models/cart')
const cartcontroler = require('../controller/cartcontroller')
const verify = require('../verifytoken');
const veriy  = require("../admintoken")
router.post('/savecart', verify,function(req, res) {
    cartcontroler.savecart(req, res);
  });
  router.get('/getcart', verify,function(req, res) {
    cartcontroler.getcart(req, res);
  });
  router.get('/cart', verify, (req, res, next) => {
    cartcontroler.cart(req,res);
  })
 
module.exports = router;