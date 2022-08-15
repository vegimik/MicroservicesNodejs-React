const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app=express();

app.use(bodyParser.json({ type: '*/*' }));
app.use(cors({
    origin: '*'
}));

const posts={}

const handleEvent=(type, data)=>{
    console.log('Received Query/Events: ', type, data);
    
    if (type==='PostCreated') {
        const {id, title }=data;
        posts[id]={id, title, comments:[]}        
    }

    if (type==='CommentCreated') {
        const {id, content, postId, status}= data;
        posts[postId]?.comments.push({id, content, status}) 
        
    }

    if (type==='CommentUpdated') {
        const {id, content, postId, status}= data;
        const post=posts[postId]
        const comment=post.comments.find(comment=> {
            return comment.id===id;
        })
        comment.status=status;
        comment.content=content;

    }
}

app.get('/posts',(req, res)=>{
    res.send(posts)
    
})

app.post('/events',(req, res)=>{
    const {type, data}=req.body
    handleEvent(type, data);

    console.log('I am Query project running in Port: ', 4002)
    res.send({})
})


app.listen(4002, async ()=>{
    console.log('Server started on port 4002');

    
    try {
        const res=await axios.get('http://localhost:4005/events')
        for (let index = 0; index < res.length; index++) {
            console.log('====================================');
            console.log('Processing event: ', res[index].type);
            console.log('====================================');
            const event = res[index];
            handleEvent(event.type, event.data);
            
        }
    } catch (error) {
    }
});