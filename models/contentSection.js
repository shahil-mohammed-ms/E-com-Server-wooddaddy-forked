const mongoose = require('mongoose')
const ContentSectionSchema = mongoose.Schema({

title:{

type:String,
required:true

},

desc:{

  type:String,
  required:true

}

})

module.exports = mongoose.model('ContentSection',ContentSectionSchema)