const express = require ('express');
const bodyParser = require ('body-parser');
const path = require ('path');

const app = express (); //express as function

app.set ('view engine', 'pug');
const adminRoutes =  require ('./routes/admin');
const shopRoutes =  require ('./routes/shop');

//app.use (express.json ()); // registers a midlleware   the request body parsing
app.use (bodyParser.urlencoded ({extended : false})); // registers a midlleware   the request body parsing

app.use (express.static (path.join (__dirname, 'public')))
app.use ('/admin', adminRoutes.routes);
app.use (shopRoutes);

app.use ('/', (req, res, next) => {
    res.status (404).render ('404');
})

app.listen(5001);