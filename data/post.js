const mongoCollections = require('../MongoDB/mongoCollections')
const post = mongoCollections.post
const objectID = require('mongodb').ObjectID

module.exports = {
    async createPost(title, author, category, content) {
        if (!title||!author||!category||!content) throw "can't create post since incomplete info"

        const postCollection = await post()

        let newPost = {
            'title': title,
            'author': author,
            'category': category,
            'content': content
        }

        const insertInfo = await postCollection.insertOne(newPost)
        if (insertInfo.insertedCount == 0) throw "Failed to create post into db"
    },

    async getAllPost() {
        const postCollection = await post()
        const allPosts = await postCollection.find({}).toArray()
        return allPosts
    },

    async deletePost(id) {
        if (!id) throw 'no id input'
        if (typeof id == 'string') id = objectID.createFromHexString(id)

        const postCollection = await post()

        const deleteInfo = await postCollection.removeOne({_id: id})
        if (deleteInfo.deletedCount == 0) throw "Failed to delete post"
    }
}