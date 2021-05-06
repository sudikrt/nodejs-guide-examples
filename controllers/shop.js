const Product = require ('../models/product');
const Cart = require ('../models/cart');

exports.getProducts = (req, res, next) => {

    Product.findAll ().then (products => {
        return res.render ('shop/product-list', {
            prods : products, 
            docTitle : 'All Products', 
            path : '/products', 
            hasProducts : products.length > 0, 
            activeShop : true, 
            productCSS : true});
    }).catch ( errors => {
        console.log ('err : ' + errors)
    });
}
exports.getProduct = (req, res, next) => {
    const productId = req.params.productId;
    console.log ();
    Product.findAll ({where : {id : productId}})
    .then ( (products) => {
            res.render ('shop/product-detail', {product : products[0], docTitle : products[0].title, path : '/products'})
        }
    ).catch (err => console.log (err));
    // Product.findByPk (productId)
    // .then ( (product) => {
    //         res.render ('shop/product-detail', {product : product, docTitle : product.title, path : '/products'})
    //     }
    // ).catch (err => console.log (err));
}

exports.getIndex = (req, res, next) => {
    Product.findAll ().then (products => {
        return res.render ('shop/index', {
            prods : products, 
            docTitle : 'Shop', 
            path : '/shop', 
            hasProducts : products.length > 0, 
            activeShop : true, 
            productCSS : true});
    }).catch ( errors => {
        console.log ('err : ' + errors)
    });
}

exports.getCart = (req, res, next) => {
    Cart.getCart (cart => {
        Product.fetchAll ( products => {
            const cartProducts = [];
            for (product of products) {
                const cartProductData = cart.products.find (prod => prod.id === product.id)
                if (cartProductData) {
                    cartProducts.push ({productData : product, qty : cartProductData.qty});
                }
            }
            return res.render ('shop/cart', {
                prods : products, 
                docTitle : 'Your cart', 
                path : '/cart', 
                products : cartProducts
            });
        });
    });
}
exports.postCart = (req, res, next) => {
    const productId = req.body.productId;
    Product.findById (productId, (product) => {
        Cart.addProduct (productId,product.price);
    })
    res.redirect ('/cart');
}
exports.postCartDeleteItem = (req, res, next) => {
    const productId = req.body.productId;
    Product.findById (productId, (product) => {
        Cart.deleteProduct (productId,product.price);
        res.redirect ('/cart');
    });
}



exports.getOrders = (req, res, next) => {
    Product.fetchAll ( products => {
        return res.render ('shop/orders', {
            prods : products, 
            docTitle : 'Orders', 
            path : '/orders', 
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