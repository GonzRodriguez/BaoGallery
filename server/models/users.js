const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const socialMediaAccounts = new Schema({
        instagram: String,
        facebook: String,
        twitter: String,
        snapchat: String,
        flickr: String
})

const userSquema = new Schema({
    username: String,
    avatar: String,
    email: String,
    bio: String,
    password: String,
    accessToken: String,
    refreshToken: String,
    webpage: String,
    socialMediaAccounts: socialMediaAccounts,
    posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }]
});

// userSquema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSquema);
