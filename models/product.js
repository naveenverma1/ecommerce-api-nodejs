const mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
const productSchema = mongoose.Schema({
  
    name: { type: String,
         required: true 
        },
    price: { type: Number, 
            required: true 
        },
    productImage: {
         type: String
     }
});
productSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Product', productSchema);