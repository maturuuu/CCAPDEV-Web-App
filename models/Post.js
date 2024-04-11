const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    id: Number,
    authorid: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    title: String,
    content: String,
    timestamp: String, //consider changing to Date later
    isEdited: String,
    likecount: Number,
    comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Post'}],
    isReply: Boolean,
    isAuthor: Boolean,
})

const Post = mongoose.model('Post', postSchema)
module.exports = Post