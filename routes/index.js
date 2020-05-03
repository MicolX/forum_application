const path = require('path')
const mainRoutes = require('./main')

const constructor = (app) => {
    app.use('/', mainRoutes)
}

module.exports = constructor