const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const {randomBytes}=require('crypto');
const axios = require('axios');

app.use(bodyParser.json({ type: '*/*' }));
app.use(cors({
    origin: '*'
}));


const posts={}

app.get('/posts', (req, res) => {
    res.send(posts);
});

app.post('/posts/create', async (req, res) => {
    console.log('I am starting to do my job for saving the a new post.')
    const id=randomBytes(4).toString('hex');
    const { title, content } = req.body;
    posts[id] = {
        id, title, content
    }
    console.log('I am done with my job to trigger new event.')
    await axios.post('http://event-bus-srv:4005/events', {
        type: 'PostCreated',
        data:{
            id, title, content
        }
    })    
    console.log('I am done with my job to trigger new event.')

    res.status(201).send(posts[id]);
} );

app.post('/events', (req, res)=>{
    console.log('Received Events', req.body.type)
    console.log('I am Post project running in Port: ', 4000)
    res.send({})
})

app.delete('posts/:id', (req, res)=>{
    debugger
    posts=posts.filter(x => x.id!==id);
    res.status(204)
})


app.listen(4000,  () => {
    console.log('v:1.0.0');
    console.log('Server started on port 4000'); 
});
