const path = require('path')
const mainRoutes = require('./main')
<<<<<<< Updated upstream

const constructor = (app) => {
    app.use('/', mainRoutes)
=======
const loginRoutes = require('./login')
const signupRoutes = require('./signup')
const autoRoutes = require('./automobile')


const constructor = (app) => {
    app.use('/', mainRoutes);
    app.use('/login', loginRoutes);
    app.use('/signup', signupRoutes);
    app.use('/automobile', autoRoutes);
>>>>>>> Stashed changes
}

module.exports = constructor