const express = require ('express');
const bodyParser = require ('body-parser');
const path = require ('path');

const app = express (); //express as function

app.set ('view engine', 'ejs');
// const adminRoutes =  require ('./routes/admin');
// const shopRoutes =  require ('./routes/shop');
const erorController = require ('./controllers/error');

const mongoConnect = require ('./utils/database');

//app.use (express.json ()); // registers a midlleware   the request body parsing
app.use (bodyParser.urlencoded ({extended : false})); // registers a midlleware   the request body parsing

app.use (express.static (path.join (__dirname, 'public')))

app.use ((req,res, next) => {
    // User.findByPk (1).then (user => {
    //     req.user = user;
    //     next ();
    // }).catch (error => {
    //     console.log (error);
    // })
    next ();
})

// app.use ('/admin', adminRoutes);
// app.use (shopRoutes);

app.use ('/', erorController.get404);

mongoConnect((client) => {
    console.log ('client' + client);
    app.listen ('5001');
})
