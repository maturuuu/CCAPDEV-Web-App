const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    authorname: String,
    authorusername: String,
    authoremail: String,
    authorpassword: String,
    authorimg: String,
    authorbio: String,
})

const User = mongoose.model('User', userSchema)
module.exports = User
