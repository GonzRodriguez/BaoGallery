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
    // function sendResponse(msg){ console.log(msg); res.send({ redirectURI: "/dashboard", statusMessage: "ok" });}
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    
    if (!username || !password || !email) {
        res.send({ message: "All the fields are required", success: false });
    } 
    if (password.length <= 1) {
        res.send({ message: "Password must be longer than 8 characters", success: false });
    } 
    if (email.match(pattern)){
        User.findOne({ username: req.body.username }, async (err, doc) => {
            if (err) throw err;
            if (doc) res.send("User Already Exists");
            if (!doc) {
                const hashedPassword = await bcrypt.hash(req.body.password, 10);

                const newUser = new User({
                    username: req.body.username,
                    email: req.body.email,
                    password: hashedPassword,
                });
                await newUser.save();
                 req.login(newUser, (err) => {
                    if (err) throw err;
                    res.status(200)
                    res.json({ redirectURI: "/dashboard", success: true });
                    console.log("Si juser " + req.user, req.session);
                });
                // await passport.authenticate("local", { session: true }, (err, newUser, info) => {
                //     console.log("reached");
                //     if (err) throw err;
                //     // if (!user) res.send({ message: "No User Exists", color: "error", statusMessage: "error" });
                //     else {
                //     }
                // })(req, res, next);
            
        }});
        
    } else {
        res.send({ message: "Please, introduce a valid email format", color: "success", statusMessage: "error" });
        }
    });

    module.exports = router;
    

    // User.register({username: username}, password, function(err, user){
    //     if (err) {
    //         console.log("el error " + err, err);
    //         res.json({ message: "User alredy exists", color: "error", statusMessage: "error" })
    //     } else {
    //         passport.authenticate("local") (req, res, function(){
    //             res.render("/")
    //             // res.json({ redirectURI: "/dashboard", statusMessage: "ok", user: user})
    //             console.log( req.user);
    //             // if (err) { console.log(err) }
    //             // console.log("la info " + info);
    //             // if (!user) { return res.send({ statusMessage: "error", otraCosa: info }); }
    //             // req.logIn(user, function (err) {
    //             //     if (err) { return next(err); }
    //             //     if (!err){ 
    //                     // console.log("Logged user " + user, "La Sesión " + req.session.id);
    //                     // return next(res.json({ redirectURI: "/dashboard", statusMessage: "ok", }))
    //             // }
    //             // });
    //             //    
    //         })//(req, res, next);
    //     }
    //     // res.end({ redirectURI: "/dashboard", statusMessage: "ok" });
        // })