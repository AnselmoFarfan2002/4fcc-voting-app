const { Router } = require("express")
const { ensureNonAuthentication } = require("./auth.control")
const { passport } = require("../../config/auth.conf")

const router = Router()

const routes2reedirect = {
    successRedirect: '/mypolls',
    failureRedirect: '/login',
}

const UserController = require("../controllers/UserController")
const controller = new UserController

router.route("/login")
.get(ensureNonAuthentication, (req, res) => res.render("pug/pages/login", {session: req.isAuthenticated()}))
.post(ensureNonAuthentication, passport.authenticate('local', routes2reedirect))

router.route("/signup")
.get(ensureNonAuthentication, (req, res) => res.render("pug/pages/signup", {session: req.isAuthenticated()}))
.post(ensureNonAuthentication, controller.signUpOne)

module.exports = router