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

        let newPoll = new Poll(req.session.passport.user, newquestion, newoptions)

        const redirect = () => res.redirect("/mypolls")
        // newPoll.save( res.send.bind(res) )
        newPoll.save(redirect)
    }

    getUI(req, res) {
        let service = new PollServices
        service.getAll( polls => res.render("pug/pages/home", {
            polls,
            session: req.isAuthenticated() 
        }))
    }

    getOwn(req, res) {
        let service = new PollServices
        service.getPollsOf(req.session.passport.user, (err, polls) => {
            if(err) {
                console.log(err)
                return res.send({msg: "service not avaible"})
            }

            res.send(super._makeListResources(polls))
        })
    }
}

module.exports = PollController