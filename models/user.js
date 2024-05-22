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
  required:false

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
  required:false
},
cart:{
  type:Array,
  required:false
},
wishlist:{
  type:Array,
  required:false
},
order:{
  type:Array,
  required:false
},

})

module.exports = mongoose.model('user',userSchema)