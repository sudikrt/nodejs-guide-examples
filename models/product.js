const fs = require ('fs');
const path = require ('path');

const Cart = require ('./cart');


const db = require ('../utils/database');

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
    constructor (id, title,  imgUrl, description, price) {
        this.id = id;
        this.title =  title;
        this.imgUrl = imgUrl;
        this.description = description;
        this.price = price;
    }
    save () {
        return db.execute (
            'INSERT INTO products (title, price, imgUrl, description) VALUES (?, ?, ?, ?)',
            [this.title, this.price, this.imgUrl, this.description]
        );
    }

    static deleteById (id) {
        getProductsFromFile (products => {
            const updatedProducts = products.filter (ele => ele.id !== id);
            const product = products.find (prod => id === prod.id);
            fs.writeFile (p, JSON.stringify (updatedProducts), (eror) => {
                console.log (eror);
                if (!eror) {
                    Cart.deleteProduct (id, product.price);
                }
            });
        })   
    }
    static fetchAll (cb) {
        return db.execute ('SELECT * FROM products');
    }
    static findById (id) {
        return db.execute ('SELECT * FROM products WHERE products.id=?', [id]);
    }
}