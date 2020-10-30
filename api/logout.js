const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    req.session.destroy(function (err) {
        if (!err) {
            req.logout();
            res.send({message: "logded out", auth: false})
        }
        if (err) {console.log(err)};
    });
})

module.exports = router;
