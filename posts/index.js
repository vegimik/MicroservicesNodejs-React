const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const {randomBytes}=require('crypto');

app.use(bodyParser.json());
app.use(cors());

const posts={}

app.get('/posts', (req, res) => {
    res.send(posts);
});

app.post('/posts', (req, res) => {
    const id=randomBytes(4).toString('hex');
    const { title, content } = req.body;
    posts[id] = {
        id, title
    }
    res.status(201).send(posts[id]);
} );


app.listen(4000, () => {
    console.log('Server started on port 4000');
});