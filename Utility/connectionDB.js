

var database = require('./connectionsData.js');
var Connection = require('../models/connection.js');
/**
 * function to return connection categories/types
 * @return {list}        returns list of connection/connection categories
 */
module.exports.getConnectionTypes = function() {
  var connections = database.connections;
  connectionTypes = [], scanned = [];
  for (var i = 0; i < connections.length; i++) {
    if (scanned[connections[i].connType]) continue;
    scanned[connections[i].connType] = true;
    connectionTypes.push(connections[i].connType);
  }
  return connectionTypes;
}


module.exports.getConnections = function() {
  var connections = database.connections;
  connectionsModel = [];
  for (var i = 0; i < connections.length; i++) {
    connectionsModel.push(new Connection(connections[i].connId, connections[i].connName, connections[i].organizedBy, connections[i].connImagePath, connections[i].details,
      connections[i].date, connections[i].time, connections[i].connType, connections[i].venue));
  }
  return connectionsModel;
};

/**
 * function to return a connection based on connId
 * @param  {integer} connId connection unique Id
 * @return
 */
module.exports.getConnection = function(connId) {
  var connections = database.connections;
  for (var i = 0; i < connections.length; i++) {
    if (connections[i].connId === connId) {
      return new Connection(connections[i].connId, connections[i].connName, connections[i].organizedBy, connections[i].connImagePath, connections[i].details,
        connections[i].date, connections[i].time, connections[i].connType, connections[i].venue);
    }
  }
};


module.exports.doesConnectionExist = function(connId) {
  var connections = database.connections;
  for (var i = 0; i < connections.length; i++) {
    if (connections[i].connId === connId) {
      return true;
    }
  }
  return false;
};
