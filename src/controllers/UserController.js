const Controller = require("./Controller")
const User = require("../classes/User")

class UserController extends Controller {
    signUpOne (req, res) {
        const { username, password1, password2 } = req.body
        if (password1 === password2) {
            let user = new User()
            user.load(username, (err, exists) => {
                if (err) return res.render("pug/pages/signup", {message: "An error occurred during registration"})
                if (exists) return res.render("pug/pages/signup", {message: "This user already exists"})
                
                user.name = username
                
                user.setPassword(password1)
                .then( () => {
                    user.save((err) => {
                        if (err) return res.render("pug/pages/signup", {message: "An error occurred during registration"})
                        req.login(user, (err) => res.redirect("/mypolls"))
                    })
                })
            })

        } else return res.render("pug/pages/signup", {message: "Passwords must match"})
    }

    logOut (req, res) {
        req.session.destroy()
        res.redirect("/")
    }
}

module.exports = UserController