var mongoose = require('mongoose');

module.exports = class User{
  constructor(userId,userFirstName,userLastName,userEmail,password,userAddress1,userAddress2,userCity,userState,userZipCode,userCountry){
          this.userId = userId;
          this.userFirstName = userFirstName;
          this.userLastName = userLastName;
          this.userEmail = userEmail;
          this.password = password;
          this.userAddress1 = userAddress1;
          this.userAddress2 = userAddress2;
          this.userCity = userCity;
          this.userState = userState;
          this.userZipCode = userZipCode;
          this.userCountry = userCountry;
      }

      get getUserId(){
          return this.userId;
      }

      set setUserId(value){
          this.userId = value;
      }

      get getFirstName(){
          return this.userFirstName;
      }

      set setFirstName(value){
          this.userFirstName = value;
      }

      get getLastName(){
          return this.userLastName;
      }

      set setLastName(value){
          this.userLastName = value;
      }

      get getEmail(){
          return this.userEmail;
      }

      set setEmail(value){
          this.userEmail = value;
      }

      get getPassword(){
          return this.password;
      }

      set setPassword(password){
          this.password = password;
      }

      get getAddress1(){
          return this.userAddress1;
      }

      set setAddress1(value){
          this.userAddress1 = value;
      }

      get getAddress2(){
          return this.userAddress2;
      }

      set setAddress2(value){
          this.userAddress2 = value;
      }

      get getCity(){
          return this.userCity;
      }

      set setCity(value){
          this.userCity = value;
      }

      get getState(){
          return this.userState;
      }

      set setState(value){
          this.userState = value;
      }

      get getZipCode(){
          return this.userZipCode;
      }

      set setZipCode(value){
          this.userZipCode = value;
      }

      get getCountry(){
          return this.userCountry;
      }

      set setCountry(value){
          this.userCountry = value;
      }
}

module.exports.userSchema = new mongoose.Schema({
    userId: {type: Number, required: true},
    userFirstName: {type: String, required: true},
    userLastName: {type: String, required: true},
    userEmail: String,
    password: {
      salt: {type: String, required: true},
      passwordHash: {type: String, required: true}
    },
    userAddress1: String,
    userAddress2: String,
    userCity: String,
    userState: String,
    userZipCode: Number,
    userCountry: String
}, {
    versionKey: false
});
