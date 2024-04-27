const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    productname: { type: String, required: true },
    productimg: { type: String, required: true },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
    },
    productprice: { type: String, required: true },
    description: { type: String, required: true },
    date: {
        type: Date,
        default: Date.now,
    },
});

const ProductModel = mongoose.model('Product', ProductSchema);
module.exports = ProductModel;
