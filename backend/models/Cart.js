const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to your User model
    required: true
  },
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product', // Reference to your Product model
        required: true
      },
      quantity: {
        type: Number,
        required: true,
        default: 1
      }
    }
  ]
});

const CartModel = mongoose.model('Cart', CartSchema);

module.exports = CartModel;
