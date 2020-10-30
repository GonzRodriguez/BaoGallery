
    const User = require("../models/users");
    const bcrypt = require("bcryptjs");
    const localStrategy = require("passport-local").Strategy;

module.exports =  function (passport) {

// uses the passport strategy and checks if credentials matches with logged user
    passport.use(
        new localStrategy((username, password, done) =>  {
            User.findOne({ username: username }, async (err, user) => {
                if (err) throw err;
                if (!user) return done(null, false);
              await bcrypt.compare(password, user.password, (err, result) => {
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
// establish and destroys the user session 
    passport.serializeUser((user, cb) => {
        cb(null, user.id);
    });
    passport.deserializeUser((id, cb) => {
        User.findOne({ _id: id }, (err, user) => {
            const userInformation = {
                username: user.username,
            };
            cb(err, userInformation);
        });
    });
};