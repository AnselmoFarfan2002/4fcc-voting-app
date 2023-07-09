const { PollModel, PollValidation } = require("../models/Poll.model")
const printFail = require("./printFail")

class Poll {
    constructor(author, question, options){
        if ( author && !PollValidation({ question, options, author }) ) 
            printFail(PollValidation)
        else {
            this.question = question
            this.options = options
            this.author = author
        }
    }

    vote(value){
        let { options } = this
        let numberOp;
        
        option = options.find((op, index) => { 
            let band = op.value === value
            if (band) numberOp = index
            return band
        })

        if( option !== undefined ) 
            this.options[numberOp].votes += 1
        else 
            this.options.push({value, votes: 1})
    }

    save(callback){
        if (this.id) throw new Error("This object had been alrady saved")
        else if ( PollValidation(this) ) {
            let newPoll = new PollModel( this )
            this.id = newPoll._id

            newPoll.save()
            .then( callback )
            .catch( err => {
                console.log(err)
                return 0    
            })
        } else printFail(PollValidation)
    }

    load(id, callback){
        Poll.findOne({ _id: id })
        .then(poll => {
            const { _id, question, options, author } = poll
            this.id = _id
            this.question = question
            this.options = options
            this.author = author

            if(typeof callback === "function") callback()
        })
        .catch(err => { throw new Error("The specified object cannot be loaded") })
    }
}

module.exports = Poll