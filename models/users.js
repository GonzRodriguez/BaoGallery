const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// const passportLocalMongoose = require("passport-local-mongoose")


const userSquema = new Schema({
    username: String,
    avatar: String,
    email: String,
    password: String,
    accessToken: String,
    refreshToken: String,
    webpage: String,
    instagram: String,
    facebook: String,
    twitter: String,
    snapchat: String,
    flickr: String,
    posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }]
});

// userSquema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSquema);
