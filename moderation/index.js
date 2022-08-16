const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app=express();
const axios = require('axios');

app.use(bodyParser.json({ type: '*/*' }));
app.use(cors({
    origin: '*'
}));

app.get('/events', (req, res) => {
    const  {type, data}=req.body
    if (type==='CommentModerated') {
        console.log('Moderated Get method has received: ', body)
    }
    console.log('I am Moderate project running in Port: ', 400)

});

app.post('/events', async (req, res) => {
    console.log('Moderated Received', req.body);
    const {type, data}=req.body;
    if (type==='CommentCreated'){
        const status=data.content.includes('orange')?'rejected':'approved';

        await axios.post('http://event-bus-srv:4005/events', {
            type: 'CommentModerated',
            data: {
                id: data.id,
                postId: data.postId,
                status,
                content:data.content
            }
        });
    }
    res.send({});
});

app.listen(4003, ()=>{
    console.log('Server started on port 4003');
});

