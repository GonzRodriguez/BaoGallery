
const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const fs = require("fs"); 
const path = require("path")
const Client = require("../models/client.js");
const User = require("../models/users.js")
const Post = require("../models/post.js")
const formidable = require("formidable");
const jwt = require("jsonwebtoken");
const _ = require("lodash");

// POSTS

exports.fetchPost = async (req, res) => {
    const { postId } = req.params;

    try {
        const post = await Post.findById(postId);

        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

exports.fetchProfile = async (req, res) => {
    const { profile } = req.params;
    try {
        const posts = await Post.find({creator: profile});
        res.status(200).send(posts);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

exports.fetchPosts = async (req, res) => {
    const { collection, query } = req.body
    console.log(req.body);

    try {
        switch (collection) {
            case "profile":
                const posts = await Post.find({creator: query.replace("-", " ")});
                res.status(200).send(posts);
                break;
            case "tags":
                const tags = await Post.find({ tags: query.replace("-", " ") });
                res.status(200).send(tags);
                break;
            case "collection":
                const collection = await Post.find({ imgCollection: query.replace("-", " ") });
                res.status(200).send(collection);
                break;
            default:
                res.status(404).json({ message: "Something went wrong" });
        }
    }
     catch (error) {
        res.status(404).json({ message: error.message });
    }
}
exports.search = async (req, res) => {
    console.log(req.params.query);
    try {
        const posts = await Post.aggregate([
               {
                $search: {
                    "index": "default",
                    "compound": {
                        "should": [
                            { "autocomplete": { "query": req.params.query, "path": "creator", "fuzzy": { "maxEdits": 2, "prefixLength": 1, "maxExpansions": 256 } } },
                            { "autocomplete": { "query": req.params.query, "path": "imgCollection", "fuzzy": { "maxEdits": 2, "prefixLength": 1, "maxExpansions": 256 } } },
                            { "text": { "query": req.params.query, "path": "tags", "fuzzy": { "maxEdits": 2, "prefixLength": 1, "maxExpansions": 256 } } }
                            
                        ],
                        
                        minimumShouldMatch: 0 // if one clause fails, still get documents back
                        
                    }
                }
                },
            {
                $project: {
                    "_id": 0,
                    "creator": 1,
                    "tags": 1,
                    "imgCollection": 1
                }
            }
            ])
            console.log(95, posts);
        res.status(200).json(posts);
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: error.message });
    }
}


exports.createPost = async (req, res) => {
    const { creatorId, creator, createdAt, price, tags, title, date, imgCollection, client} = req.body
    console.log(req.body);
    const postsPath = `/uploads/${creator}/${imgCollection}/${title}`
    const newPost = new Post({ creatorId, creator, createdAt, title, price: price.value, tags: tags.value, date, postsPath, imgCollection, client })
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
    const dir = path.join(__dirname, "../../client/build/uploads/")
    const form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {
        if (err) console.log(err.message)
        console.log(fields);
        const oldPath = files.image.path;
        const newPath = path.join(dir, fields.creator) + `/${fields.collection}/` + files.image.name
        const rawData = fs.readFileSync(oldPath)
        // check if the user directory is created and appends the picture
    try {
        
        if (fs.existsSync(dir + fields.creator + `/${fields.collection}/`)) {
            fs.writeFile(newPath, rawData, function (err) {
                if (err) console.log(err)
                console.log(`uploaded in ${newPath}` );
                return res.send("Successfully uploaded")
            })
        } else {
            fs.mkdir(dir + fields.creator + `/${fields.collection}/`, { recursive: true }, (err) => {
                if (err) throw err;
                fs.writeFile(newPath, rawData, function (err) {
                    if (err) console.log(err)
                    console.log(`uploaded in ${newPath}`);
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
    const { username, avatar, email, password, webpage, instagram, facebook, twitter, snapchat, flickr, bio } = req.body
    const hashedPassword = await bcrypt.hash(password, 10);

    const updatedUser = {
        username: username,
        avatar: avatar,
        email: email,
        bio: bio,
        webpage: webpage,
        password: password ? hashedPassword : undefined,
        socialMediaAccounts: {
        instagram: instagram,
        facebook: facebook,
            twitter: twitter,
            snapchat: snapchat,
            flickr: flickr
        }
    }

    try {

        await User.findOneAndUpdate({ _id: req.params.id }, updatedUser, {upsert: true, omitUndefined: true })
        console.log("updatedUser", updatedUser, "password", password);
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
    const { username } = req.params;
    try {
        const user = await User.find({ username: username });
        const omittedUser = _.omit(user[0], ["password", "accessToken", "refreshToken"])
        // console.log(typeof user[0]);
        res.status(200).json(omittedUser);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
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
                        const omittedUser = _.omit(user.toObject(), ["password", "accessToken", "avatar"])
                        console.log(omittedUser);
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
    console.log(req.body)

    function handleLogin(){

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
    
                        const omittedUser = _.omit(user.toObject(), ["password", "accessToken"])
    
                        return res.json({ redirectURI: "/dashboard", success: true, user: omittedUser, token: refreshToken });
                    }
                    res.send({ message: "Please, introduce a valid credentials", redirectURI: "/login", ErrorMessage: true });
                });
            })
    }

    handleLogin()

    } 

exports.signup = async (req, res) => {
        const {username, email, password} = req.body;

        function handleSignIn(){
                User.findOne({ username: username }, async (err, user) => {
                    if (err) throw err;
                    if (user) return res.send({ message: "User Already exists", redirectURI: "/signup", ErrorMessage: 1 });
                    if (!user) {
                        const refreshToken = jwt.sign({ username: username }, process.env.JWT_REFRESH, { expiresIn: "6m" } );
                        const accessToken = jwt.sign({ username: username }, process.env.JWT_ACCESS )
    
                        const hashedPassword = await bcrypt.hash(password, 10);
                        const newUser = new User({
                            username: username,
                            email: email,
                            avatar: "",
                            password: hashedPassword,
                            socialMediaAccounts: {
                                instagram: "",
                                facebook: "",
                                twitter: "",
                                snapchat: "",
                                flickr: ""
                            },
                            accessToken: accessToken,
                            refreshToken: refreshToken
                        });
                        await newUser.save()
    
                        const omittedUser = _.omit(newUser.toObject(), ["password", "accessToken"])
    
                       return res.json({ redirectURI: "/dashboard", success: true, user: omittedUser, token: refreshToken });
    
                    }
                });
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

exports.createClient = async (req, res) => {
    const { email, name, keywords, notes, _id: creatorId} = req.body;
    console.log("the body ", req.body);
    try {
        const newClient = new Client({ email, name, keywords, notes, creatorId })
        await newClient.save()
        User.findById(creatorId, (err, user) => {
            if (err) throw err;
            if (!user) return res.status(403)
        user.clients.push(newClient._id)
        user.save()
        console.log(newClient);
        return res.status(201).send("Added contact details to your dashboard");
    })
    } catch (error) {
        return res.status(401).send("Couldn't create the user")
    }
}
exports.getClientList = async (req, res) => {
    const {_id} = req.body;
    User.findById({_id: _id}).populate("clients").exec((err, user) => {
        if (err) throw err;
        return res.status(200).json(user.clients)
    })
}
exports.deleteClientFromList = async (req, res) => {
    const { client_id, user_id } = req.body
    console.log(req.body);
    try {
        if (!mongoose.Types.ObjectId.isValid(client_id)) return res.status(404).send(`No client with id: ${client_id} or user wiht id ${user_id}, ${req.body}`);
        await Client.findByIdAndRemove(client_id).then(res.status(202).send(`Post with id${client_id} deleted`));
        const user = await User.findById(user_id)
        user.clients.splice(user.posts.indexOf(client_id), 1)
        await user.save()
    } catch (error) {
        console.log(error);
    }
}
exports.updateClient = async (req, res) => {

}