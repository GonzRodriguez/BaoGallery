const express = require("express");

const { fetchPost,  fetchPosts, fetchProfile, search, createPost, uploadImage, editProfile,
        updatePost, deletePost, login, signup, logout, isAuth, test, getUser } = require("../controllers/api")

const router = express.Router();

router.post('/edit-profile/:id', editProfile);
router.get('/get-user/:username', getUser);
router.post('/create-post', createPost);
router.post('/upload-image', uploadImage);
router.get('/post/:postId', fetchPost);
router.get('/posts/:key/:entry', fetchPosts);
router.get('/search/:query', search);
router.get('/posts/:profile', fetchProfile);
router.patch('/update-post/:id', updatePost);
router.delete('/delete-post/:id/:userId', deletePost);
router.post('/login', login);
router.post('/is-auth', isAuth);
router.post('/logout', logout);
router.post('/signup', signup);

module.exports = router;