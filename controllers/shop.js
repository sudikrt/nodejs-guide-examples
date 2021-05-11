const Product = require ('../models/product');

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
    //console.log (req.user.cart);// this will give undefined
    req.user.getCart ().then (cart => {
        return cart.getProducts ().then (products => {
            return res.render ('shop/cart', {
                    prods : products, 
                    docTitle : 'Your cart', 
                    path : '/cart', 
                    products : products
                });
        }).catch (error => {
            console.log (error);
        })
    }).catch (error => {
        console.log ('error');
    });

    // Cart.getCart (cart => {
    //     Product.fetchAll ( products => {
    //         const cartProducts = [];
    //         for (product of products) {
    //             const cartProductData = cart.products.find (prod => prod.id === product.id)
    //             if (cartProductData) {
    //                 cartProducts.push ({productData : product, qty : cartProductData.qty});
    //             }
    //         }
    //         return res.render ('shop/cart', {
    //             prods : products, 
    //             docTitle : 'Your cart', 
    //             path : '/cart', 
    //             products : cartProducts
    //         });
    //     });
    // });
}
exports.postCart = (req, res, next) => {
    const productId = req.body.productId;
    let fetchedCart;
    req.user.getCart ().then (cart => {
        fetchedCart = cart;
        return cart.getProducts ({where : {id : productId}})
    }).then (products => {
        let product;
        if (products.length > 0) {
            product = products[0];
        }
        let newQuantity = 1;
        if (product) {
            const oldQuantity  =product.cartItem.quantity;
            newQuantity = oldQuantity + 1;
            return fetchedCart.addProduct (product, {through : {quantity : newQuantity}})
        } 
        return Product.findByPk (productId)
        .then (prod => {
            return fetchedCart.addProduct (prod, {through:   {quantity : newQuantity }});
        })
    })
    .then ( () => {
        res.redirect ('/cart');
    }).catch (error => {
        console.log (error);
    })
    // const productId = req.body.productId;
    // Product.findById (productId, (product) => {
    //     Cart.addProduct (productId,product.price);
    // })
    // res.redirect ('/cart');
}
exports.postCartDeleteItem = (req, res, next) => {
    const productId = req.body.productId;
    req.user.getCart ().then (cart => {
        cart.getProducts({where : {id : productId}}).then (products => {
            const product = products[0];
            return product.cartItem.destroy ();
        })
    }).then (() => {
        res.redirect ('/cart');
    })
    .catch (err => {
        console.log (err);
    })
    // Product.findById (productId, (product) => {
    //     Cart.deleteProduct (productId,product.price);
    //     res.redirect ('/cart');
    // });
}
exports.postOrder = (req, res, next) => {
    let fetchedCart;
    req.user.getCart ().then (cart => {
        fetchedCart = cart;
        return cart.getProducts ();
    }).then (products => {
        return req.user
        .createOrder ()
        .then (order => {
                order.addProducts (products.map (product => {
                    product.orderItem = {
                        quantity : product.cartItem.quantity
                    }
                    return product;
                })
            )
        }).catch (error => {
            console.log (error);
        });
    }).then (result => {
        return fetchedCart.setProducts (null);
    }).then (cart => {
        res.redirect ('/orders');
    })
    .catch (error => {
        console.log (error);
    })
}



exports.getOrders = (req, res, next) => {
    req.user.getOrders ({include : ['products']}).then (orders => {
        console.log (orders);
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