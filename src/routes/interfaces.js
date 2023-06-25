const { Router } = require("express")
const router = Router()

router.route("/login").get((req, res) => res.render("pug/pages/login"))
router.route("/signup").get((req, res) => res.render("pug/pages/signup"))
router.route("/mypolls").get((req, res) => res.render("pug/pages/mypolls"))
router.route("/newpoll").get((req, res) => res.render("pug/pages/newpoll"))
router.route("/share/:id").get((req, res) => res.render("pug/pages/share"))

module.exports = router