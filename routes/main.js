const express = require('express')
const router = express.Router()
const data = require('../data')
const postData = data.post

// check cookie if logged in and not expired, if so render main page if not redirect to login.
router.get('/', async (req, res) => {
    if (req.session.user) {
        console.log('going to main page')
        res.render('web')
    }
    else {
        res.status(403);
        console.log('going to login')
        res.render('login');
    }
})

router.get('/search/:searchText', async (req, res) => {

    try {
        let matches = await postData.search(req.params.searchText);
        res.send(matches);
    }
    catch (e) {
        res.send("NO MATCHES")
    }
})


module.exports = router