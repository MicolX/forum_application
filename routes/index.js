

const path = require('path')
const mainRoutes = require('./main')
const loginRoutes = require('./login')
const signupRoutes = require('./signup')

const constructor = (app) => {
    app.use('/', mainRoutes);
    app.use('/login', loginRoutes);
    app.use('/signup', signupRoutes);
}

module.exports = constructor