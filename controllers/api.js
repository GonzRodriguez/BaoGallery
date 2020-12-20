
const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const Busboy = require("Busboy")
const passport = require("passport")
const User = require("../models/users.js")
const Post = require("../models/post.js")


exports.dashboard = async (req, res) => {
    try {
            req.isAuthenticated ? console.log("authenticated") : console.log("not authenticated");;

            console.log("Es user " + req.user);
            res.send(req.user)

            console.log(req.session);

            // Cookies that have not been signed
            console.log('Cookies: ', req.cookies)
            // Cookies that have been signed
            console.log('Signed Cookies: ', req.signedCookies)
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

// POSTS

exports.getPost = async (req, res) => {
    const { id } = req.params;

    try {
        const post = await Post.findById(id);

        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}
// exports.createpost = async (req, res) => {
//     res.send("Reached")
// }
exports.createPost = async (req, res) => {
    const { title, message, selectedFile, creator } = req.body;

    const newPostMessage = new Post({ title, message, selectedFile, creator })
    console.log(req.body );

    try {
        await newPostMessage.save();

        res.status(201).json(newPostMessage);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}
// AJUSTAR LA EDICION DE PERFILES
exports.editProfile = async (req, res) => {
    try {
        var busboy = new Busboy({ headers: req.headers });
        let newUser = {}
        busboy.on('field', function (fieldname, val) {
            // console.log('Field [' + fieldname + ']: value: ' + inspect(val));
            // const fieldArray = [fieldname + " " + val]
            // console.log("Field Array "  + fieldArray);
            User.findById(req.params.id, async function (err, user) {

                let socialMedia = user.user.socialMediaAccounts

                if (fieldname === "username" && val) { user.username = val }
                if (fieldname === "email" && val) { user.email = val }
                if (fieldname === "webpage" && val) { user.webpage = val }
                if (fieldname === "password" && val) { user.password = bcrypt.hash(val, 10) }
                if (fieldname === "instagram" && val) { socialMedia.set({ instagram: { account: val, icon: "fab fa-instagram" } }) }
                if (fieldname === "facebook" && val) { socialMedia.set({ facebook: { account: val, icon: "fab fa-facebook" } }) }
                if (fieldname === "snapchat" && val) { val = socialMedia.set({ snapchat: { account: val, icon: "fab fa-snapchat" } }) }
                if (fieldname === "twitter" && val) { socialMedia.set({ twitter: { account: val, icon: "fab fa-twitter" } }) }
                if (fieldname === "flickr" && val) { socialMedia.set({ flickr: { account: val, icon: "fab fa-flickr" } }) }

                user.save(err, updatedUser => {
                    if (err) throw err;
                    newUser = updatedUser
                })
                console.log(user);
            });
        });
        busboy.on('finish', function () {
            console.log('Done parsing form!');
            res.send(newUser)
        });
        req.pipe(busboy);
    } catch (error) {
        console.log(error);
    }
}

exports.tryProfile = async (req, res) => {
    console.log(User);
    const { username, avatar, email, password, webpage, instagram, facebook, twitter, snapchat, flickr } = req.body
    let user = {
        username: username,
        avatar: avatar,
        email: email,
        webpage: webpage,
        password: password,
        instagram: instagram,
        facebook: facebook,
        twitter: twitter,
        snapchat: snapchat,
        flickr: flickr
    }
try {

    await User.updateOne({ _id: req.params.id }, user, { upsert: true, omitUndefined: true })

} catch (error) {
    console.log(error);
}
}

exports.updatePost = async (req, res) => {
    const { id } = req.params;
    const { title, message, creator, selectedFile, tags } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const updatedPost = { creator, title, message, tags, selectedFile, _id: id };

    await Post.findByIdAndUpdate(id, updatedPost, { new: true });

    res.json(updatedPost);
}

exports.deletePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    await Post.findByIdAndRemove(id);

    res.json({ message: "Post deleted successfully." });
}

// AUTHENTICATION

exports.reqUser = async (req, res) => {
    try {
        console.log("isAuthenticated", req.isAuthenticated());
        console.log("Session", req.session);
        // console.log("USER", req.user);
        if (req.session) {
            User.findOne(req.user, (err, user) => {
                if (err) throw err;
                    res.json({ auth: 1, data: user })
            })
        } else {
            res.send({ auth: 0})
        }
    } catch (error) {
     console.log(error);   
    }
}
exports.login = async (req, res, next) => {

    try {
        
       await passport.authenticate("local", async (err, user, info) => {
           // if the request reaches this point, the user is safely authenticated
           if (err) { return next(err); }
           if (!user) res.send({ message: "Please, introduce a valid credentials", redirectURI: "/login", ErrorMessage: true });
           else {
                    req.login(user, (err) => {
                       // We need to manually log the user in in order to create the users session.
                       if (err) { return next(err); }
                       try {
                        //    authenticatedUser()
                           res.json({ redirectURI: "/dashboard", success: true, cookie: req.session.cookie })

                           console.log("el User ", user, "es Auth " + req.isAuthenticated(), "Cookie ", req.session.cookie, "INFO " + info);
                    } catch (error) {
                        console.log(error);                        
                    }
                })
        }
    })(req, res, next);

    } catch (error) {
        console.log(error);
    }
} 
exports.signup = async (req, res, next) => {
    try {
        const username = req.body.username;
        const email = req.body.email;
        const password = req.body.password;
        const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
console.log(req.body);
        if (!username || !password || !email) {
            res.send({ message: "All the fields are required", redirectURI: "/signup", ErrorMessage: 1 });
        }
        if (password.length < 8) {
            res.send({ message: "Password must be longer than 8 characters", redirectURI: "/signup", ErrorMessage: 1 });
        }
        else if (email.match(pattern)) {
            User.findOne({ username: req.body.username }, async (err, doc) => {
                if (err) throw err;
                if (doc) res.send({ message: "User Already exists", redirectURI: "/signup", ErrorMessage: 1 });
                if (!doc) {
                    const hashedPassword = await bcrypt.hash(req.body.password, 10);
                    const newUser = new User({
                        username: req.body.username,
                        email: req.body.email,
                        avatar: "",
                        password: hashedPassword,
                    });

                    await newUser.save().then(

                        req.login(newUser, (err) => {
                            // if the request reaches this point, the user is safely authenticated
                            // We need to manually log the user in in order to create the users session.
                            
                            if (err) { return next(err); }
                            res.status(200)
                            res.json({ redirectURI: "/dashboard", success: true, session: req.session });
                            console.log("Si juser " + req.user, req.session);
                        })
                        )
                        
                    }
            });

        } else {
            res.send({ message: "Please, introduce a valid email format", ErrorMessage: 1 });
        }
    } catch (error) {
        console.log(error);
    }
} 
exports.logout = async (req, res, next) => {

    try {
        req.logout();
        req.session.destroy()
        req.session = null

    } catch (error) {
        console.log(error);
    }
} 


