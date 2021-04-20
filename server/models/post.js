const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const postSchema = new Schema({
    creator: { type: String, index: true, text: true },
    creatorId: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    client: [{ type: Schema.Types.ObjectId, ref: 'Client' }],
    price: Number,
    tags: { type: [String], index: true, text: true },
    postsPath: String,
    createdAt: { type: String, index: true, text: true },
    imgCollection: { type: String, index: true, text: true },
    date: Date,
    likeCount: {
        type: Number,
        default: 0,
    },
})


const PostMessage = mongoose.model('Post', postSchema);

module.exports = PostMessage;