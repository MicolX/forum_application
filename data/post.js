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
            'content': content,
            'comments': [], 
            'like': [],
            'dislike': []
        }

        const insertInfo = await postCollection.insertOne(newPost)
        if (insertInfo.insertedCount == 0) throw "Failed to create post into db"
        return await this.getPost(insertInfo.insertedId)
    },

    async getPost(id) {
        if (!id) throw 'no id'
        if (typeof id == 'string') id = objectID.createFromHexString(id)
        const postCollection = await post()
        const aPost = await postCollection.findOne({_id: id})
        if (aPost === null) throw 'No post found'
        return aPost
    },

    async getPostByCategory(category) {
        console.log(category)
        if (!category) throw 'no category'
        const postCollection = await post()
        const allPosts = await postCollection.find({"category" : category}).toArray()
        return allPosts
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
    },

    async updatePost(id, title, category, content) {
        let updatePost = {}
        if (title) newPost.title = title
        if (category) newPost.category = category
        if (content) newPost.content = content
        const postCollection = await post()
        const updateInfo = await postCollection.updateOne({_id: id}, {$set: updatePost})
        if (updateInfo.modifiedCount == 0) throw "Failed to update post"
    },

    async addComment(id, author, comment) {
        try {
            if (!id || !author || !comment) throw 'Incomplete info to add comment'
            const aComment = {
                author: author,
                content: comment
            }
            if (typeof id == 'string') id = objectID.createFromHexString(id)
            const postCollection = await post()
            const updateInfo = await postCollection.updateOne({_id: id}, {$push: {comments: aComment}})
            if (updateInfo.modifiedCount == 0) throw 'Failed to add comment'
        } catch(e) {
            throw e
        }
    },

    async addLike(id, author) {
        try {
            if (!author) throw 'Incomplete info '
            
            if (typeof id == 'string') id = objectID.createFromHexString(id)
            const postCollection = await post()
            
            // const PostsInId = await postCollection.find({_id: id})
            // const likeArr = PostsInId.like
            // const dislikeArr = PostsInId.dislike
            // if(likeArr.includes(author) || dislikeArr.includes(author)) throw "you already like or dislike this post!"

            const updateInfo = await postCollection.update({_id: id}, {$push: {like: author}})
            if (updateInfo.modifiedCount == 0) throw 'Failed to add like'
        } catch(e) {
            throw e
        }
    },

    async addDislike(id,author) {
        try {
            if (!author) throw 'Incomplete info '
            
            if (typeof id == 'string') id = objectID.createFromHexString(id)
            const postCollection = await post()

            // const PostsInId = await postCollection.find({_id: id})
            // const likeArr = PostsInId.like
            // const dislikeArr = PostsInId.dislike
            // if(likeArr.includes(author) || dislikeArr.includes(author)) throw "you already like or dislike this post!"

            const updateInfo = await postCollection.update({_id: id}, {$push: {dislike: author}})

            if (updateInfo.modifiedCount == 0) throw 'Failed to add dislike'
        } catch(e) {
            throw e
        }
    }
}