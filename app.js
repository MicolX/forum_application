const express = require('express')
const app = express()
const configRoutes = require('./routes')
const handlebars = require('express-handlebars')

app.use(express.json())
app.use(express.urlencoded({ extended: true}))

app.engine('handlebars', handlebars({ defaultLayout: 'template'}))
app.set('view engine', 'handlebars')


//cookies
app.use(
	session({
		name: 'AuthCookie',
		secret: "this is secret",
		saveUninitialized: true,
		resave: false
	})
);

// blocking methods on mainpage
app.use('/', async (req, res, next) => {

    if(req.method == 'GET'){ 
        next();
    }
    else{
        res.status(404);
        res.send('METHOD NOT ALLOWED')
    }
});

// activity logging middleware
app.use(async (req, res, next) => {

	let outputMessage = "";
	let authMessage = "not-authenticated";

	if (req.session.user) { authMessage = "authenticated" }

	outputMessage = new Date().toUTCString() + " | " + req.method + " | " + req.originalUrl + " | " + authMessage;

	console.log(outputMessage);
	next();
});


configRoutes(app)

app.listen(3000, () => {
    console.log("Forum is online!")
})