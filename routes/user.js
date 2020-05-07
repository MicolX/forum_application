const express = require('express');
const router = express.Router();


// create user, if error render page with error message
router.post('/', (req, res) => {

});


// retrieve user data and render page only if logged in (check cookie), if not logged in redirect to login
router.get('/', async (req, res) => {
    if (req.session.user) { // add checking cookie expiration
        // get user data and render a page with it
        res.render('web')
    }
    else {
        res.render('login');
    }
});

module.exports = router;