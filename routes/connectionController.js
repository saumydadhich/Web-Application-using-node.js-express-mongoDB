const express = require('express');
var connectionDB = require('../Utility/connectionsData');
var userConnectionDB = require('../Utility/userProfileDB.js');
var userConnection = require('../models/userConnection');
const Connection = require('../models/connection.js');
const bodyParser = require('body-parser');
const urlEncodedParser = bodyParser.urlencoded({ extended: false });
const jsonParser = bodyParser.json();
const { check, validationResult, sanitizeBody } = require('express-validator');

const route = express.Router();
var mongoose = require('mongoose');
//connect to database
mongoose.connect("mongodb://localhost:27017/WandererNotes", {useNewUrlParser: true});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Database connection error:'));

var ConnectionModel = mongoose.model("Connections", Connection.connectionSchema, 'Connections');
var UserConnectionModel = mongoose.model("UserConnection", userConnection.userConnectionSchema, 'UserConnections');

route.get('/', async function(req,res){
    var connectionTypes = await connectionDB.getConnectionTypes(ConnectionModel);
    var connections = await connectionDB.getConnections(ConnectionModel);
    res.render('connections', {
      session: req.session.theUser,
      data: connections,
      categories: connectionTypes,
    });
    //res.render('connections.ejs',{data: connections[0],categories:connections[1] ,session: req.session.theUser});
})

route.get('/connection', async function(req,res){
    if (await connectionDB.doesConnectionExist(req.query.id, ConnectionModel)) {
        var connection = await connectionDB.getConnection(req.query.id, ConnectionModel);
        res.render('connection.ejs',{data: connection, session: req.session.theUser});
    } else {
        res.redirect('/connections');
    }
})

route.post('/newConnection', [urlEncodedParser, jsonParser,
  check('name').custom(name => {
    var isValid = name.match(/^([a-zA-Z]+\s)*[a-zA-Z]+$/);
    if (isValid != null) {
      return true;
    } else {
      return false;
    }
  }).withMessage('Name should contain alphabets and spaces.'),
  sanitizeBody('name').trim().escape(),
  check('topic').isAlpha().withMessage('Topic should contain only alphabets.'),
  check('hostedBy').custom(hostedBy => {
    var isValid = hostedBy.match(/^([a-zA-Z0-9]+\s)*[a-zA-Z0-9]+$/);
    if (isValid != null) {
      return true;
    } else {
      return false;
    }
  }).withMessage('Organized By should contain alphabets and spaces.'),
  sanitizeBody('hostedBy').trim().escape(),
  check('description').isLength({ min: 20 }).withMessage('Description length must be at least 20 characters.')
    .isLength({ max: 1000 }).withMessage('Description length should not exceed 1000 characters.')
    .custom(description => {
      var isValid = description.match(/^[a-zA-Z0-9!@#\$%\^\&*\)\(+=.,~:;'"{}\?|_-\s\[\]\\\/]+$/);
      if (isValid != null) {
        return true;
      } else {
        return false;
      }
    }).withMessage('Description should not contain <, > symbols.'),
  check('where').custom(hostedBy => {
    var isValid = hostedBy.match(/^([a-zA-Z0-9,.#]+\s)*[a-zA-Z0-9,.#]+$/);
    if (isValid != null) {
      return true;
    } else {
      return false;
    }
  }).withMessage('Where should contain combination of alphabets, number, comma, dot and hash.'),
  sanitizeBody('where').trim().escape(),
  sanitizeBody('when').trim().escape()
], async function (req, res) {
  if (!req.session.theUser) {
    res.render('newConnection.ejs', {
      session: req.session.theUser,
      errorMessages: "",
      customMsg: "Please login to continue."
    });
    res.redirect('/');
  } else {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.render('newConnection', {
        session: req.session.theUser,
        errorMessages: errors.array(),
        customMsg: ""
      });
    } else {
      var topic = req.body.topic;
      var name = req.body.name;
      var hostedBy = req.body.hostedBy;
      var description = req.body.description;
      var where = req.body.where;
      var when = new Date(req.body.when)
      var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

      var eventDate = days[when.getDay()] + ", " + months[when.getMonth()] + " " + when.getDate();
      var time = "6PM"

      var userId = req.session.theUser.userId;
      var Connection = require('../models/connection.js');
      // var isDuplicate = await connectionDB.isDuplicateConnection( req.body.where, eventDate, timeString, ConnectionModel);
      // if(isDuplicate){
      //     res.render('newConnection', {
      //     user: req.session.theUser,
      //     errorMessages: "",
      //     customMsg: "Event can't be added as another event is present during the same time at the same location."
      //     });
      // } else {
      var events = await connectionDB.getConnections(ConnectionModel);
      var newConnection = new Connection(events.length + 1, topic, name, hostedBy, description,
        where, eventDate, time, userId);
      await userConnectionDB.addConnection(newConnection, ConnectionModel);
      await userConnectionDB.addRSVP(userId, newConnection.connectionId, "Yes", UserConnectionModel);
      req.session.userProfile = await userConnectionDB.getUserProfile(userId, UserConnectionModel, ConnectionModel);
      res.redirect('/userprofile');
      //}
    }
  }

});

route.post('/update', urlEncodedParser, jsonParser, async function(req,res){
    if (!req.session.theUser) {
        res.redirect('/');
      } else {
        var currentUser = req.session.theUser;
        console.log(req.body);
        //Execute this block when a user tries to add or update RSVP for an event
        if (req.body.action === 'maybe' || req.body.action === 'yes' || req.body.action === 'no') {
          var connection = await connectionDB.getConnection(req.body.connectionId, ConnectionModel);
        //  var userProfile = new UserProfile(req.session.theUser.userId, req.session.userProfile);
          var updateRSVP = 'No';
          if (req.body.action === 'maybe') {
            updateRSVP = 'Maybe';
          } else if (req.body.action === 'yes') {
            updateRSVP = 'Yes';
          }
          if(await userConnectionDB.doesUserConnectionExist(currentUser.userId, connection.connectionId, UserConnectionModel)){
            //call update user profile
            await userConnectionDB.updateRSVP(currentUser.userId, connection.connectionId, updateRSVP, UserConnectionModel);
          } else {
            await userConnectionDB.addRSVP(currentUser.userId, connection.connectionId, updateRSVP, UserConnectionModel);
          }

          req.session.userProfile = await userConnectionDB.getUserProfile(currentUser.userId, UserConnectionModel, ConnectionModel);
          res.redirect('/userprofile');
        } else if (req.body.action === 'delete') { //Execute this block when a user tries to delete an event from user profile
          await userConnectionDB.removeUserConnection(currentUser.userId, req.body.connectionId, UserConnectionModel);
          req.session.userProfile = await userConnectionDB.getUserProfile(currentUser.userId, UserConnectionModel, ConnectionModel);
          res.redirect('/userprofile');
        } else if(req.body.action === 'adminDelete'){
          await connectionDB.removeAdminConnection(req.body.connectionId, UserConnectionModel, ConnectionModel);
          res.redirect('/connections');
        }
    }
});

route.get('/newConnection', function (req, res) {
  res.render('newConnection.ejs', {
    session: req.session.theUser,
    errorMessages: "",
    customMsg: ""
  });
})

module.exports = route;
module.exports.ConnectionModel = ConnectionModel;
