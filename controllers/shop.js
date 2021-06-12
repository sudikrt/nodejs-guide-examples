const Product = require ('../models/product');
const Order = require('../models/order');

exports.getProducts = (req, res, next) => {

    Product.find ().then (products => {
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

    Product.findById (productId)
    .then ( (product) => {
            res.render ('shop/product-detail', {product : product, docTitle : product.title, path : '/products'})
        }
    ).catch (err => console.log (err));
}

exports.getIndex = (req, res, next) => {
    Product.find ().then (products => {
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
    req.user
    .populate ('cart.items.productId')
    .execPopulate ()
    .then (user => {
        const products = user.cart.items;
        return res.render ('shop/cart', {
            prods : products, 
            docTitle : 'Your cart', 
            path : '/cart', 
            products : products
        });
    }).catch (error => {
        console.log ('error');
    });
}
exports.postCart = (req, res, next) => {
    const productId = req.body.productId;
    Product.findById (productId)
    .then (product => {
        return req.user.addToCart (product);
    }).then (result => {
        res.redirect ('/cart');
    });
}
exports.postCartDeleteItem = (req, res, next) => {
    const productId = req.body.productId;
    req.user.deleteItemFromCart (productId).then (result => {
        res.redirect ('/cart');
    }).catch (err => {
        console.log (err);
    });
}
exports.postOrder = (req, res, next) => {

    req.user
    .populate ('cart.items.productId')
    .execPopulate ()
    .then (user => {
        const products = user.cart.items.map (i => {
            return {quantity : i.quantity, product : {... i.productId._doc} }
        });
        const order = new Order  ({
            user : {
                name : req.user.name,
                userId : req.user
            },
            products : products
        });
        return order.save ();
    }).then (result => {
        return req.user.clearCart ();
    }).then (result => {
        res.redirect ('/orders');
    })
    .catch (error => {
        console.log (error);
    })
}



exports.getOrders = (req, res, next) => {
    Order.find ({'user.userId' : req.user._id})
    .then (orders => {
        return res.render ('shop/orders', {
            orders : orders, 
            docTitle : 'Orders', 
            path : '/orders', 
        });
    }).catch (error => {
        console.log (error);
    })
}
// exports.getCheckout = (req, res, next) => {
//     Product.fetchAll ( products => {
//         return res.render ('shop/checkout', {
//             prods : products, 
//             docTitle : 'Checkout', 
//             path : '/checkout'
//         });
//     });
// }