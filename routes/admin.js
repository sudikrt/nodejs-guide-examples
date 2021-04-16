const path = require ('path')
const express = require ('express');
const router = express.Router ();

const rootDir = require ('../utils/path');

products = [];

router.get ('/add-product', (req, res, next) => {
    res.render ('add-product', {'docTitle' : 'Add Product'});
});
router.post ('/add-product', (req, res, next)=> {
    products.push ({
        title : req.body.title
    })
    res.redirect ('/');
})


// path can be used if methods differs


module.exports.routes = router;
exports.products = products;
