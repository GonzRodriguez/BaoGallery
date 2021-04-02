
    const User = require("../models/users");
    const bcrypt = require("bcryptjs");
    const LocalStrategy = require("passport-local").Strategy;

module.exports =  async function (passport) {

// uses the passport strategy and checks if credentials matches with logged user
    await passport.use(new LocalStrategy(async (username, password, done)  =>  {
           await  User.findOne({ username: username }, (err, user) => {
                if (err) throw err;
                if (!user) return done(null, false);
                bcrypt.compare(password, user.password, (err, result) => {
                    if (err) throw err;
                    if (result === true) {
                        return done(null, user);
                    } else {
                        return done(null, false);
                    }
                });
            });
        })
    );

    passport.serializeUser(function (user, done) {
        console.log(user);
        try {
            console.log("serialize User");
            done(null, user._id);
        } catch (error) {
            console.log(error);
        }
    });

    passport.deserializeUser(function (id, done) {
        try {
            console.log("deserialize User", id);
            User.findById(id, function (err, user) {
            done(err, user);
        });
        } catch (error) {
            console.log(error);
        }
        
    });
};

// const passport = require("passport")
// const User = require('../models/users');

// // CHANGE: USE "createStrategy" INSTEAD OF "authenticate"

// module.exports = function(){

//     try {
//         passport.use(User.createStrategy());

//         passport.serializeUser(User.serializeUser());
//         passport.deserializeUser(User.deserializeUser());
//     } catch (error) {
//         console.log(error);
//     }

    
// }