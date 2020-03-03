const router = require('express').Router();

const User = require('../models/categories')
const catcontroler = require('../controller/categoriesc')
const verify  = require("../verifytoken")
const veriy  = require("../admintoken")
router.post('/savecat', veriy,function(req, res) {
    catcontroler.savecat(req, res);


  });

  router.get('/getcat',verify,function(req, res) {
    catcontroler.getcat(req, res);

  });

module.exports = router;