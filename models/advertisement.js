const mongoose = require('mongoose')
const advertisementSchema = mongoose.Schema({

  offer:{

    type:Number,
    required:true
    
    },

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

module.exports = mongoose.model('advertisement',advertisementSchema)