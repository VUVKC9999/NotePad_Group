const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const cors = require('cors');

const noterouter = require('./routes/noteroute')
const userrouter = require('./routes/userroute')

require('dotenv').config();

const port = process.env.port || 4000;

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

mongoose.connect(process.env.mongo_uri)
.then(() => 
    {
        console.log('MongoDB Connected...')
    }
)


.catch((error) =>
{
    console.log(`MongoDB Connection Failed... reason: ${error}`)

})

app.use('/notepad', noterouter)
app.use('/auth',userrouter) 

app.listen(port, ()=>
{
    console.log(`server is running on ${port}`)
})
