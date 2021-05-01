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
    const product  = new Product (null, title, imgUrl, description, +price);
    product.save ()
    .then (() => {
        res.redirect ('/');
    })
    .catch (err => console.log (err));
}

exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    if (!editMode) {
        res.redirect ('/');
    }
    Product.findById (req.params.productid, (product) => {
        if (!product) {
            res.redirect ('/'); 
        }
        res.render ('admin/edit-product', 
            {'docTitle' : 'Edit Product', 
                path:'/admin/edit-product', 
                editing : editMode,
                product : product
            }
        );
    })
}
exports.getProducts = (req, res, next) => {
    Product.fetchAll ( products => {
        return res.render ('admin/products', {
            prods : products, 
            docTitle : 'Admin Products', 
            path : '/admin/products'
        });
    });
}
exports.postEditProduct = (req, res, next) => {
    const productId = req.body.productId;

    const title = req.body.title;
    const imgUrl = req.body.imgUrl;
    const price = req.body.price;
    const description = req.body.description;
    const product  = new Product (productId, title, imgUrl, description, +price);
    product.save ();
    res.redirect ('/admin/products');   
}
exports.deleteProduct = (req, res, next) => {
    const productId = req.body.productId;
    Product.deleteById (productId);
    res.redirect ('/admin/products');   
}