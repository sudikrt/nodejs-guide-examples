const path = require ('path');
const express = require ('express');
const router = express.Router ();
const adminData = require ('./admin');
const shopController = require ('../controllers/shop');


router.get ('/', shopController.getIndex);
router.get ('/products', shopController.getProducts);
router.get ('/products/:productId', shopController.getProduct);
// router.get ('/cart', shopController.getCart);
router.post ('/cart', shopController.postCart);
// router.post ('/create-order', shopController.postOrder);
// router.post ('/cart-delete-item', shopController.postCartDeleteItem);
// router.get ('/orders', shopController.getOrders);
//router.get ('/checkout', shopController.getCheckout);
module.exports = router;