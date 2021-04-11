const express = require ('express');
const router = express.Router ();


router.get ('/add-product', (req, res, next) => {
    res.send (`<h1>Add Product</h1>
        <form method="POST" action="/admin/add-product">
            <input type="text" name="title"/>
            <input type="submit" 
        </form>
    `);
});
router.post ('/add-product', (req, res, next)=> {
    console.log (req.body);
    res.redirect ('/');
})


// path can be used if methods differs


module.exports = router