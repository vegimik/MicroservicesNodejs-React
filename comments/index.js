const express  = require('express');
const app=  express();
const bodyParser = require('body-parser');
const cors= require('cors');
const {randomBytes} = require('crypto');
const comments=require('./routes');

app.use(bodyParser.json());
app.use(cors());

const commentsbyPostId={}

app.use('/', comments)

// app.get('/posts/:id/comments', (req, res) => {
//     res.send(commentsbyPostId[req.params.id])
// } )

// app.post('/posts/:id/comments', (req, res) => {
//     const commentId = randomBytes(4).toString('hex');
//     const {content} = req.body;
//     const comments=commentsbyPostId[req.params.id] || [];
//     comments.push({id: commentId, content});
//     commentsbyPostId[  req.params.id]=comments;
//     res.status(201).send(commentsbyPostId[req.params.id]);
// } )

app.listen(4001,()=>{
    console.log('server started at port 4001');
} );
