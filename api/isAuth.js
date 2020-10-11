const express = require("express");
const router = express.Router();


router.get("/", (req, res) => {

    // const user = req.user
    // const session = req.session
    // req.isAuthenticated() ? res.json({ auth: true, user: user, session: session }) : req.session.destroy(() => { res.send({ auth: false })});
    // // if (session) {console.log("session ID " + session.id, "El Juser es " + user, session)}
    console.log("linea 11 the isAuth.js " + req.isAuthenticated());

    res.send(req.isAuthenticated()) 
})

module.exports = router;