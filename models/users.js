const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose")

// const SocialMedia = mongoose.model('Socialmedia', socialSquema);

const userSquema = new Schema({
    username: String,
    avatar: String,
    email: String,
    password: String,
    webpage: String,
    instagram: String,
    facebook: String,
    twitter: String,
    snapchat: String,
    flickr: String
});

userSquema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSquema);
