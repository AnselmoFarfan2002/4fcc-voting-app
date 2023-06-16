const { DB_URI } = process.env

const DB_OPTIONS = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

const dbConnection = require('mongoose').connect(DB_URI, DB_OPTIONS)

module.exports = dbConnection
