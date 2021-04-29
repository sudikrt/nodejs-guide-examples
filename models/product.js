const fs = require ('fs');
const path = require ('path');

const Cart = require ('./cart');

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
        getProductsFromFile ( products => {
            if (this.id) {
                const existingProductIndex = products.findIndex (p => p.id === this.id); 
                const updatedProducts = [...products];
                updatedProducts [existingProductIndex] = this;

                fs.writeFile (p, JSON.stringify (updatedProducts), (eror) => {
                    console.log (eror);
                });                
            } else {
                this.id = Math.random ().toString ();
                products.push (this);

                fs.writeFile (p, JSON.stringify (products), (eror) => {
                    console.log (eror);
                });
            }
        });
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
        getProductsFromFile (cb);        
    }
    static findById (id, cb) {
        getProductsFromFile (products => {
            const product = products.find (ele => ele.id === id);
            cb (product);
        })
    }
}