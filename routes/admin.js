const path = require ('path')
const express = require ('express');
const router = express.Router ();

const adminController = require ('../controllers/admin');
const isAuth = require ('../middleware/is-auth');


router.get ('/add-product', isAuth, adminController.getAddProduct);
router.post ('/add-product', isAuth, adminController.addNewProduct);
router.get ('/products', isAuth, adminController.getProducts);
router.get ('/edit-product/:productid', isAuth, adminController.getEditProduct);
router.post ('/edit-product/',  isAuth, adminController.postEditProduct);
router.post ('/delete-product', isAuth, adminController.deleteProduct);
module.exports = router;
