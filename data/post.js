const mongoCollections = require('../MongoDB/mongoCollections')
const post = mongoCollections.post
const objectID = require('mongodb').ObjectID

module.exports = {
    async createPost(title, author, category, content) {
        if (!title || !author || !category || !content) throw "can't create post since incomplete info"

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

    async getAllPost(id) {
        if (!id) throw 'no id'
        if (typeof id == 'string') id = objectID.createFromHexString(id)
        const postCollection = await post()
        const aPost = await postCollection.findOne({ _id: id })
        if (aPost === null) throw 'No post found'
        return aPost
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

        const deleteInfo = await postCollection.removeOne({ _id: id })
        if (deleteInfo.deletedCount == 0) throw "Failed to delete post"
    },

    async updatePost(id, title, category, content) {
        let updatePost = {}
        if (title) newPost.title = title
        if (category) newPost.category = category
        if (content) newPost.content = content
        const postCollection = await post()
        const updateInfo = await postCollection.updateOne({ _id: id }, { $set: updatePost })
        if (updateInfo.modifiedCount == 0) throw "Failed to update post"
    },

    async search(searchText) {

        if (!searchText) throw "provide text to search for"

        const postCollection = await post();

        let searchTxt = String(searchText).split(" ").map(str => "\"" + str + "\"").join(' ');

        await postCollection.createIndex({ title: "text", content: "text" })

        let matches = await postCollection.find({ $text: { $search: searchTxt, $caseSensitive: false } }).toArray();

        let output = [];
        let index = 0;

        if (matches.length == 0) throw "nomatch"


        for (const match of matches) {
            output.push(JSON.stringify(match))
            index++;
        }

        return output;
    }

}