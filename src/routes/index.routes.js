const express = require("express")

const app = express()

app.use( require('./interfaces') )

module.exports = app