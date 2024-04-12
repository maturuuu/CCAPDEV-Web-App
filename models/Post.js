const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    id: Number,
    authorid: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    title: String,
    content: String,
    timecreated: Date,
    timestamp: String,
    isEdited: Boolean,
    likecount: Number,
    likespositive: Boolean,
    comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Post'}],
    isReply: Boolean,
    isAuthor: Boolean,
})

const Post = mongoose.model('Post', postSchema)
module.exports = Post