const { UserValidation, UserModel } = require("../models/User.model");
const printFail = require("./printFail");
const bcrypt = require("bcrypt")

function encrypt (word, rounds = 10) {
    return bcrypt.hash(word, rounds)
}

class User {
    constructor (name) {
        if (name && !UserValidation({ name, password: "baitText" }))
            printFail(UserValidation)
        else this.name = name
    }

    async setPassword (password) {
        try {
            const hash = await encrypt(password)
            this.password = hash
        } catch (error) {
            this.password = undefined
            throw new Error("An error ocurred during encrypting password")
        }
    }

    save (cb) {
        if (this.id) throw new Error("This object had been alrady saved")
        else if ( UserValidation(this) ) {
            let newUser = new UserModel(this)
            this.id = newUser._id

            newUser.save()
            .then( user => cb(null, true) )
            .catch( err => cb(err) )
        } else printFail(UserValidation)
    }

    login (passwordAttempt, cb) {
        const { password } = this
        bcrypt.compare(passwordAttempt, password, (err, res) => {
            if (err) return cb(err)
            cb(null, res)
        })
    }

    load (username, cb) {
        UserModel.findOne({ name: username })
        .then( user => {
            if (user) {
                const { name, password, _id } = user
                this.name = name
                this.password = password
                this.id = _id

                cb(null, true)
            } else cb(null, false)
        }).catch( cb )
    }
}

module.exports = User