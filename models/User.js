const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    authorid: Number,
    authorname: String,
    authorusername: String,
    authorimg: String,
    authorbio: String,
    postcount: Number,
    likecount: Number
})

const User = mongoose.model('User', userSchema)
module.exports = User
