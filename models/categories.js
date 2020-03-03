const mongoose = require('mongoose');

const cattSchema = mongoose.Schema({
    name:{
      type : String
    }
});


module.exports = mongoose.model('Category', cattSchema);