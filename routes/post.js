const express = require('express');
const router = express.Router();
const data = require('../data')
const postData = data.post

router.get('/:id', async (req, res) => {
    try {
        const post = await postData.getPost(req.params.id)
        res.render('singlePost', {id: post._id, title: post.title, content: post.content, author: post.author, comments: post.comments})
    } catch(e){
        res.status(404).json({error: e})
    }
})

router.post('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const username = req.session.user
        const comment = req.body.comment
        await postData.addComment(id, username, comment)

        await postData.addLike(req.params.qty1,username)
        await postData.addDislike(req.params.qty2,username)

        res.redirect('/post/'+id)
    } catch(e) {
        res.status(400).json({error: e})
    }
})

router.get('/', async (req, res) => {
    res.redirect('/')
})

module.exports = router