var express = require("express");
var router = express.Router();

router.get("/", function(req, res) {
    res.json({message: "Connected to server"})
});

router.post('/',   (req, res) => {
console.log(req.body);
});

module.exports = router;