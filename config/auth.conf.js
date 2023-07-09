const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../src/classes/User')

const session = require("express-session")
const MongoDBStore = require('connect-mongodb-session')(session)

passport.use(new LocalStrategy({
    usernameField: "username",
    passwordField: "password"
}, (username, password, done) => {
    let user = new User
    
    user.load(username, (err, res) => {
        if (err) return done(err)
        if (!res) return done(null, false, { message: 'User not found' })

        user.login(password, (err, res) => {
            if (err) return done(err)
            if (res === false) return done(null, false, { message: 'Wrong passport' })
    
            done(null, user)
        })
    })
}))

passport.serializeUser((user, done) => done(null, user.name))

// pass directly the err, if exists: it'd be an error, if not: it'd be null
passport.deserializeUser((username, done) => {
    let user = new User
    user.load(username, (err) => done(err, user) )  
})

const store = new MongoDBStore({
    uri: process.env.DB_URI,
    collection: 'sessions'
});

const sessionConfig = {
    secret: process.env.SECRET_SESSION,
    resave: false,
    store,
    saveUninitialized: false
}

module.exports = { passport, session: session(sessionConfig) }