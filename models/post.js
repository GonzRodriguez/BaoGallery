const mongoose = require("mongoose")


const postSchema = mongoose.Schema({
    title: String,
    creator: String,
    creatorId: String,
    price: Number,
    tags: [String],
    path: String,
    createdAt: String,
    date: Date,
    likeCount: {
        type: Number,
        default: 0,
    },
})

var PostMessage = mongoose.model('Post', postSchema);

module.exports = PostMessage;