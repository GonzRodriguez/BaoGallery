const express = require("express");
const router = express.Router();
const User = require("../models/users")


router.get("/", (req, res) => {
    if (req.isAuthenticated()){
        User.findOne(req.user, (err, user)=>{
            if (err) throw  err;
            res.send({auth: req.isAuthenticated(), user: user})
        })
    } else {
        res.send(false)
    }
})

module.exports = router;