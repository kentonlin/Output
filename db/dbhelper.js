"use strict";
const Model = require('./db.js');
// var jwt  = require('jwt-simple');
const ObjectId = require('mongoose').Types.ObjectId;
const http = require('http');
const request = require("request");


const dbFunc = {
  addUser: function(user, res) {
    console.log('this is dbhelper user obj', user);
    let newUser = new Model.user(user);
    newUser.save(function(err){
      if(err) {
        console.log('error in saving the user to database');
      }else{
        console.log('user added', user);
        res.send(user);
      }
    });
  },
  addSong: function(req, res) {
    let newSong = new Model.song(req.song);
    newSong.save(function(err){
      if(err) {
        console.log('error in saving song to database', err);
      }
      Model.user.update({"username": req.username}, {$push:{"songs": newSong}},
        function(err){
          if(err){
            res.send(new Error("song not added to user document"));
          }
          else {
            res.send("song added to user", req);
          }
        }
      );
    });
  },
  getSongs: function(user, res) {
    Model.user.findOne({'username': user.username}).populate('songs').exec(function (err, found) {
      if(err){
        console.log('error in fetching scripts', err);
      }
      res.send(found.songs);
    });
  }
};

module.exports = dbFunc;
