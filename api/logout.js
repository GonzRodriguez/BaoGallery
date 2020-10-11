const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    req.session.destroy(function (err) {
        if (!err) {
            req.logout();
            // req.session = null;
            console.log(req.user);
            res.send("Is loged out")
        }
        if (err) {console.log(err)};
    });
})

module.exports = router;
