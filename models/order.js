 
const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    payment_mode: {
        type: String,
        required: true
    },
    Totalamount: {
        type: Number,
        required: true
    },
    address: {
        type: mongoose.Types.ObjectId,
        ref: 'Address',
        required: true
    },
    products: {
        item: [{
            product_id: {
                type: mongoose.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            qty: {
                type: Number,
                required: true
            },
            price: {
                type: Number,
            }
        }],
        totalPrice: {
            type: Number,
            default: 0
        }
    },
    status: {
        type: String,
        enum: ["Pending", "Placed", "Shipped", "Out_of_delivery", "Delivered", "Delayed", "Canceled"],
        default: "Placed"
    },
    offer: {
        type: String,
        default: "None"
    }
},
    {
        timestamps: true
    })

    module.exports = mongoose.model('Order', orderSchema)
