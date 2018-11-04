//Declare dependencies
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./config/database');
const bucketlist = require('./controller/bucketlist');

//Connect mongoose to database
mongoose.connect(config.database);

//Declare Port
const port = 3000;

//Initialize app variable
const app = express();

//Load express middlewares

//CORS
app.use(cors());

//bodyParser using json and urlencoding
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//Declare public folder as path for static files using express.static (built in function)
app.use(express.static(path.join(__dirname, 'public')));

//Declare '/' as "invalid route"
app.get('/',(req,res) => {
  res.send("Invalid page");
});


//Route all HTTP requests to /bucketlist to the bucketlist controller
app.use('/bucketlist',bucketlist);

//Listen to port 3000
app.listen(port, () => {
  console.log(`Starting the server at port ${port}`); //backticks
});
