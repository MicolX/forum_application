const express = require('express');
const router = express.Router();

// render create post page only if logged in (check cookie), if not logged in redirect to login
router.get('/', async (req, res) => {
	if (req.session.user) { // add checking cookie expiration
        res.render('createPost')
    }
    else {
        res.status(403);
        res.render('login');
    }
});


// create post page only if logged in (check cookie), if not logged in redirect to login
router.post('/', (req, res) => {

});


module.exports = router;