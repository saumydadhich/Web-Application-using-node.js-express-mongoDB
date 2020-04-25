module.exports = class admin extends User{
  constructor(userId,userFirstName,userLastName,userEmail,password,userAddress1,userAddress2,userCity,userState,userZipCode,userCountry){
      super(userId,userFirstName,userLastName,userEmail,password,userAddress1,userAddress2,userCity,userState,userZipCode,userCountry);
      adminDeleteConnection(connectionID, UserConnectionModel, ConnectionModel){
        var path = require('path');
        var userConnectionDB = require( path.resolve( __dirname, "./userProfileDB.js" ) );
        userConnectionDB.removeUserConnection(0, connectionID, UserConnectionModel);
        return new Promise((resolve, reject) => {
          ConnectionModel.deleteOne({connectionId:connectionID},function (err, data) {
            resolve();
          }).catch(err => { return reject(err); });
        });
      }
  }
}
