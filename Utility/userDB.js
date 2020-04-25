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
              bool = passwordUtility.verifyPassword(password, docs.password.salt, docs.password.hash);
            }
            resolve(bool)
          }).catch(err => {return reject(err);})
        })
    };


module.exports = {
    // userData: userData,
    getUsers: getUsers,
    getUser: getUser,
    validateLoginDetails: validateLoginDetails
};
