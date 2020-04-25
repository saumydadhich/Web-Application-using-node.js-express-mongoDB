
const express = require('express');
const bodyParser = require('body-parser');

const condb = require('../Utility/connectionsData');
const userdb = require('../Utility/userDB');
const userObj = require('../models/user');
var userprofileObj = require('../models/userProfile');
var userConnection = require('./../models/userConnection');
var userConnectionDB = require('./../Utility/userProfileDB.js');
const {check, validationResult, sanitizeBody} = require('express-validator');

var connectionlist = [];
var userdetails;
const Connection = require('../models/connection.js');

const route = express.Router();
const jsonParser = bodyParser.json();
const urlEncodedParser = bodyParser.urlencoded({ extended: false });

//console.log('working now');
const User = require('../models/user.js');
const connectionController = require('./connectionController.js');

var ConnectionModel = connectionController.ConnectionModel;


var mongoose = require('mongoose');
//connect to database
mongoose.connect("mongodb://localhost:27017/WandererNotes", {useNewUrlParser: true});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Database connection error:'));

var UserModel = mongoose.model("User", userObj.userSchema, 'Users');
var UserConnectionModel = mongoose.model("UserConnection", userConnection.userConnectionSchema, 'UserConnections');

route.get('/', async function (req, res) {
  console.log(req.session.theUser);

  if (!req.session.theUser) {
    //get users from database
    var users = await userdb.getUsers(UserModel);
    var loggedInUser;
    if (users[0]) {
      loggedInUser = users[0]; //take the first user for logIn
    }
    req.session.theUser = users[0];
    console.log(req.session.theUser);
    req.session.userProfile = await userConnectionDB.getUserProfile(req.session.theUser.userId, UserConnectionModel, ConnectionModel);
  }

  res.render('savedConnections', { data: req.session.userProfile,session:req.session.theUser });
});

route.post('/', urlEncodedParser, check('userEmaildAddress').isEmail(), async function (req, res) {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    res.render('login', {failure: "email", errorMessage: errors.array()})
  }
  else{
    //get users from database
    var users = await userdb.getUsers(UserModel);
  //  var loggedInUser;
    if (await userdb.validateLoginDetails(req.body.userEmaildAddress, req.body.userPassword, UserModel)) {
    //  loggedInUser = await userdb.getUser(req.body.userEmaildAddress, UserModel);
      req.session.theUser = await userdb.getUser(req.body.userEmaildAddress, UserModel);
      req.session.userProfile = await userConnectionDB.getUserProfile(req.session.theUser.userId, UserConnectionModel, ConnectionModel);
      if(req.session.theUser.userId === 0)
        res.redirect('/connections');
      else
        res.render('savedConnections', { data: req.session.userProfile,session:req.session.theUser });
    }
    else {
      res.render('login', {session: req.session.theUser, failure: "incorrect", errorMessage: ""});
    }
  }

});

route.post('/create', urlEncodedParser,
check('username').isEmail().custom(async value => {
  if(await userdb.isEmailPresent(value, UserModel)){
    return Promise.reject();
  }
}).withMessage('Email invalid/already in use'),
check('password').isLength({min: 6}).withMessage('Password too short, should be atleast 6 characters')
.isLength({max: 15}).withMessage('Password cannot be more than 15 characters'),
check('confirmPassword').custom((value, {req}) => {
  if (value != req.body.password) {
    return false;
  }
  else {
    return true;
  }
}).withMessage('The passwords do not match'),
check('firstName').custom(value => {
  var isValid = value.match(/^([a-zA-Z]+\s)*[a-zA-Z]+$/);
  if(isValid != null)
    return true;
  else {
    return false;
  }
}).withMessage('First Name should contain only characters and spaces'),
check('lastName').isAlpha().withMessage('Last Name can only contain alphabets'),
check('address1').custom(value => {
  var isValid = value.match(/^[a-zA-Z0-9,.# ]*$/);
  if(isValid != null)
    return true;
  else {
    return false;
  }
}).withMessage('Address can only contain alphanumeric characters, spaces and punctuation'),
check('address2').custom(value => {
  var isValid = value.match(/^[a-zA-Z0-9,.# ]*$/);
  if(isValid != null)
    return true;
  else {
    return false;
  }
}).withMessage('Address can only contain alphanumeric characters, spaces and punctuation'),
check('city').isAlpha().withMessage('City can only contain alphabets'),
check('state').isAlpha().withMessage('State Name can only contain alphabets'),
check('country').custom(value => {
  var isValid = value.match(/^([a-zA-Z]+\s)*[a-zA-Z]+$/);
  if(isValid != null)
    return true;
  else {
    return false;
  }
}).withMessage('Country should contain only characters and spaces'),
check('zipcode').isNumeric().withMessage('Zipcode can only contain numbers') , async function(req, res) {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
      console.log(errors.array());
      res.render('signup', {session: req.session.theUser, failure: true, errorMessage: errors.array()})
    }
    else {
      userdb.addUser(UserModel, req.body.username, req.body.password, req.body.firstName, req.body.lastName, req.body.address1, req.body.address2, req.body.city, req.body.state, req.body.zipcode, req.body.country);
      res.redirect('/')
   }
});

route.get('/rsvp', async function (req, res) {

      if (Object.keys(req.query)[0] === 'connectionId') {
         var connectionId = req.query.connectionId;
        conns=userdetails.addConnection(connectionId, req.query.rsvp);
         req.session.theUser.userdetails = userdetails;
         res.redirect('/userprofile');
      }
  });



route.get('/update', async function(req, res){
  if(Object.keys(req.query)[0] === 'connectionId'){
     var id = req.query.connectionId;
     res.redirect('/connections/connection?connectionId=' +id);
  }
})

route.get('/delete', async function (req, res) {
  if(req.session.theUser){

      console.log('DELETE ROUTER INVOKED 1');
      userdetails.removeConnection(req.query.id);
      console.log('DELETE ROUTER INVOKED 2');
      req.session.theUser.userdetails = userdetails;
        res.redirect('/userprofile');

  }
});


route.get('/logout', async function (req, res) {
  req.session.destroy(function (err) {
    if (err) {
      res.negotiate(err)
    }
    userprofileObj.connections=[];
    res.redirect('/');
  })
})

module.exports = route;
