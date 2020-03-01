const router = require('express').Router();

const User = require('../models/cart')
const cartcontroler = require('../controller/cartcontroller')
const verify  = require("../verifytoken")
router.post('/savecart', function(req, res) {
    cartcontroler.savecart(req, res);


  });

  router.get('/getcart', function(req, res) {
    cartcontroler.getcart(req, res);

    
  });

 
module.exports = router;