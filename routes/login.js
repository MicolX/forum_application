const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const data = require('../data')
const userData = data.user


// check cookie if already logged in, if so redirect to /, if not compare input password with password in the database, if successful create cookie with expire date an redirect to / . if not render page with error.
router.post('/', async (req, res) => {
	const body = req.body

	if (!body.username || !body.password) throw 'Incomplete info to log in'

	try {
		const user = await userData.getUser(body.username)

		// username doesn't exist
		if (!user) {
			res.render('login', {fail: true})
			return
		}

		const match = await bcrypt.compare(body.password, user.password)

		if (!match) {
			res.render('login', {fail: true})
			return
		}

		req.session.user = body.username
		res.redirect('/')

	} catch(e) {
		throw e
	}


	// let databasePass = "";
	// let databaseIndex;

	// let match = false;

	// for (const [index, user] of userData.entries()) {
	// 	if (user.username === username) {
	// 		databasePass = user.hashedPassword;
	// 		databaseIndex = index;
	// 		match = bcrypt.compareSync(password, databasePass);
	// 	};
	// }

	// if (match == true) {
	// 	req.session.user = { username: username, dbIndex: databaseIndex };
	// 	res.redirect('/private');
	// }

	// if (match == false) {
	// 	res.status(401);
	// 	res.render('pages/login_err');
	// }

});


// check cookie if already logged in, if so redirect to /, if not render /login
router.get('/', async (req, res) => {
	if (req.session.user) { // add checking cookie expiration
        res.redirect('/')
    }
    else {
        res.status(403);
        res.render('login');
    };
});

module.exports = router;
