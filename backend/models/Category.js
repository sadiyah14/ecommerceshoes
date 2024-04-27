const mongoose =require('mongoose')

const CategorySchema = new mongoose.Schema({
    categoryname: { type: String, required: true },
    date: {
        type: Date,
        default: Date.now,
    },
})

const CategoryModel = mongoose.model("Category", CategorySchema)
module.exports = CategoryModel