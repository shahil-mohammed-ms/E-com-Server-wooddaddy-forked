const mongoose = require('mongoose')
const bannerSchema = mongoose.Schema({

title:{

type:String,
required:true

},

subtitle:{

  type:String,
  required:true

},
imgUrl:{

  type:String,
  required:true

}

})

module.exports = mongoose.model('banner',bannerSchema)