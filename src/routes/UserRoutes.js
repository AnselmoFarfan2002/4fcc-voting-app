const { Router } = require("express")
const { ensureNonAuthentication, ensureAuthentication } = require("./auth.control")
const { passport } = require("../../config/auth.conf")

const UserRoutes = Router()

const routes2reedirect = {
    successRedirect: '/mypolls',
    failureRedirect: '/login',
}

const UserController = require("../controllers/UserController")
const controller = new UserController

UserRoutes.route("/login")
.get(ensureNonAuthentication, (req, res) => res.render("pug/pages/login", {session: req.isAuthenticated()}))
.post(ensureNonAuthentication, passport.authenticate('local', routes2reedirect))

UserRoutes.route("/signup")
.get(ensureNonAuthentication, (req, res) => res.render("pug/pages/signup", {session: req.isAuthenticated()}))
.post(ensureNonAuthentication, controller.signUpOne)

UserRoutes.route("/logout")
.get(ensureAuthentication, controller.logOut)

module.exports = UserRoutes