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
    
    product.save ().then ( result => {
        console.log (result);
        console.log ('Created a product');
        res.redirect ('/admin/products');
    }).catch (error => {
        console.log (error);
    });
}

exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    if (!editMode) {
        res.redirect ('/');
    }
    Product.findById (req.params.productid)
    .then (product => {
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

    const product = new Product (
        title,
        price,
        description,
        imgUrl,
        productId
    );
    product.save ().then (product => {
        res.redirect ('/admin/products');   
    })
    .catch (error => {
        console.log (error);
    })
}
exports.deleteProduct = (req, res, next) => {
    const productId = req.body.productId;
    Product.deleteById (productId).then (result => {
        res.redirect ('/admin/products');
    }).catch (err => console.log (err));
       
}