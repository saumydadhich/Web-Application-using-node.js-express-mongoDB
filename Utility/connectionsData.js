const conObj = require('../models/connection');

//console.log('The datalist var must be containing the objects');


// var datalist = [
// {
//     connectionId: '1',
//     connectionTopic: 'California Trip',
//     connectionName: 'Travelling to Santa Rosa',
//     hostedBy:'Wanderer Notes',
//     connectionDetails:'Trip to Santa Rosa' ,
//     location:'Jack London State Historic Park',
//     date :'Tuesday, February 18',
//     time : '5PM'

// },

// {
//     connectionId: '2',
//     connectionTopic:'California Trip',
//     connectionName:'Travelling to San Jose' ,
//     hostedBy:'Wanderer Notes',
//     connectionDetails: 'Trip to San Jose' ,
//     location:'Winchester Mystery House',
//     date :'Wednesday, March 11',
//     time : '6PM'
// },

// {
//     connectionId: '3',
//     connectionTopic: 'California Trip',
//     connectionName:'Travelling to San Fransico' ,
//     hostedBy:'Wanderer Notes',
//     connectionDetails: 'Trip to San Fransico' ,
//     location:'Golden Gate Bridge',
//     date :'Monday, March 16',
//     time : '11:30AM'
// },

// {

//     connectionId:'4',
//     connectionTopic: 'Florida Trip',
//     connectionName: 'Travelling to Miami' ,
//     hostedBy:'Wanderer Notes',
//     connectionDetails:'Trip to Miami',
//     location:'Miami Beach',
//     date :'Tuesday, April 7',
//     time : '10AM'
// },

// {
//     connectionId:'5',
//     connectionTopic: 'Florida Trip',
//     connectionName: 'Travelling to Orlando' ,
//     hostedBy:'Wanderer Notes',
//     connectionDetails: 'Trip to Orlando' ,
//     location:'Universal Studio',
//     date :'Wednesday, April 15',
//     time : '5PM'
//  },

//  {
//     connectionId:'6',
//     connectionTopic:'Florida Trip',
//     connectionName: 'Travelling to Tampa' ,
//     hostedBy:'Wanderer Notes',
//     connectionDetails: 'Trip to Tampa' ,
//     location:'Busch Gardens Tampa Bay',
//     date :'Wednesday, April 22',
//     time : '3PM'
//  }

// ]


// var getConnections = function(){
//     let conlist = [];
//     let catlist = [];
//     for(i=0; i<datalist.length; i++){
//         var obj = new conObj.Connection(datalist[i].connectionId,datalist[i].connectionTopic,datalist[i].connectionName,datalist[i].connectionDetails,
//             datalist[i].hostedBy,datalist[i].location,datalist[i].date,datalist[i].time)
//             conlist.push(obj);
//             if (!catlist.includes(datalist[i].connectionTopic))
//             {
//                 catlist.push(datalist[i].connectionTopic);
//             }
//     }
//     return ([conlist,catlist]);

// };

// //console.log('The datalist should of the objects');


// var getConnection = function(connectionId){
//     for(i = 0; i< datalist.length; i++){
//         if(datalist[i].connectionId == connectionId){
//             var itemlist = new conObj.Connection(datalist[i].connectionId,datalist[i].connectionTopic,datalist[i].connectionName,datalist[i].connectionDetails,
//                 datalist[i].hostedBy,datalist[i].location,datalist[i].date,datalist[i].time)
//                 return itemlist;
//         }
//     }

// }



// module.exports = {
//     getConnections: getConnections,
//     getConnection: getConnection,

// }


var getConnectionTypes = function(connections) {
    return new Promise((resolve, reject) => {
      connections.find({}).then(data => {
        connectionTypes = [], scanned = [];
        for (let i = 0; i < data.length; i++) {
          if (scanned[data[i].connectionTopic]) continue;
          scanned[data[i].connectionTopic] = true;
          connectionTypes.push(data[i].connectionTopic);
        }
        resolve(connectionTypes);
      }).catch(err => { return reject(err); })
    })
  }

  /**
   * function to return all festivals
   * @return {list}        returns list of connections/festivals
   */
  var getConnections = function(connections) {
    return new Promise((resolve, reject) => {
        connections.find({}).then(data => {
          let connectionsModel = [];

          for (let i = 0; i < data.length; i++) {
            connectionsModel.push(new conObj(data[i].connectionId, data[i].connectionTopic, data[i].connectionName, data[i].hostedBy, data[i].connectionDetails,
            data[i].location, data[i].date, data[i].time, data.userId));
          }
          resolve(connectionsModel);
        }).catch(err => { return reject(err); })
    })
  };

  /**
   * function to return a festival based on festId
   * @param  {integer} festId connection unique Id
   * @return
   */
  var getConnection = function(connectionId, connections) {
    //let FestivalModel=require('../models/festival');

    return new Promise((resolve, reject) => {
        connections.findOne({connectionId:connectionId}).then(data => {
          console.log(data);
          let connection = new conObj(data.connectionId, data.connectionTopic, data.connectionName, data.hostedBy, data.connectionDetails,
            data.location, data.date, data.time, data.userId);
          resolve(connection);
        }).catch(err => { return reject(err); })
    })
  };


  var getUserCreatedConnections = function(userId, connections) {

  return new Promise((resolve, reject) => {
      connections.find({userId:userId}).then(data => {
        let connectionsModel = [];
        for (let i = 0; i < data.length; i++) {
            connectionsModel.push(new conObj(data[i].connectionId, data[i].connectionName, data[i].connectionTopic, data[i].hostedBy, data[i].connectionDetails,
                data[i].location, data[i].date, data[i].time, data.userId));
        }
        resolve(connectionsModel);
      }).catch(err => { return reject(err); })
  })
  };

  /**
   * function to check whether a festival exists in the database
   * @param  {integer} festId connection unique Id
   * @return {boolean}        returns true or false
   */
  var doesConnectionExist = function(connectionId, connections) {
    return new Promise((resolve, reject) => {
       connections.find({connectionId:connectionId}).then(data => {
        resolve(data.length>0);
      }).catch(err => { return reject(err); })
    })
  };

  removeAdminConnection = async function(connectionID, UserConnectionModel, ConnectionModel){
    var path = require('path');
    var userConnectionDB = require( path.resolve( __dirname, "./userProfileDB.js" ) );
    await userConnectionDB.removeUserConnection(0, connectionID, UserConnectionModel);
    return new Promise((resolve, reject) => {
      ConnectionModel.deleteOne({connectionId:connectionID},function (err, data) {
        resolve();
      }).catch(err => { return reject(err); });
    });
  }

  module.exports = {
    // userData: userData,
    doesConnectionExist: doesConnectionExist,
    getUserCreatedConnections: getUserCreatedConnections,
    getConnection:getConnection,
    getConnections:getConnections,
    getConnectionTypes:getConnectionTypes,
    removeAdminConnection: removeAdminConnection

};
