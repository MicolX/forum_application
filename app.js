<<<<<<< Updated upstream
const express = require('express')
const app = express()
// const static = express.static(__dirname + '/public')
=======


const express = require('express');
const app = express();
const static = express.static(__dirname + '/public');
>>>>>>> Stashed changes

const configRoutes = require('./routes')
const handlebars = require('express-handlebars')

// app.use('/public', static)
app.use(express.json())
app.use(express.urlencoded({ extended: true}))

app.engine('handlebars', handlebars({ defaultLayout: 'template'}))
app.set('view engine', 'handlebars')

configRoutes(app)

app.listen(3000, () => {
    console.log("Forum is online!")
})