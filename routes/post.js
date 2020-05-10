const express = require('express');
const router = express.Router();
const data = require('../data')
const postData = data.post

router.get('/:id', async (req, res) => {
    try {
        const post = await postData.getPost(req.params.id)
        res.render('singlePost', {title: post.title, content: post.content, author: post.author})
    } catch(e){
        res.status(404).json({error: e})
    }
})

router.get('/', async (req, res) => {
    res.redirect('/')
})

module.exports = router