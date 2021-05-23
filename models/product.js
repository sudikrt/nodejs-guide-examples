const getDb = require ('./../utils/database').getDb;
const mongoDB = require ('mongodb');
class Product {
    constructor (title, price, description, imgUrl) {
        this.title = title;
        this.price = price;
        this.description = description;
        this.imgUrl = imgUrl;
    }
    save () {
        const db = getDb  ();
        return db.collection ('products').insertOne (this).then (result => console.log (result)).catch (error => console.log (error));
    }
    static findAll () {
        const db = getDb  ();
        return db.collection ('products')
        .find ()
        .toArray ()
        .then (product => product)
        .catch (error => {
            console.log (error); 
        })
    }
    static findById (productId) {
        const db = getDb ();
        //return db.collection ('products').find ({_id : new (mongoDB.ObjectId(productId)}).next ().then (product => product).catch (error => console.log ('error'));
    }
}


module.exports = Product;