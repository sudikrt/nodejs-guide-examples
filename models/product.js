const getDb = require ('./../utils/database').getDb;
const mongoDB = require ('mongodb');
class Product {
    constructor (title, price, description, imgUrl, id) {
        this.title = title;
        this.price = price;
        this.description = description;
        this.imgUrl = imgUrl;
        this._id = new mongoDB.ObjectId id;
    }
    save () {
        const db = getDb  ();
        let dbOp;
        if (this._id) {
            dbOp =  db.collection ('products').updateOne ({_id : new mongoDB.ObjectId (this._id)}, 
                {$set : this}
            );
        } else {
            dbOp =  db.collection ('products').insertOne (this);
        }
        return dbOp.then (result => console.log (result)).catch (error => console.log (error))
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
        return db.collection ('products').find ({_id : new mongoDB.ObjectId(productId)}).next ().then (product => product).catch (error => console.log ('error'));
    }
}


module.exports = Product;