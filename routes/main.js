const express = require('express')
const router = express.Router()

// check cookie if logged in and not expired, if so render main page if not redirect to login.
router.get('/', async (req, res) => {
    if (req.session.user) { // add checking cookie expiration
        res.render('web')
    }
    else {
        res.status(403);
        res.render('login');
    }
})

module.exports = router