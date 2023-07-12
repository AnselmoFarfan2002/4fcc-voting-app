const { Router } = require("express")
const PollRoutes = Router()

const PollControllers = require("../controllers/PollController")
const {ensureAuthentication, ensureNonAuthentication} = require("./auth.control")

const controller = new PollControllers

// PollRoutes.route("/a")
// .get( controller.getAll )

PollRoutes.route("/newpoll")
.post( ensureAuthentication, controller.postOne )

PollRoutes.route("/")
.get( controller.getUI )

PollRoutes.route("/polls/own")
.get( controller.getOwn )

// router.route("/vote/:id")
// .post()

// router.route("/delete/:id")
// .post()

module.exports = PollRoutes