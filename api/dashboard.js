const express = require("express");
const router = express.Router();


router.get("/", (req, res) => {
    req.isAuthenticated ? console.log("authenticated") : console.log("not authenticated");;

    console.log("Es user " + req.user);
    res.send(req.user)

    console.log(req.session);

    // Cookies that have not been signed
    console.log('Cookies: ', req.cookies)
    // Cookies that have been signed
    console.log('Signed Cookies: ', req.signedCookies)
})

module.exports = router;
