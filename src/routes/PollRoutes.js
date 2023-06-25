const { Router } = require("express")
const PollRoutes = Router()

const PollControllers = require("../controllers/PollController")
const controller = new PollControllers

// PollRoutes.route("/a")
// .get( controller.getAll )

PollRoutes.route("/newpoll")
.post( controller.postOne )

PollRoutes.route("/")
.get( controller.getUI )

// router.route("/vote/:id")
// .post()

// router.route("/delete/:id")
// .post()

module.exports = PollRoutes