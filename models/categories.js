const mongoose = require('mongoose');

const cartSchema = mongoose.Schema({
    name:{
      type : String
    },

    product: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Product', 
        required: true
     }],
 
});

module.exports = mongoose.model('categories', cartSchema);