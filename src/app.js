require('dotenv').config()

const express = require('express')
const pug = require('pug')
const morgan = require('morgan')
const bodyParser = require('body-parser')

require('../config/db.conf').then(function(){ console.log("dbConnected 🌎") })

const app = express()

app.set("view engine", "pug")
app.set("PORT", process.env.APP_PORT || 80)

app.use( bodyParser.urlencoded({extended: false}) )
app.use( express.json() )
app.use( morgan("dev") )
app.use( express.static("views") )
app.use( '/', require('./routes/index.routes') )

app.listen( app.get("PORT"), err => {
    if(err) console.log("pipipi, the server can't work")
    else console.log("We're on fire! 🔥")
})