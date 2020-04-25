# web-application-using-node.js-express-mongodb

### Use the following queries to pre populate the database

##### Create the database and collections
```
use WandererNotes;
db.createCollection('Users');
db.createCollection('Connections');
db.createCollection('UserConnections');
```

##### Insert data into Users Collection
```
db.Users.insert([{
	userId: 101,
        userFirstName: "Scott",
        userLastName: "Pilgrim",
        userEmail: "demo1@uncc.edu",
	password: {salt: "b67de8c581c81f1c", passwordHash: "6503327fb44566a4e3ade27bd58988bc519010ff4b4e0f017651f48a3533a7913ff09a737ef9730d4a54a6c363120b1d10c21c8df41db7c5c7dc5320541bba71"},
        userAddress1: "University Terrace Drive",
        userAddress2: "Apt C",
        userCity: "Charlotte",
        userState: "NC",
        userZipCode: "28262",
        userCountry: "USA"
    },

    {
        userId: 102,
        userFirstName: "Bilbo",
        userLastName: "Baggins",
        userEmail: "demo2@uncc.edu",
	password: {salt: "b67de8c581c81f1c", passwordHash: "6503327fb44566a4e3ade27bd58988bc519010ff4b4e0f017651f48a3533a7913ff09a737ef9730d4a54a6c363120b1d10c21c8df41db7c5c7dc5320541bba71"},
        userAddress1: "University Terrace North",
        userAddress2: "Apt H",
        userCity: "Charlotte",
        userState: "NC",
        userZipCode: "28203",
        userCountry: "USA"
    },
    {
    	userId: 0,
	userFirstName: "Admin",
	userLastName: "User",
	userEmail: "admin@uncc.edu",
	password: {salt: "efc2f4dbcc28287c", passwordHash: "322ed2b3d07f34d3c16f6e9ea20450bedac9266e444ddc8d87a01ff772838f8747b28d329919b56732f2b288962604e6ce382991ca4ff4f3c422a40c55a9f678"},
	userAddress1: "University Terrace North",
	userAddress2: "Apt H",
	userCity: "Charlotte",
	userState: "NC",
	userZipCode: "28203",
	userCountry: "USA"
}]);
```

##### Insert data into connections
```
db.Connections.insertMany([{
	connectionId: 1,
	connectionTopic: 'California Trip',
	connectionName: 'Travelling to Santa Rosa',
	hostedBy:'Wanderer Notes',
	connectionDetails:'Trip to Santa Rosa' ,
	location:'Jack London State Historic Park',
	date:'Tuesday, February 18',
	time: '5PM',
	userId : 102
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
	userId : 102
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
	userId: 102
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
	userId: 0
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
	userId: 0
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
	userId: 101
  }
]);
```

##### Demo Login Credentials for the application
Username | Password | Type
---------|----------|-----
admin@uncc.edu | admin12345 | Admin Account
demo1@uncc.edu | qwerty123 | General User
demo2@uncc.edu | qwerty123 | General User
