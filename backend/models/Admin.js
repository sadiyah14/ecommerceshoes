const mongoose =require('mongoose')

const AdminSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    date: {
        type: Date,
        default: Date.now,
    },
})

const AdminModel = mongoose.model("admins", AdminSchema)
module.exports = AdminModel