const Product = require ('../models/product');


exports.getAddProduct = (req, res, next) => {
    res.render ('admin/edit-product', 
        {'docTitle' : 'Add Product', 
            path:'/admin/add-product', 
            activeAddProduct : true, 
            formCSS : true,
            editing : false,
            isAuthenticated : req.session.isLoggedIn
        }
    );
}
exports.addNewProduct = (req, res, next)=> {
    const title = req.body.title;
    const imgUrl = req.body.imgUrl;
    const price = req.body.price;
    const description = req.body.description;

    const product = new Product (
        {
            title : title, 
            price : price, 
            description : description, 
            imgUrl : imgUrl,
            userId : req.session.user
        }
    );
    
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
                product : product,
                isAuthenticated : req.session.isLoggedIn
            }
        );
    }).catch (err => {
        console.log (err);
        res.redirect ('/'); 
    });
}
exports.getProducts = (req, res, next) => {
    
    Product.find ()
    // .select ('title price -_id')
    // .populate ('userId', 'name')
    .then (products => {
        console.log (products)
        return res.render ('admin/products', {
            prods : products, 
            docTitle : 'Admin Products', 
            path : '/admin/products',
            isAuthenticated : req.session.isLoggedIn
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

    Product.findById (productId)
    .then (product => {
        product.title = title;
        product.imgUrl = imgUrl;
        product.price = price;
        product.description = description ;
        return product.save ()
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
    Product.findByIdAndRemove (productId).then (result => {
        res.redirect ('/admin/products');
    }).catch (err => console.log (err));
       
}