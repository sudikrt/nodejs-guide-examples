const dbRef = require ('../utils/database');
const mongoDB = require ('mongodb');

const ObjectId = mongoDB.ObjectId;

class User {
    constructor (userName, email) {
        this.userName = userName;
        this.email = email;
    }
    save () {
        const db = dbRef ();
        return db.collection ('users').insertOne (this);
    }
    static findById (userId) {
        const db = dbRef ();
        return db.collection ('users').find ( {_id : new ObjectId (userId)}).next ();
    }
}

module.exports = User;