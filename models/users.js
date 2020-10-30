const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose")
const userSquema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    webpage: String,
    socialMediaAccounts: {
        instagram: { account: String, icon: String },
        facebook: { account: String, icon: String },
        twitter: { account: String, icon: String },
        snapchat: { account: String, icon: String },
        flickr: { account: String, icon: String }
    }
});

userSquema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSquema);
