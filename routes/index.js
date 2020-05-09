const path = require('path');
const mainRoutes = require('./main');
const loginRoutes = require('./login');
const newRoutes = require('./new');
const logoutRoutes = require('./logout');
const userRoutes = require('./user');
const signupRoutes = require('./signup')


const constructor = (app) => {
    app.use('/', mainRoutes);
    app.use('/login', loginRoutes);
    app.use('/new', newRoutes);
    app.use('/logout', logoutRoutes);
    app.use('/user', userRoutes);
    app.use('/signup', signupRoutes)
}

module.exports = constructor