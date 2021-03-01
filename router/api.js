const express = require("express");

const { fetchPost, fetchPosts, createPost, uploadImage, editProfile, updatePost, deletePost, login, signup, logout, isAuth, test, getUser } = require("../controllers/api")

const router = express.Router();

// router.get('/dashboard', dashboard);
router.post('/edit-profile/:id', editProfile);
router.get('/get-user/:username', getUser);
router.post('/create-post', createPost);
router.post('/upload-image', uploadImage);
router.get('/post/:postId', fetchPost);
router.get('/posts/:profile', fetchPosts);
router.patch('/update-post/:id', updatePost);
router.delete('/delete-post/:id/:userId', deletePost);
router.post('/login', login);
router.post('/test', test);
router.post('/is-auth', isAuth);
// router.get('/login', getLogin);
router.post('/logout', logout);
router.post('/signup', signup);

module.exports = router;