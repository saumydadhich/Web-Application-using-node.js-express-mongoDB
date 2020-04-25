# web-application-using-node.js-express-mongodb

### Use the following queries to pre populate the database
'''
//create database WandererNotes
use WandererNotes;

//create collections

db.createCollection('Users');
db.createCollection('Connections');
db.createCollection('UserConnections');

//insert data into Users collection
db.Users.insert([{
    userId: 1,
        userFirstName: "Anushka",
        userLastName: "Tibrewal",
        userEmail: "atibrew@uncc.edu",
	password: {salt: "b67de8c581c81f1c", hash: "6503327fb44566a4e3ade27bd58988bc519010ff4b4e0f017651f48a3533a7913ff09a737ef9730d4a54a6c363120b1d10c21c8df41db7c5c7dc5320541bba71"},
        userAddress1: "University Terrace Drive",
        userAddress2: "Apt C",
        userCity: "Charlotte",
        userState: "NC",
        userZipCode: "28262",
        userCountry: "USA"
    },

    {
        userId: 2,
        userFirstName: "Manogya",
        userLastName: "Puli",
        userEmail: "mpulir@uncc.edu",
	password: {salt: "b67de8c581c81f1c", hash: "6503327fb44566a4e3ade27bd58988bc519010ff4b4e0f017651f48a3533a7913ff09a737ef9730d4a54a6c363120b1d10c21c8df41db7c5c7dc5320541bba71"},
        userAddress1: "University Terrace North",
        userAddress2: "Apt H",
        userCity: "Charlotte",
        userState: "NC",
        userZipCode: "28203",
        userCountry: "USA"
    },
    {
        userId: 3,
        userFirstName: "Jake",
        userLastName: "Duan",
        userEmail: "jduanq@uncc.edu",
	password: {salt: "b67de8c581c81f1c", hash: "6503327fb44566a4e3ade27bd58988bc519010ff4b4e0f017651f48a3533a7913ff09a737ef9730d4a54a6c363120b1d10c21c8df41db7c5c7dc5320541bba71"},
        userAddress1: "University Terrace North",
        userAddress2: "Apt H",
        userCity: "Charlotte",
        userState: "NC",
        userZipCode: "28203",
        userCountry: "USA"
}]);

//insert data into Connections collection

db.Connections.insertMany([
  {
    connectionId: 1,
    connectionTopic: 'California Trip',
    connectionName: 'Travelling to Santa Rosa',
    hostedBy:'Wanderer Notes',
    connectionDetails:'Trip to Santa Rosa' ,
    location:'Jack London State Historic Park',
    date:'Tuesday, February 18',
    time: '5PM',
    userId : 2
  },
  {
    connectionId: 2,
    connectionTopic:'California Trip',
    connectionName:'Travelling to San Jose' ,
    hostedBy:'Wanderer Notes',
    connectionDetails: 'Trip to San Jose' ,
    location:'Winchester Mystery House',
    date:'Wednesday, March 11',
    time: '6PM',
    userId : 2
  },
  {
    connectionId: 3,
    connectionTopic: 'California Trip',
    connectionName:'Travelling to San Fransico' ,
    hostedBy:'Wanderer Notes',
    connectionDetails: 'Trip to San Fransico' ,
    location:'Golden Gate Bridge',
    date :'Monday, March 16',
    time : '11:30AM',
    userId: 2
  },
  {
    connectionId: 4,
    connectionTopic: 'Florida Trip',
    connectionName: 'Travelling to Miami' ,
    hostedBy:'Wanderer Notes',
    connectionDetails:'Trip to Miami',
    location:'Miami Beach',
    date:'Tuesday, April 7',
    time: '10AM',
    userId: 3
  },
  {
    connectionId: 5,
    connectionTopic: 'Florida Trip',
    connectionName: 'Travelling to Orlando' ,
    hostedBy:'Wanderer Notes',
    connectionDetails: 'Trip to Orlando' ,
    location:'Universal Studio',
    date:'Wednesday, April 15',
    time: '5PM',
    userId: 3
  },
  {
    connectionId: 6,
    connectionTopic:'Florida Trip',
    connectionName: 'Travelling to Tampa' ,
    hostedBy:'Wanderer Notes',
    connectionDetails: 'Trip to Tampa' ,
    location:'Busch Gardens Tampa Bay',
    date:'Wednesday, April 22',
    time: '3PM',
    userId: 3
  }
]);

> db.UserConnections.insertMany([
{
	"userId" : 1,
	"connectionId" : 7,
	"rsvp" : "Yes"
},
{
	"userId" : 1,
	"connectionId" : 2,
	"rsvp" : "Yes"
}
]);


//find Users

db.Users.find().pretty();

//find Connections

db.Connections.find().pretty();

//find UserConnections

db.UserConnections.find().pretty();
```
