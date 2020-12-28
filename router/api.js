const express = require("express");
const { dashboard, getPost, createPost, editProfile, updatePost, deletePost, login, signup, logout, reqUser, test } = require("../controllers/api")

const router = express.Router();

router.get('/dashboard', dashboard);
router.get('/req-user', reqUser);
router.post('/edit-profile/:id', editProfile);
router.post('/create-post', createPost);
router.get('/get-post/:id', getPost);
router.patch('/update-post/:id', updatePost);
router.delete('/delete-post/:id', deletePost);
router.post('/login', login);
router.get('/test', test);
// router.get('/login', getLogin);
router.post('/logout', logout);
router.post('/signup', signup);

module.exports = router;