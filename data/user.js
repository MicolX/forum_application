const mongoCollections = require('../MongoDB/mongoCollections')
const user = mongoCollections.user
const objectID = require('mongodb').ObjectID

module.exports = {
    async addUser(username, password, firstName, lastName, Email) {
        if (!username || !password || !firstName || !lastName) throw 'Incomplete info to add an user'
        let newUser = {
            username: username,
            password: password,
            firstName: firstName,
            lastName: lastName
        }
        if (Email) newUser.email = Email
        const userCollection = await user()
        const insertInfo = await userCollection.insertOne(newUser)
        if (insertInfo.insertedCount == 0) throw 'Failed to add an user'
    },

    async updatePassword(id, password) {
        if (!id || !password) throw 'Missing id or password'
        const userCollection = await user()
        const updateInfo = await userCollection.updateOne({_id: id}, {password: password})
        if (updateInfo.modifiedCount == 0) throw "Failed to update password"
    },

    async updateUser(id, Email) {
        if (!id || !Email) throw 'Missing id or email'
        const userCollection = await user()
        const updateInfo = await userCollection.updateOne({_id: id}, {email: Email})
        if (updateInfo.modifiedCount == 0) throw "Failed to update user data"
    }
}