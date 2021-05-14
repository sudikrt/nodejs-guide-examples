const mongodb = require ('mongodb');
const MongoClient = mongodb.MongoClient;

const mongoConnect = (callback) => {
    MongoClient.connect (
        'mongodb+srv://I3oGP0zw8HbAQE9q:I3oGP0zw8HbAQE9q@cluster0.gtc5u.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
    ).then (result => {
        console.log ('connected');
        callback (result);
    }).catch (error => {
        console.log ('err :' + error);
    })
}

module.exports = mongoConnect;