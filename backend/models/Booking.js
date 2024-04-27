const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  bookingId: { type: String, required: true },
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
      },
      quantity: {
        type: Number,
        required: true,
      }
    }
  ],
  status: { type: String, default: "Pending" },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    default: Date.now,
    required: true
  },
});

const BookingModel = mongoose.model('Booking', BookingSchema);

module.exports = BookingModel;
