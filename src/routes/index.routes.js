const express = require("express")
const app = express()

app.use( require("./interfaces") )
app.use( require("./PollRoutes") )

module.exports = app