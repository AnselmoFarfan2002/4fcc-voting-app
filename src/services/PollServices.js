const Service = require("./Service");
const { PollModel } = require("../models/Poll.model")

class PollServices extends Service {
    getAll(callback) {
        PollModel.find()
        .then( callback )
        .catch( err => console.log(err) )
    }
}

module.exports = PollServices