const router = require('express').Router();

const User = require('../models/adminmodel')
const controler = require('../controller/admincontroller')
const veriy  = require("../admintoken")
router.post('/register', function(req, res) {
    controler.sav(req, res);
  });

  router.post('/login', function(req, res) {
    controler.logi(req, res);
  });

  router.get('/data', veriy,function(req, res) {
    controler.data(req, res);
  });

module.exports = router;