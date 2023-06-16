const { Router } = require("express")
const router = Router();

router.route('/').get((req, res) => res.render('pug/pages/home'))
router.route('/login').get((req, res) => res.render('pug/pages/login'))
router.route('/signup').get((req, res) => res.render('pug/pages/signup'))

module.exports = router;