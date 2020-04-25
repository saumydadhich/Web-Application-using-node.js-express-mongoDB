var mongoose = require('mongoose');

module.exports = class Connection{
  constructor(connectionId,connectionTopic,connectionName,connectionDetails,hostedBy,location,date,time,userId){

      this.connectionId= connectionId;
      this.connectionTopic= connectionTopic;
      this.connectionName= connectionName;
      this.hostedBy= hostedBy;
      this.connectionDetails=connectionDetails;
      this.location=location;
      this.date= date;
      this.time= time;
      this.userId=userId;
  }



  get getConnectionId(){
      return this.connectionId;
  }
  
  set setConnectionId(value){
      this.connectionId = value;
  }
  
  get getConnectionName(){
      return connectionName;
  }
  
  set setConnectionName(value){
      this.connectionName = value;
  }
  
  get getConnectionTopic(){
      return connectionTopic;
  }
  
  set setConnectionTopic(value){
      this.connectionTopic = value;
  }
  
  get getConnectionDetails(){
      return connectionDetails;
  }
  
  set setConnectionDetails(value){
      this.details = value;
  }
  
  get getHostedBy(){
      return hostedBy;
  }
  
  set setHostedBy(value){
      this.hostedBy = value;
  }
  
  get getLocation(){
      return location;
  }
  
  set setLocation(value){
      this.location = value;
  }
  
  get getDate(){
      return date;
  }
  
  set setDate(value){
      this.date = value;
  }
  
  get getTime(){
      return time;
  }
  
  set setTime(value){
      this.time = value;
  }

}

module.exports.connectionSchema = new mongoose.Schema({
    connectionId: {type: Number, required: true},
    connectionTopic: String,
    connectionName: String,
    hostedBy: String,
    connectionDetails: String,
    location: String,
    date: String,
    time: String,
    userId: {type: Number, required: true}
  },{
      versionKey: false
  });