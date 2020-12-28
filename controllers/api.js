
const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const passport = require("passport")
const User = require("../models/users.js")
const Post = require("../models/post.js")
const formidable = require('formidable');
const fs = require("fs")


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
exports.createPost =  (req, res, next) => {
    const form = formidable({ multiples: true });


    form.parse(req, (err, fields, file) => {
        if (err) {
            next(err);
            return;
        }
        const { creatorId, creator, createdAt, price, tags, title, date } = fields;
        const path = `/users/gon_w/desktop/coding/baoGallery/public/users/${creator}/` + file.name
        console.log(file);


        if (fs.existsSync(`/users/gon_w/desktop/coding/baoGallery/public/users/${creator}/`)) {
                fs.writeFile(`/users/gon_w/desktop/coding/baoGallery/public/users/${creator}/` + title, file, (err) => {
                    if (err) throw err;
                    console.log("The file was appended to directory!");
                });
            } else {
                fs.mkdir(`/users/gon_w/desktop/coding/baoGallery/public/users/${creator}`, (err) => {
                    if (err) throw err;
                    console.log("created");
                })
                fs.writeFile(`/users/gon_w/desktop/coding/baoGallery/public/users/${creator}/` + title, file, (err) => {
                    if (err) throw err;
                    console.log("The file was appended to directory!");
                });
            }

        const newPost = new Post({ title, creatorId, price, tags, path, creator, createdAt, date })

        try {
            newPost.save();
            res.status(201).json(typeof file);
        } catch (error) {
            console.log(error);
            res.status(409).json({ message: error });
        }
        });
        
    // console.log(creatorId, creator, createdAt, price, tags, strigifiedImage );
}

exports.editProfile = async (req, res) => {
    console.log(User);
    const { username, avatar, email, password, webpage, instagram, facebook, twitter, snapchat, flickr } = req.body
    const hashedPassword = await bcrypt.hash(password, 10);

    
    const withPassword = {
        username: username,
        avatar: avatar,
        email: email,
        webpage: webpage,
        instagram: instagram,
        facebook: facebook,
        twitter: twitter,
        snapchat: snapchat,
        flickr: flickr
    }
    const noPassword = {
        username: username,
        avatar: avatar,
        email: email,
        webpage: webpage,
        password: hashedPassword,
        instagram: instagram,
        facebook: facebook,
        twitter: twitter,
        snapchat: snapchat,
        flickr: flickr
    }
    function uploadUser() {
        if (password.length > 1) {
            return withPassword
        }
        return noPassword
    }
    console.log(uploadUser());
try {

    await User.updateOne({ _id: req.params.id }, uploadUser(), { upsert: true, omitUndefined: true })

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
        console.log("session destroyed", req.session);

    } catch (error) {
        console.log(error);
    }
    try {
        req.session.destroy(function(err){
            if (err) throw err;
            console.log("session destroyed", req.session);
        });
    } catch (error) {
        console.log(error);
    }
    try {
        console.log(req.session);
    } catch (error) {
        console.log(error);
    }
} 

exports.test = async (req, res, next) => {
    

    fs.readFile('/users/gon_w/desktop/coding/baoGallery/public/users/MoneySlide/imageProfile.jpg', (err, data) => {
        if (err) throw err;
        fs.writeFileSync("new-path.jpg", data);
        console.log(data);
        res.send(data)
    });




}
