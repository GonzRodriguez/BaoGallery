const express = require("express");
const { dashboard, getPost, createPost, editProfile, tryProfile, updatePost, deletePost, login, signup, logout, reqUser } = require("../controllers/api")

const router = express.Router();

router.get('/dashboard', dashboard);
router.get('/req-user', reqUser);
router.post('/edit-profile', editProfile);
router.post('/try-profile/:id', tryProfile);
router.post('/create-post', createPost);
router.get('/get-post/:id', getPost);
router.patch('/update-post/:id', updatePost);
router.delete('/delete-post/:id', deletePost);
router.post('/login', login);
// router.get('/login', getLogin);
router.post('/logout', logout);
router.post('/signup', signup);

module.exports = router;