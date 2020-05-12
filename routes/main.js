const express = require('express')
const router = express.Router()
const data = require('../data')
const postData = data.post

// check cookie if logged in and not expired, if so render main page if not redirect to login.
router.get('/', async (req, res) => {
    if (req.session.user) { // add checking cookie expiration
        const allPosts = await postData.getAllPost()
        res.render('web', { posts: allPosts })
    }
    else {
        res.status(403);
        res.render('login');
    }
})

router.get('/Automobile', async (req, res) => {
    if (req.session.user) { // add checking cookie expiration

        const allPosts = await postData.getPostByCategory("Automobile")
        res.render('web', { posts: allPosts, category: "Automobile" })
    }
    else {
        res.status(403);
        res.render('login');
    }
})

router.get('/Food', async (req, res) => {
    if (req.session.user) { // add checking cookie expiration

        const allPosts = await postData.getPostByCategory("Food")
        res.render('web', { posts: allPosts, category: "Food" })
    }
    else {
        res.status(403);
        res.render('login');
    }
})

router.get('/Course', async (req, res) => {
    if (req.session.user) { // add checking cookie expiration

        const allPosts = await postData.getPostByCategory("Course")
        res.render('web', { posts: allPosts, category: "Course" })
    }
    else {
        res.status(403);
        res.render('login');
    }
})

router.post('/search', async (req, res) => {

    try {

        if (req.body.searchText.length === 0) {

            res.render('web', { error: [{ err: "BLANK SEARCH INPUT" }] })

        }
        else {
            let matches = await postData.search(req.body.searchText);
            res.render('web', { posts: matches })

        }
    }
    catch (e) {
        if (e === "nomatch") {
            res.render('web', { error: [{ err: "NO MATCHES TRY AGAIN" }] })
        }
        else {
            res.status(404);
            res.send('404 error');
        }
    }
})


module.exports = router