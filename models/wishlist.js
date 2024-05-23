const mongoose = require('mongoose')
const wishlistSchema = new mongoose.Schema({
  userId:{
    type: mongoose.Schema.Types.ObjectId,
    required: true,

  },

  proId:{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Product"

  },
 folder:{
  type:String,
  required:false
 }

},
{
    timestamps: true

}
)

module.exports = mongoose.model('Wishlist', wishlistSchema)
