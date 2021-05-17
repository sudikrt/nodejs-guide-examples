const getDb = require ('./../utils/database').getDb;

class Product {
    constructor (title, price, description, imgUrl) {
        this.title = title;
        this.price = price;
        this.description = description;
        this.imgUrl = imgUrl;
    }
    save () {
        const db = getDb  ();
        db.collection ('products').insertOne (this).then (result => console.log (result)).catch (error => console.log (error));
    }
}


module.exports = Product;