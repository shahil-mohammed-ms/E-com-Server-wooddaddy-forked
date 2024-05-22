const mongoose = require('mongoose')
const userSchema = mongoose.Schema({

  firstName:{
    type:String,
    required:true
    },

  lastName:{
  type:String,
  },
  password:{

    type:String,
    required:true
  
  },

imgUrl:{
  type:String,
  required:true

},
phone:{

  type:String,
  required:true

},
mail:{

  type:String,
  required:true

},
address:{
  type:String,

},
cart:{
  type:Array,
},
wishlist:{
  type:Array,
},
order:{
  type:Array,
},

})

module.exports = mongoose.model('user',userSchema)