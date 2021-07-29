const path = require ('path');
const express = require ('express');
const router = express.Router ();
const adminData = require ('./admin');
const shopController = require ('../controllers/shop');
const isAuth = require ('../middleware/is-auth');


router.get ('/', shopController.getIndex);
router.get ('/products', shopController.getProducts);
router.get ('/products/:productId', shopController.getProduct);
router.get ('/cart', isAuth, shopController.getCart);
router.post ('/cart', isAuth, shopController.postCart);
router.post ('/create-order', isAuth, shopController.postOrder);
router.post ('/cart-delete-item', isAuth, shopController.postCartDeleteItem);
router.get ('/orders', isAuth, shopController.getOrders);
//router.get ('/checkout', shopController.getCheckout);
module.exports = router;