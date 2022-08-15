const express  = require('express');
const app=  express();
const bodyParser = require('body-parser');
const cors= require('cors');
const {randomBytes} = require('crypto');
const comments=require('./routes');
const axios = require('axios');

app.use(bodyParser.json());
app.use(cors());

const commentsbyPostId={}

//app.use('/', comments)

 app.get('/posts/:id/comments', (req, res) => {
     res.send(commentsbyPostId[req.params.id])
 } )


 app.post('/posts/:id/comments', async (req, res) => {
    const commentId = randomBytes(4).toString('hex');
    const {content} = req.body;
    const comments=commentsbyPostId[req.params.id] || [];
    comments.push({id: commentId, content, postId:req.params.id, status:'pending'});
    commentsbyPostId[  req.params.id]=comments;
 
    await axios.post('http://localhost:4005/events', {
        type: 'CommentCreated',
        data:{
            id: commentId, 
            content, 
            postId:req.params.id, 
            status:'pending'
        }
    })

    res.status(201).send(comments);
} )


app.post('/events', async (req, res)=>{
    console.log('Received Comment/Event: ', req.body);
    const {type, data} = req.body;
    if(type === 'CommentModerated'){
        const {id, postId, status, content} = data;
        const comments = commentsbyPostId[postId]
        
        var comment = comments.find(comment => {
            return comment.id === id;
        } )
        comment.status = status;
        
        await axios.post('http://localhost:4005/events', {
            type: 'CommentUpdated',
            data:{
                id, 
                postId, 
                status, 
                content
            }
        })
    }

 

    res.send({})
})


app.listen(4001,()=>{
    console.log('server started at port 4001');
} );
