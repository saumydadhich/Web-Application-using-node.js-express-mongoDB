// class UserConnection{
//   constructor(connectionId,rsvp){
//       this.connectionId = connectionId;
//       this.rsvp = rsvp;
//   }

//   get getConnection(){
//       return this.connectionId;
//   }

//   set setConnection(value){
//       this.connectionId = value;
//   }

//   get getRsvp(){
//       return this.rsvp;
//   }

//   set setRsvp(value){
//       this.rsvp = value; 
//   }
// }

// module.exports = UserConnection;
var mongoose = require('mongoose');

module.exports = class UserConnection {
  constructor(connection, rsvp) {
    this.connection = connection;
    this.rsvp = rsvp;
  }
}

module.exports.userConnectionSchema = new mongoose.Schema({
  userId: {type: Number, required: true},
  connectionId : {type: Number, required: true},
  rsvp: String
}, {
  versionKey: false
});