const path = require ('path')
const express = require ('express');
const router = express.Router ();

const adminController = require ('../controllers/admin');

router.get ('/add-product',  adminController.getAddProduct);
router.post ('/add-product', adminController.addNewProduct);
router.get ('/products', adminController.getProducts);
router.get ('/edit-product/:productid',  adminController.getEditProduct);
router.post ('/edit-product/',  adminController.postEditProduct);
router.post ('/delete-product', adminController.deleteProduct);
module.exports = router;
