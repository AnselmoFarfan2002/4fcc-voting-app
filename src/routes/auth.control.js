function ensureAuthentication(req, res, next) {
    if (req.isAuthenticated()) return next()
    res.redirect('/login')
}

function ensureNonAuthentication(req, res, next) {
    if (!req.isAuthenticated()) return next()
    res.redirect('/')
}

module.exports = {
    ensureAuthentication,
    ensureNonAuthentication
}