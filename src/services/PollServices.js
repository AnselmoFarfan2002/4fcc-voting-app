const Service = require("./Service");
const { PollModel } = require("../models/Poll.model")

class PollServices extends Service {
    getAll(cb) {
        PollModel.find()
        .then( cb )
        .catch( err => console.log(err) )
    }

    getPollsOf(username, cb) {
        PollModel.find({author: username}).select("_id question options author")
        .then( docs => cb(null, docs) )
        .catch( err => cb(err) )
    }
}

module.exports = PollServices