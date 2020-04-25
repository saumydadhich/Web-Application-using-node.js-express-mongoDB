const UserConnection = require('./userConnection');
const conndb = require('../Utility/connectionsData');
class UserProfile {
    constructor(userId){
        this.userId = userId;
        this.connections =[];
    }

    
    addConnection(connectionId,rsvp){
        var update=false;
        for(let i=0; i<this.connections.length; i++){
          
            if(this.connections[i].connectionId.connectionId == connectionId){
       
                update=true;
                this.updateConnection(connectionId, rsvp);
            }else{
                console.log("The User does not exist")
            }
        }
        if(update==false)
        {
            console.log(connectionId+'now being pushed');
           
            var newuser = new UserConnection(conndb.getConnection(connectionId), rsvp);
            this.connections.push(newuser);
        }

        return this.connections;
    }


    removeConnection(connectionId){
        var newconns=[];
        console.log('REMOVE CONNECTION INVOKED NOW'+this.connections);
        for(let i=0;i<this.connections.length;i++){
            if(this.connections[i].connectionId.connectionId != connectionId){
                newconns.push(this.connections[i]);
            }else{
                console.log("The User does not exist")
            }

        }
        this.connections=newconns;
        console.log('REMOVE CONNECTION INVOKED NOW'+this.connections);
      
    }


    updateConnection(connectionId, newvalue){
        
            for(var i=0; i<this.connections.length; i++){
                if(this.connections[i].connectionId.connectionId == connectionId && this.connections[i].rsvp !== newvalue){
                    this.connections[i].rsvp = newvalue;
                }
            }
        
        return this.connections;
    }


    updateRSVP( i, value){
 
        if(connections[i].rsvp !== value){
            connections[i].rsvp = value;
        }
        return connections;
    }


    getUserConnections() {
        return this.connections;
    }

   
}

module.exports = UserProfile;