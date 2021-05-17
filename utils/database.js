const mongodb = require ('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
    MongoClient.connect (
        'mongodb+srv://I3oGP0zw8HbAQE9q:I3oGP0zw8HbAQE9q@cluster0.gtc5u.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
    ).then (result => {
        console.log ('connected');
        _db = result.db ();
        callback (result);
    }).catch (error => {
        console.log ('err :' + error);
        throw error;
    })
}

const getDb = () => {
    if (_db) {
        return _db;
    }
    throw 'No database found !';
}

// module.exports = mongoConnect;

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;