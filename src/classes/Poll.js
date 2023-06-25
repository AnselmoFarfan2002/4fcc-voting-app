const { PollModel, PollValidation } = require("../models/Poll.model")
const printFail = require("./showErrors,js")

class Poll {
    constructor(author, question, options){
        if ( question ) {
            if ( PollValidation({ question, options, author }) ) {
                this.question = question
                this.options = options
                this.author = author
            } else printFail(PollValidation)
        } else {
            this.question = question
            this.options = options
        }
    }

    vote(value){
        const { options } = this
        options = options.filter(op => op.value === value)

        if( options.length ) 
            options[0].votes += 1
        else 
            options.push({value, votes: 1})
    }

    save(callback){
        if( this.id ) this.update(callback) 
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
}

module.exports = Poll