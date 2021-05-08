const express = require ('express');
const bodyParser = require ('body-parser');
const path = require ('path');

const sequelize = require ('./utils/database');
const Product = require ('./models/product');
const User = require ('./models/user');
const Cart = require ('./models/cart');
const CartItem = require ('./models/cart-item');

const app = express (); //express as function

app.set ('view engine', 'ejs');
const adminRoutes =  require ('./routes/admin');
const shopRoutes =  require ('./routes/shop');
const erorController = require ('./controllers/error');

//app.use (express.json ()); // registers a midlleware   the request body parsing
app.use (bodyParser.urlencoded ({extended : false})); // registers a midlleware   the request body parsing

app.use (express.static (path.join (__dirname, 'public')))

app.use ((req,res, next) => {
    User.findByPk (1).then (user => {
        req.user = user;
        next ();
    }).catch (error => {
        console.log (error);
    })
})

app.use ('/admin', adminRoutes);
app.use (shopRoutes);

app.use ('/', erorController.get404);

Product.belongsTo (User, {constraints : true, onDelete : 'CASCADE'});
User.hasMany (Product);


User.hasOne (Cart);
Cart.belongsTo (User);
Cart.belongsToMany (Product, {through : CartItem });
Product.belongsToMany (Cart, {through : CartItem });

//sequelize.sync ({force:true})
sequelize.sync ()
.then (result => {
    return User.findByPk (1);
}).then (user => {
    if (!user) {
        return User.create ({
            name : 'Geek',
            email : 'geek@mail.com'
        })
    }
    return user;//Promise.resolve (user);
}).then ( user => {
    return user.createCart ();
}).then (cart => {
    app.listen(5001);
})
.catch (error => {
    console.log (error); 
});