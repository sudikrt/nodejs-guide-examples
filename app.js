const express = require ('express');
const bodyParser = require ('body-parser');
const path = require ('path');
const mongoose = require ('mongoose');


const app = express (); //express as function

app.set ('view engine', 'ejs');
const adminRoutes =  require ('./routes/admin');
const shopRoutes =  require ('./routes/shop');
const erorController = require ('./controllers/error');

const User = require ('./models/user');

//app.use (express.json ()); // registers a midlleware   the request body parsing
app.use (bodyParser.urlencoded ({extended : false})); // registers a midlleware   the request body parsing

app.use (express.static (path.join (__dirname, 'public')))

app.use ((req,res, next) => {
    User.findById ("60b5daf8307517723e29cc91").then (user => {
        req.user = new User (user.name, user.email, user.cart, user._id);
        next ();
    }).catch (error => {
        console.log (error);
    })
})

app.use ('/admin', adminRoutes);
app.use (shopRoutes);

app.use ('/', erorController.get404);

mongoose.connect (
    'mongodb+srv://I3oGP0zw8HbAQE9q:1mjuPSWejBh13JHX@cluster0.gtc5u.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
).then (() => {
    app.listen (5004);
}).catch (error => {
    console.log (error);
})

