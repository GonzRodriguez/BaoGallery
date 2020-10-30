const express = require("express");
const router = express.Router();
const User = require("../models/users")
const bcrypt = require("bcryptjs");


router.post("/:id", (req, res) => {
    const username = req.body.username
    const email = req.body.email
    const webpage = req.body.webpage
    const password = req.body.password
    const instagram = req.body.instagram
    const facebook = req.body.facebook
    const twitter = req.body.twitter
    const snapchat = req.body.snapchat
    const flickr = req.body.flickr
    
    User.findById(req.params.id,async function(err, user){
        
        const hashedPassword = await bcrypt.hash(password, 10);

        if (err) throw err;
        if (username) { user.usename = username }
        if (email) { user.email = email }
        if (webpage) { user.webpage = webpage }
        if (password) { user.password = hashedPassword }
        if (instagram) { user.socialMediaAccounts.instagram.account = instagram; user.socialMediaAccounts.instagram.icon = "fab fa-instagram"}
        if (facebook) { user.socialMediaAccounts.facebook.account = facebook; user.socialMediaAccounts.facebook.icon = "fab fa-facebook" }
        if (snapchat) { user.socialMediaAccounts.snapchat.account = snapchat; user.socialMediaAccounts.snapchat.icon = "fab fa-snapchat" }
        if (twitter) { user.socialMediaAccounts.twitter.account = twitter; user.socialMediaAccounts.twitter.icon = "fab fa-twitter" }
        if (flickr) { user.socialMediaAccounts.flickr.account = flickr; user.socialMediaAccounts.flickr.icon = "fab fa-flickr" }
        
        user.save(err, updatedUser => {
            if (err) throw err;
            res.send(updatedUser)
        })
    });
});


module.exports = router;