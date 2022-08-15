const express = require('express');
const app=express();
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
const morgan = require('morgan');

app.use(morgan('combined'));
app.use(bodyParser.json({ type: '*/*' }));
app.use(cors({
    origin: '*'
}));

const events=[]

app.get('/events', (req, res) => {
    res.send(events)
})

app.post('/events',  (req, res)=>{
    const event=req.body
    events.push(event);
    console.log('Event Bu   : ',event)

    axios.post('http://localhost:4000/events', event);
    axios.post('http://localhost:4001/events', event);
    axios.post('http://localhost:4002/events', event).catch((err) => {
        console.error(err.message);
    });
    axios.post('http://localhost:4003/events', event).then((result) => {
        console.log('Event Bus request body: ', result.data);        
    }).catch((err) => {
        console.error(err.message);
    });
    
    console.log('I am EventBus project running in Port: ', 4005)
    res.send({status:'OK'})
})


app.listen(4005,()=>{
    console.log('server started at port 4005');
} );


