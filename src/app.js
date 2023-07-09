//environment variables
require("dotenv").config()

//libraries
const express = require("express")
const pug = require("pug")
const morgan = require("morgan")
const bodyParser = require("body-parser")

//import settings
require("../config/db.conf").then(function(){ console.log("dbConnected 🌎") })
const { passport, session } = require("../config/auth.conf")
const routes = require("./routes/index.routes")

//mount the server
const app = express()

//settings
app.set("view engine", "pug")
app.set("PORT", process.env.APP_PORT || 80)

//middlewares
app.use( bodyParser.urlencoded({ extended: false }) )
app.use( express.json() )
app.use( morgan("dev") )
app.use( session )
app.use( passport.initialize() )
app.use( passport.session() )
app.use( express.static("views") )
app.use( routes )

//starting the server
app.listen( app.get("PORT"), err => {
    if(err) console.log("pipipi, the server can't work")
    else console.log("We're on fire! 🔥")
})