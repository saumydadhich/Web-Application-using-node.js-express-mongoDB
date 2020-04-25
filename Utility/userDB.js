var userObj = require('./../models/User');
var passwordUtility = require('./../Utility/passwordUtility.js');

// var userData = [
//     {
//         userId: 1,
//         userFirstName: "Anushka",
//         userLastName: "Tibrewal",
//         userEmail: "atibrew@uncc.edu",
//         userAddress1: "University Terrace Drive",
//         userAddress2: "Apt C",
//         userCity: "Charlotte",
//         userState: "NC",
//         userZipCode: "28262",
//         userCountry: "USA"
//     },

//     {
//         userId: 2,
//         userFirstName: "Manogya",
//         userLastName: "Puli",
//         userEmail: "mpulir@uncc.edu",
//         userAddress1: "University Terrace North",
//         userAddress2: "Apt H",
//         userCity: "Charlotte",
//         userState: "NC",
//         userZipCode: "28203",
//         userCountry: "USA"
//     } ]

//console.log('the objecs in the var userData are set');

var getUsers = function(userCollection) {
    return new Promise((resolve, reject) => {
        userCollection.find({}).then(data => {
        let usersModel = [];
        for (let i = 0; i < data.length; i++) {
          usersModel.push(new userObj(data[i].userId, data[i].userFirstName, data[i].userLastName, data[i].userEmail, data[i].password, data[i].userAddress1,
          data[i].userAddress2, data[i].userCity, data[i].userState, data[i].userZipCode, data[i].userCountry));
        }
        resolve(usersModel);
      }).catch(err => { return reject(err); })
    })
  };


    var getUser = function (email, Users) {

        return new Promise((resolve, reject) => {
            Users.findOne({userEmail:email}, {userId: 1, userFirstName: 1, userLastName: 1, userEmail: 1, password: 1, userAddress1: 1, userAddress2: 1, userCity: 1, userState: 1, userZipCode: 1, userCountry: 1, _id: 0}).then(data => {
                resolve(data);
            }).catch(err => { return reject(err); })
        })
    };

    var validateLoginDetails = function(email, password, UserModel){
        return new Promise((resolve, reject) => {
          UserModel.findOne({userEmail: email}).then(docs => {
            if(docs === null)
              var bool = false;
            else{
              bool = passwordUtility.verifyPassword(password, docs.password.salt, docs.password.passwordHash);
            }
            resolve(bool)
          }).catch(err => {return reject(err);})
        })
    };

    var isEmailPresent = function(username, UserModel) {
      return new Promise((resolve, reject) => {
        UserModel.findOne({userEmail: username}).then(docs => {
          //console.log(username);
          if (docs === null) {
            var bool = false
          }
          else {
            var bool = true
          }
          resolve(bool)
        }).catch(err => {return reject(err);})
      })
    }

    var addUser = async function(userModel, email, password, firstname, lastname, address1, address2, city, state, zipcode, country){
        var account = new userObj(await getNewUserID(userModel), firstname, lastname, email, passwordUtility.generatePasswordHashAndSalt(password), address1, address2, city, state, zipcode, country);
        var document = new userModel(account);
        console.log(passwordUtility.generatePasswordHashAndSalt(password));
        document.save();
    };

    var getNewUserID = function(userModel){
        return new Promise((resolve, reject) => {
            userModel.find().count().then(docs =>{
              var size = 1001 + docs
              resolve(size);
            }).catch(err => {return reject(err);})
        })
    }


module.exports = {
    // userData: userData,
    getUsers: getUsers,
    getUser: getUser,
    validateLoginDetails: validateLoginDetails,
    addUser: addUser,
    isEmailPresent: isEmailPresent
};
