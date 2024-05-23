const mongoose = require('mongoose')
const cartSchema = new mongoose.Schema({
  userId:{
    type: mongoose.Schema.Types.ObjectId,
    required: true,

  },

  proId:{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Product"

  },

  qty:{
    type:Number,
    required:true

  }

},
{
    timestamps: true

}
)

module.exports = mongoose.model('Cart', cartSchema)
