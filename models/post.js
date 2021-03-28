const mongoose = require("mongoose")
const Schema = mongoose.Schema;
// const mongoose_fuzzy_searching = require('mongoose-fuzzy-searching');

const postSchema = new Schema({
    creator: { type: String, index: true, text: true },
    creatorId: [{ type: Schema.Types.ObjectId, ref: 'User' }],
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

// postSchema.plugin(mongoose_fuzzy_searching, { fields: ["tags", "imgCollection", "creator", "date"] })

const PostMessage = mongoose.model('Post', postSchema);

module.exports = PostMessage;