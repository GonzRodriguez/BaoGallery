const express = require("express");
const passport = require("passport");
const router = express.Router();
const User = require("../models/users");



router.get("/",  (req, res) => {

    req.isAuthenticated ? console.log("authenticated") : console.log("not authenticated");;
        console.log("Es user " + req.user);
        res.send(req.user)
        console.log(req.session);
        
        // Cookies that have not been signed
    console.log('Cookies: ', req.cookies)
    // Cookies that have been signed
    console.log('Signed Cookies: ', req.signedCookies)
})


router.post("/", async (req, res, next) => {


    passport.authenticate("local", (err, user, info) => {
        if (err) throw err;
        if (!user) res.send({ message: "No User Exists", color: "error", success: false});
        else {
            req.logIn(user, (err) => {
                if (err) throw err;
                res.status(200)
                res.json({ redirectURI: "/dashboard", success: true });
                console.log(req.user);
            });
        }
    })(req, res, next);

});

module.exports = router;
    // const user = new User({
    //     username: req.body.username,
    //     password: req.body.password
    // })
    
    // req.login(user, (err) => {
    //     if (err) throw err;
    //     console.log("Si juser " + req.user, req.session);
    //     passport.authenticate("local", (err, user, info) => {
    //         if (err) throw err;
    //         else {
    //         }
    //     })(req, res, next);
    // });
    