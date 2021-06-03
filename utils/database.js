const mongodb = require ('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
    MongoClient.connect (
        'mongodb+srv://I3oGP0zw8HbAQE9q:1mjuPSWejBh13JHX@cluster0.gtc5u.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
        { useUnifiedTopology: true }
    ).then (result => {
        console.log ('connected');
        _db = result.db ();
        callback ();
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

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;