const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the OrderItem schema
const OrderItemSchema = new Schema({
  productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true }
});

// Define the Order schema
const OrderSchema = new Schema({
  orderId: { type: String, required: true, unique: true },
  customer: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    address: { 
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      zip: { type: String, required: true },
    }
  },
  items: [OrderItemSchema],
  totalAmount: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'shipped', 'delivered', 'cancelled'], default: 'pending' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Create a pre-save hook to update the 'updatedAt' field
OrderSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Compile the model from the schema
const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;
