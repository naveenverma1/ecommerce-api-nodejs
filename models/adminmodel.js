const mongoose = require('mongoose');
const adminSchema = new mongoose.Schema({
    name: {
        type :String,
        required : true,
    },
    email: {
        type: String,
       required : true,
       
    },
    password : {
        type : String,
        required : true,       
    },
    phonenumber:{
        type : String,
        match: /^[0-9]{10}$/   
    },
    date : {
        type : Date,
        default :Date.now
    }
})
module.exports = mongoose.model('admin',adminSchema);