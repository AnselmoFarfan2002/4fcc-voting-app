const Controller = require("./Controller")
const User = require("../classes/User")

class UserController extends Controller {
    signUpOne (req, res) {
        const { username, password1, password2 } = req.body
        if (password1 === password2) {
            let user = new User(username)

            user.setPassword(password1)
            .then( () => {
                user.save((err) => {
                    if (err) return res.render("pug/pages/signup", {message: "An error occurred during registration"})
                    res.redirect("/mypolls")
                })
            })
        }
    }
}

module.exports = UserController