const path = require ('path');
const express = require ('express');
const router = express.Router ();
const adminData = require ('./admin');
const rootDir = require ('../utils/path');


router.get ('/', (req, res, next) => {
    console.log (adminData.products);
    return res.render ('shop');
});

module.exports = router;