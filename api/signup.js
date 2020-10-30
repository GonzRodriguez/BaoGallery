const express = require("express");
const bcrypt = require("bcryptjs");
// const passport = require("passport");
const router = express.Router();
const User = require("../models/users");

router.get("/", function (req, res) {
    res.json({ message: "sign up received" });
    console.log("sign up message ");
});

router.post('/',  (req, res, next) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    
    if (!username || !password || !email) {
        res.send({ message: "All the fields are required", ErrorMessage: 1 });
    } 
    if (password.length < 8) {
        res.send({ message: "Password must be longer than 8 characters", ErrorMessage: 1 });
    } 
    else if (email.match(pattern)){
        User.findOne({ username: req.body.username }, async (err, doc) => {
            if (err) throw err;
            if (doc) res.send({ message: "User Already exists", ErrorMessage: 1 });
            if (!doc) {
                const hashedPassword = await bcrypt.hash(req.body.password, 10);

                const newUser = new User({
                    username: req.body.username,
                    email: req.body.email,
                    password: hashedPassword,
                    webpage: "",
                    socialMediaAccounts: {
                        Instagram: { account: "", icon: "fab fa-instagram" },
                        Facebook: { account: "", icon: "fab fa-facebook" },
                        Twitter: { account: "", icon: "fab fa-twitter" },
                        Snapchat: { account: "", icon: "fab fa-snapchat" },
                        Flickr: { account: "", icon: "fab fa-flickr" }
                    }
                });
                await newUser.save();
                 req.login(newUser, (err) => {
                // if the request reaches this point, the user is safely authenticated
                // We need to manually log the user in in order to create the users session.
                    if (err) throw err;
                    res.status(200)
                    res.json({ redirectURI: "/dashboard", success: true });
                    console.log("Si juser " + req.user, req.session);
                });
            
        }});
        
    } else {
        res.send({ message: "Please, introduce a valid email format", ErrorMessage: 1 });
        }
    });

    module.exports = router;
    