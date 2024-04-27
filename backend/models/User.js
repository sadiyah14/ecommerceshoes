const mongoose =require('mongoose')
 
const UserSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    username: String,
    contact: String,
    email: String,
    password: String,
    city: String,
    birth: String,
    address: String,
    image: String,
    date: {
        type: Date,
        default: Date.now,
    },
})

const UserModel = mongoose.model("User", UserSchema)
module.exports = UserModel