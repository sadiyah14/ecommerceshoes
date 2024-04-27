const mongoose =require('mongoose')

const FeedbackSchema = new mongoose.Schema({
    feedname: String,
    feedemail: String,
    feedcontact: String,
    feeddescription: String,
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    date: {
        type: Date,
        default: Date.now,
    },
})

const FeedbackModel = mongoose.model("feedbacks", FeedbackSchema)
module.exports = FeedbackModel