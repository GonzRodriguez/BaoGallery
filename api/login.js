const express = require("express");
const passport = require("passport");
const router = express.Router();
// const User = require("../models/users");


router.post("/", async (req, res, next) => {


   await passport.authenticate("local", (err, user, next) => {
        // if the request reaches this point, the user is safely authenticated
        if (err) throw err;
        if (!user) res.send({ message: "Please, introduce valid credentials", ErrorMessage: 1});
        else {
            req.logIn(user, (err) => {
                // We need to manually log the user in in order to create the users session.
                if (err) throw err;
                res.json({ redirectURI: "/dashboard", success: true });
                // res.redirect("/success")
                
                console.log(req.user);
            });
        }
    })(req, res, next);
    
});

// router.get("/success", (req, res) => {
//     res.json({ redirectURI: "/dashboard", success: true });
// })

module.exports = router;
