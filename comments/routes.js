const express = require('express')
const router = express.Router()
const {randomBytes} = require('crypto');
const axios = require('axios');

const commentsbyPostId={}

// middleware that is specific to this router
router.use((req, res, next) => {
  console.log('Time: ', new Date( Date.now()))
  next()
})

router.get('/posts/:id/comments', (req, res) => {
    res.send(commentsbyPostId[req.params.id])
} )

router.post('/posts/:id/comments', async (req, res) => {
    const commentId = randomBytes(4).toString('hex');
    const {content} = req.body;
    const comments=commentsbyPostId[req.params.id] || [];
    comments.push({id: commentId, content});
    commentsbyPostId[  req.params.id]=comments;
  
    await axios.post('http://event-bus-srv:4005/events', {
      type: 'CommentCreated',
      data:{
          id, title, content, postId: req.params.id
      }
    })

    res.status(201).send(commentsbyPostId[req.params.id]);
} )


module.exports = router