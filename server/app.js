const express = require('express');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const dbHelpers = require('../db/dbhelper.js');
const ObjectId = require('mongoose').Types.ObjectId;

const app = express();

app.use(bodyParser.json());
// Setup logger
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));

// Serve static assets
app.use(express.static(path.resolve(__dirname, '..', 'build')));

// Always return the main index.html, so react-router render the route in the client
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});
app.post('/add/user', function(req, res){
  // console.log('this is the body', req.body);
  console.log("request received at add user");
  dbHelpers.addUser(req.body, res);
});
app.post('/add/song', function(req, res){
  console.log("equest recieved at add songs");
  dbHelpers.addSong(req.body, res);
});
app.post('/user/songs', function(req, res){
  console.log("request recieved at get songs");
  dbHelpers.getSongs(req.body, res);
});

module.exports = app;
