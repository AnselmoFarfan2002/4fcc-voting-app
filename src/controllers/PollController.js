const Controller = require("./Controller")
const Poll = require("../classes/Poll")
const PollServices = require("../services/PollServices")

class PollController extends Controller {
    getAll(req, res) {
        let service = new PollServices
        service.getAll( res.send.bind(res) )
    }
    
    postOne(req, res){
        let { newoptions, newquestion } = req.body

        newoptions = newoptions.split(",").map( op => ({
            value: op,
            votes: 0,
        }))

        let newPoll = new Poll("mrTilin", newquestion, newoptions)

        const redirect = () => res.redirect("/mypolls")
        // newPoll.save( res.send.bind(res) )
        newPoll.save(redirect)
    }

    getUI(req, res) {
        console.log(req.session)
        let service = new PollServices
        service.getAll( polls => res.render("pug/pages/home", { polls, session: req.isAuthenticated() }) )
    }
}

module.exports = PollController