const fs = require ('fs');
const path = require ('path');
const p = path.join (path.dirname (require.main.filename), 'data', 'products.json');
const getProductsFromFile = cb => {
    fs.readFile (p, (error, data) => {
        let products = [];
        
        if (!error) {
            products = JSON.parse (data);
        }

        cb (products);
    });
}

module.exports = class Product {
    constructor (title,  imgUrl, description, price) {
        this.title =  title;
        this.imgUrl = imgUrl;
        this.description = description;
        this.price = price;
    }
    save () {
        this.id = Math.random ().toString ();
        getProductsFromFile ( products => {
            products.push (this);

            fs.writeFile (p, JSON.stringify (products), (eror) => {
                console.log (eror);
            });
        });
    }

    static fetchAll (cb) {
        getProductsFromFile (cb);        
    }
    static findById (id, cb) {
        getProductsFromFile (products => {
            const product = products.find (ele => ele.id === id);
            cb (product);
        })
    }
}