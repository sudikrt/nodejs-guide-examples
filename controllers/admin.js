const Product = require ('../models/product');

exports.getAddProduct = (req, res, next) => {
    res.render ('admin/edit-product', 
        {'docTitle' : 'Add Product', 
            path:'/admin/edit-product', 
            activeAddProduct : true, 
            formCSS : true,
            editing : false
        }
    );
}
exports.addNewProduct = (req, res, next)=> {
    const title = req.body.title;
    const imgUrl = req.body.imgUrl;
    const price = req.body.price;
    const description = req.body.description;

    const product = new Product (title, price, description, imgUrl);
    // sequelize automaticlly adds special methods as soon as we create the association
    product.save ().then ( result => {
        console.log (result);
        console.log ('Created a product');
        res.redirect ('/admin/products');
    }).catch (error => {
        console.log (error);
    });
    // Product.create ({
    //     title : title,
    //     price : price,
    //     imgUrl : imgUrl,
    //     description : description,
    //     userId : req.user.id
    // }).then ( result => {
    //     console.log (result);
    //     console.log ('Created a product');
    //     res.redirect ('/admin/products');
    // }).catch (error => {
    //     console.log (error);
    // });
}

exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    if (!editMode) {
        res.redirect ('/');
    }
    // Product.findByPk (req.params.productid)
    // .then (product => {
    //     res.render ('admin/edit-product', 
    //         {'docTitle' : 'Edit Product', 
    //             path:'/admin/edit-product', 
    //             editing : editMode,
    //             product : product
    //         }
    //     );
    // }).catch (err => {
    //     console.log (err);
    //     res.redirect ('/'); 
    // });

    //you can leveage user.getProducts ()
    req.user.getProducts ({ where : {id : req.params.productid}}).then (products => {
        const product = products[0];
        res.render ('admin/edit-product', 
            {'docTitle' : 'Edit Product', 
                path:'/admin/edit-product', 
                editing : editMode,
                product : product
            }
        );
    }).catch (err => {
        console.log (err);
        res.redirect ('/'); 
    });
}
exports.getProducts = (req, res, next) => {
    // Product.fetchAll ( products => {
    //     return res.render ('admin/products', {
    //         prods : products, 
    //         docTitle : 'Admin Products', 
    //         path : '/admin/products'
    //     });
    // });
    Product.findAll ().then (products => {
        return res.render ('admin/products', {
            prods : products, 
            docTitle : 'Admin Products', 
            path : '/admin/products'
        });
    }).catch ( errors => {
        console.log ('err : ' + errors)
    });
}
exports.postEditProduct = (req, res, next) => {
    const productId = req.body.productId;

    const title = req.body.title;
    const imgUrl = req.body.imgUrl;
    const price = req.body.price;
    const description = req.body.description;

    Product.findByPk (productId)
    .then (product => {
        product.title = title;
        product.imgUrl = imgUrl;
        product.price = price;
        product.description = description;

        return product.save ();
    })
    .then (product => {
        res.redirect ('/admin/products');   
    })
    .catch (error => {
        console.log (error);
    })
}
exports.deleteProduct = (req, res, next) => {
    const productId = req.body.productId;
    Product.findByPk (productId).then (product => {
        return product.destroy ()
    }).then (result => {
        res.redirect ('/admin/products');
    }).catch (err => console.log (err));
       
}