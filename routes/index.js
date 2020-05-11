const path = require('path');
const mainRoutes = require('./main');
const loginRoutes = require('./login');
const newRoutes = require('./new');
const logoutRoutes = require('./logout');
const userRoutes = require('./user');
const signupRoutes = require('./signup');
const autoRoutes = require('./automobile');
const autoPostsRoutes = require('./allPostOfAutomobile');
const postRoutes = require('./post')




const constructor = (app) => {
    app.use('/', mainRoutes);
    app.use('/login', loginRoutes);
    app.use('/new', newRoutes);
    app.use('/logout', logoutRoutes);
    app.use('/user', userRoutes);
    app.use('/signup', signupRoutes);
    app.use('/post', postRoutes)
    app.use('/automobile', autoRoutes);
    app.use('/allPostOfAutomobile', autoPostsRoutes);
    app.use('*', (req, res) => {
        res.sendStatus(404)
    })
    
}

module.exports = constructor