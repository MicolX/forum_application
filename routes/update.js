const express = require('express');
const router = express.Router();
const data = require('../data')
const postData = data.post

router.get('/:id', async (req, res) => {
    try {
        const post = await postData.getPost(req.params.id)
        if (post.author != req.session.user) res.redirect('/')
        res.render('createPost', {
            update: true, 
            id: req.params.id,
            title: post.title, 
            content: post.content, 
            autoCategory: post.category=='Automobile',
            foodCategory: post.category=='Food',
            courseCategory: post.category=='Course'
        })
    } catch(e) {
        res.status(404).json({error: e})
    }
})

router.post('/:id', async (req, res) => {
    const body = req.body
    try {
        await postData.updatePost(req.params.id, body.title, body.category, body.content)
        res.redirect('/post/'+req.params.id)
    } catch(e) {
        res.status(404).json({error: e})
    }
})



module.exports = router