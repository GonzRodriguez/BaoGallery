const mongoose = require("mongoose")
const Schema = mongoose.Schema;


const postSchema = new Schema({
    title: String,
    creator: String,
    creatorId: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    price: Number,
    tags: [String],
    postsPath: String,
    createdAt: String,
    date: Date,
    likeCount: {
        type: Number,
        default: 0,
    },
})

const PostMessage = mongoose.model('Post', postSchema);

module.exports = PostMessage;