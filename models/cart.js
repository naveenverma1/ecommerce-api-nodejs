const mongoose = require('mongoose');

const cartSchema = mongoose.Schema({
   // _id: mongoose.Schema.Types.ObjectId,
    product: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Product', 
        required: true
     },   
  

     quantity: {
         type: Number,
          default: 1 }
});


module.exports = mongoose.model('cart', cartSchema);