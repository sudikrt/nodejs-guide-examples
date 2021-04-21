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
    constructor (title) {
        this.title =  title;
    }
    save () {
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
}