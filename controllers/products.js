exports.getAddProduct = (req, res, next) => {
    res.render ('add-product', 
        {'docTitle' : 'Add Product', 
            path:'/admin/add-product', 
            activeAddProduct : true, 
            formCSS : true
        }
    );
}