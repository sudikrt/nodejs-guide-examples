const Product = require ('../models/product');

exports.getAddProduct = (req, res, next) => {
    res.render ('add-product', 
        {'docTitle' : 'Add Product', 
            path:'/admin/add-product', 
            activeAddProduct : true, 
            formCSS : true
        }
    );
}
exports.addNewProduct = (req, res, next)=> {
    const product  = new Product (req.body.title);
    product.save ();
    res.redirect ('/');
}
exports.getProducts = (req, res, next) => {
    Product.fetchAll ( products => {
        return res.render ('shop', {
            prods : products, 
            docTitle : 'Shop', 
            path : '/shop', 
            hasProducts : products.length > 0, 
            activeShop : true, 
            productCSS : true});
    });
}