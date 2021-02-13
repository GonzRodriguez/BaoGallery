
const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
// const passport = require("passport")
const fs = require("fs"); 
const path = require("path")
const User = require("../models/users.js")
const Post = require("../models/post.js")
const formidable = require("formidable");
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const { indexOf } = require("lodash");

// exports.dashboard = async (req, res) => {
//     try {
//             req.isAuthenticated ? console.log("authenticated") : console.log("not authenticated");;

//             console.log("Es user " + req.user);
//             res.send(req.user)

//             console.log(req.session);

//             // Cookies that have not been signed
//             console.log('Cookies: ', req.cookies)
//             // Cookies that have been signed
//             console.log('Signed Cookies: ', req.signedCookies)
//     } catch (error) {
//         res.status(404).json({ message: error.message });
//     }
// }

// POSTS

exports.fetchPost = async (req, res) => {
    const { postId } = req.params;

    try {
        const post = await Post.findById(postId);
        console.log(post);

        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

exports.fetchPosts = async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await User.findById(userId);
        console.log("51 ", user.posts);
        let posts = []
        Array.from(user.posts).forEach(post => {
            Post.find({ '_id': { $in: [ post ] } }, function (err, docs) {
                posts.push(docs)
            });
        });
        console.log(posts);
        res.status(200).send(posts);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


exports.createPost = async (req, res) => {
    const { creatorId, creator, createdAt, price, tags, title, date, collection} = req.body
    const postsPath = `/uploads/${creator}/${collection}/${title}`
    const newPost = new Post({ creatorId, creator, createdAt, price, tags, title, date, postsPath})
    try {
        newPost.save();
    User.findById(creatorId, (err, user) => {
        if (err) throw err;
        if (!user) return res.status(403)
        user.posts.push(newPost._id)
        user.save()
        res.status(201).json(newPost);
    })
    } catch (error) {
        console.log(error);
        res.status(409).json({ message: error });
    }
}

exports.uploadImage =  (req, res, next) => {
    const dir = "../public/uploads/"
    const form = new formidable.IncomingForm();

    form.parse(req, (err, fields, files) => {
        if (err)  throw err
        const oldPath = files.image.path;
        const newPath = path.join(dir, fields.creator) + `/${fields.collection}/` + files.image.name
        const rawData = fs.readFileSync(oldPath)
        // check if the user directory is created and appends the picture
    try {
        
        if (fs.existsSync(dir + fields.creator + `/${fields.collection}/`)) {
            fs.writeFile(newPath, rawData, function (err) {
                if (err) console.log(err)
                return res.send("Successfully uploaded")
            })
        } else {
            fs.mkdir(dir + fields.creator + `/${fields.collection}/`, { recursive: true }, (err) => {
                if (err) throw err;
                fs.writeFile(newPath, rawData, function (err) {
                    if (err) console.log(err)
                    return res.send("Successfully uploaded")
                })
                console.log("created");
            })
        }
    } catch (error) {
    console.log(error);        
    }

        
        });
        
    // console.log(creatorId, creator, createdAt, price, tags, strigifiedImage );
}

exports.editProfile = async (req, res) => {
    const { username, avatar, email, password, webpage, instagram, facebook, twitter, snapchat, flickr } = req.body
    const hashedPassword = await bcrypt.hash(password, 10);

    const withPassword = {
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
    function hasPassword() {
        if (password.length > 1) {
            return withPassword
        }
        return _.omit(withPassword, ["password"])
    }
    try {

        await User.updateOne({ _id: req.params.id }, hasPassword(), { upsert: true, omitUndefined: true })

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
    const { id, userId } = req.params;
    console.log(req.params);

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    try {
        await Post.findByIdAndRemove(id).then(console.log(`Post with id${id} deleted`));
        const user = await User.findById(userId)
        user.posts.splice(user.posts.indexOf(id), 1)
        await user.save()
    } catch (error) {
    console.log(error);        
    }

    res.json({ message: "Post deleted successfully." });
}

// AUTHENTICATION

exports.getUser = async (req, res) => {
    User.findById(req.body.id, (err, user) => {
        if (err) throw err;
        if (!user) return res.status(403)
        res.json({user: user}) 
    })
}

exports.isAuth = async (req, res) => {
    // Verify the refresh_token
    const authHeader = req.headers.authorization
    const token = authHeader && authHeader.split(' ')[1]
    // Checks if the token exists

    if (token.length > 0) {

            try {
                const verifiedToken = jwt.verify(token, process.env.JWT_REFRESH)
                
                return User.findOne({ username: verifiedToken.username }, (err, user) => {
                    if (err) throw err;
                    // If the token is correct verify if the access_token and refresh token are correct the user is authori
                    jwt.verify(user.accessToken, process.env.JWT_ACCESS, async function (err, dec) {
                        if (dec !== undefined) {
                            const newAccessToken = jwt.sign({ username: user.username }, process.env.JWT_ACCESS, { expiresIn: "12m" })
                            const newRefreshToken = jwt.sign({ username: user.username }, process.env.JWT_REFRESH, { expiresIn: "12m" })
                            user.accessToken = newAccessToken
                        //    only sends the safe info to client by omiting password and accesstoken
                        const omittedUser = _.omit(user.toObject(), ["password", "accessToken"])
                        await user.save()
                            return res.status(202).json({ user: omittedUser, token: newRefreshToken })
                    }
                    console.log("Access Token has expired");
                    user.refreshToken = false
                    user.accessToken = false
                    await user.save()
                    
                    return res.send("Unauthorized")
                })
            });
        } catch (error) {
            res.send(false)
        }
        
    }
}


exports.login = async (req, res) => {

    const {username, password} = req.body

    function handlueLogin(){

        User.findOne({username: username}, async (err, user) => {
                if (err) throw err
                bcrypt.compare(password, user.password, async function (err, response) {
                    if (err) throw err
                    if (response === true && user.username === username ){
                    
                        const accessToken =  jwt.sign({ username: username }, process.env.JWT_ACCESS);
                        const refreshToken =  jwt.sign({ username: username }, process.env.JWT_REFRESH, { expiresIn: "6m" } );
                        
                        user.accessToken = accessToken
                        user.refreshToken = refreshToken 
                        await user.save()
                        console.log(user);
    
                        const omittedUser = _.omit(user.toObject(), ["password", "accessToken"])
    
                        return res.json({ redirectURI: "/dashboard", success: true, user: omittedUser, token: refreshToken });
                    }
                    res.send({ message: "Please, introduce a valid credentials", redirectURI: "/login", ErrorMessage: true });
                });
            })
    }

    handlueLogin()

    } 

exports.signup = async (req, res, next) => {
        const {username, email, password} = req.body;
        const pattern = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/

        function credentialsAreValid() {
            if (!username || !password || !email) {
               return res.json({ message: "All the fields are required", redirectURI: "/signup", ErrorMessage: 1 });
            }
            if (password.length < 8) {
               return res.json({ message: "Password must be longer than 8 characters", redirectURI: "/signup", ErrorMessage: 1 });
            }
            if (!email.match(pattern)) {
                return res.json({ message: "Please, introduce a valid email format", ErrorMessage: 1 });
            } 
            return true
        }

        function handleSignIn(){
            if ( credentialsAreValid() ) {
                User.findOne({ username: username }, async (err, user) => {
                    if (err) throw err;
                    if (user) return res.send({ message: "User Already exists", redirectURI: "/signup", ErrorMessage: 1 });
                    if (!user) {
                        const refreshToken = jwt.sign({ username: username }, process.env.JWT_REFRESH, { expiresIn: "6m" } );
                        const accessToken = jwt.sign({ username: username }, process.env.JWT_ACCESS )

                        console.log(accessToken, refreshToken);
    
                        const hashedPassword = await bcrypt.hash(password, 10);
                        const newUser = new User({
                            username: username,
                            email: email,
                            avatar: "",
                            password: hashedPassword,
                            instagram: "",
                            facebook: "",
                            twitter: "",
                            snapchat: "",
                            flickr: "",
                            accessToken: accessToken,
                            refreshToken: refreshToken
                        });
                        await newUser.save()
    
                        const omittedUser = _.omit(newUser.toObject(), ["password", "accessToken"])
    
                       return res.json({ redirectURI: "/dashboard", success: true, user: omittedUser, token: refreshToken });
    
                    }
                });
            }
        }

        handleSignIn()
} 
exports.logout = async (req, res, next) => {
    try {
        User.findById(req.body.userId, async (err, user) => {
            user.accessToken = false
            user.refreshToken = false
            await user.save()
            return res.status(203).json("logged Out")
        })
    } catch (error) {
        return res.status(409).json(error)
    }
    
} 

exports.test = async (req, res, next) => {
    const form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        var oldPath = files.profilePic.path;
        var newPath = path.join("../public/uploads/posts/", 'MoneySlide')
            + '/' + files.profilePic.name
        var rawData = fs.readFileSync(oldPath)

        fs.writeFile(newPath, rawData, function (err) {
            if (err) console.log(err)
            return res.send("Successfully uploaded")
        })
    }) 
}
