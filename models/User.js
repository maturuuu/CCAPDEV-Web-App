const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    authorname: String,
    authorusername: String,
    authorimg: String,
    authorbio: String,
    likecount: Number
})

const User = mongoose.model('User', userSchema)
module.exports = User
