const mongoose = require("mongoose");
const { Schema } = mongoose

const photoSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    author_id: String,
    title: String,
    author: String,
    price: String,
    date: {type: Date, default: Date.now},
    image: String,
    sold: Boolean
})

module.exports = mongoose.model("Photo", photoSchema);