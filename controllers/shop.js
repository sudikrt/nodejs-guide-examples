const Product = require ('../models/product');


exports.getProducts = (req, res, next) => {
    Product.fetchAll ( products => {
        return res.render ('shop/product-list', {
            prods : products, 
            docTitle : 'All Products', 
            path : '/products', 
            hasProducts : products.length > 0, 
            activeShop : true, 
            productCSS : true});
    });
}

exports.getIndex = (req, res, next) => {
    Product.fetchAll ( products => {
        return res.render ('shop/index', {
            prods : products, 
            docTitle : 'Shop', 
            path : '/shop', 
            hasProducts : products.length > 0, 
            activeShop : true, 
            productCSS : true});
    });
}

exports.getCart = (req, res, next) => {
    Product.fetchAll ( products => {
        return res.render ('shop/cart', {
            prods : products, 
            docTitle : 'Your cart', 
            path : '/cart', 
        });
    });
}

exports.getCheckout = (req, res, next) => {
    Product.fetchAll ( products => {
        return res.render ('shop/checkout', {
            prods : products, 
            docTitle : 'Checkout', 
            path : '/checkout'
        });
    });
}