const path = require ('path');
const express = require ('express');
const router = express.Router ();
const adminData = require ('./admin');
const rootDir = require ('../utils/path');


router.get ('/', (req, res, next) => {
    console.log (adminData.products);
    const products = adminData.products;
    return res.render ('shop', {prods : products, docTitle : 'Shop'});
});

module.exports = router;