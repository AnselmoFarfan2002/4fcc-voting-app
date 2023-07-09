const { Router } = require("express")
const { ensureAuthentication } = require("./auth.control")
const router = Router()

router.route("/mypolls").get(ensureAuthentication, (req, res) => res.render("pug/pages/mypolls", {session: req.isAuthenticated()}))
router.route("/newpoll").get(ensureAuthentication, (req, res) => res.render("pug/pages/newpoll", {session: req.isAuthenticated()}))
router.route("/share/:id").get((req, res) => res.render("pug/pages/share", {session: req.isAuthenticated()}))

module.exports = router