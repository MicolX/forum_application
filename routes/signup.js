const express = require('express')
const router = express.Router()
const data = require('../data')
const userData = data.user
const bcrypt = require('bcryptjs')
const xss = require('xss')

router.get('/', async (req, res) => {

    if (req.session.user) { // add checking cookie expiration
        res.redirect('/')
    }
    else {
        res.status(403);
        res.render('signup')
    };
    
})

router.post('/', async (req, res) => {
    // get the body of the request
    let body = req.body

    // check if information in the body is complete
    if (!body.username || !body.email || !body.password || !body.password2) throw 'Incomplete info to create new user'

    // check password consistency
    if (body.password!=body.password2) throw "two passwords are not identical"

    try {
        // check duplicate username
        if (await userData.getUser(xss(body.username))) {
            res.render('signup', {duplicate: 'This username has already been taken.'})
            return
        }

        // check duplicate email
        if (await userData.checkEmail(xss(body.email))) {
            res.render('signup', {duplicate: 'This E-mail has already been used.'})
            return
        }

        // hash password, salt_rounds = 5
        let passwordHashed = await bcrypt.hash(body.password, 5)

        // create a new user in db
        let result = await userData.addUser(xss(body.username), xss(passwordHashed), xss(body.email))
        if (result) {
            res.redirect('/login')
        } else {
            throw 'Failed to create new user in db'
        }
    } catch(e) {
        throw e
    }
})

module.exports = router