const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    id: Number,
    authorid: Number,
    title: String,
    content: String,
    timestamp: String, //consider changing to Date later
    isEdited: String,
    comments: Array,
    isReply: Boolean
})

const Post = mongoose.model('Post', postSchema)
module.exports = Post