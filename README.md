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
```
