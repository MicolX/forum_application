const express = require('express')
const router = express.Router()
const data = require('../data')
const postData = data.post

// check cookie if logged in and not expired, if so render main page if not redirect to login.
router.get('/', async (req, res) => {
    if (req.session.user) { // add checking cookie expiration
        const allPosts = await postData.getAllPost()
        res.render('web', {posts: allPosts})
    }
    else {
        res.status(403);
        res.render('login');
    }
})

router.get('/car')

router.get('/food')

module.exports = router