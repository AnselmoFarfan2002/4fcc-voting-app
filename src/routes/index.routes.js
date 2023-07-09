const express = require("express")
const app = express()

app.use( "/", require("./graphicalUserInterfaces") )
app.use( "/", require("./UserRoutes") )
app.use( "/", require("./PollRoutes") )

module.exports = app