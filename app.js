const express = require ('express');
const bodyParser = require ('body-parser');

const app = express (); //express as function

const adminRoutes =  require ('./routes/admin');
const shopRoutes =  require ('./routes/shop');

//app.use (express.json ()); // registers a midlleware   the request body parsing
app.use (bodyParser.urlencoded ({extended : false})); // registers a midlleware   the request body parsing

app.use ('/admin', adminRoutes);
app.use (shopRoutes);

app.use ('/', (req, res, next) => {
    res.status (404).send ('Page not found'); 
})

app.listen(5001);