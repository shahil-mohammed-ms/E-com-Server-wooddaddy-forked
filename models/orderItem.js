const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderItemSchema = new Schema({
 
  productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  userId: { type: Schema.Types.ObjectId, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  totalAmount : { type: Number, required: true },
  ordered:{type:Boolean,required:true}
},{
  timestamps: true
});

const OrderItem = mongoose.model('OrderItem', OrderItemSchema);


module.exports = OrderItem;
