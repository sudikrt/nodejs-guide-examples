//root file node js file execute
const express = require ('express');
const bodyParser = require ('body-parser');

const app = express (); //express as function

//app.use (express.json ()); // registers a midlleware   the request body parsing
app.use (bodyParser.urlencoded ({extended : false})); // registers a midlleware   the request body parsing

//before handling generic middle ware, it matches the url after the / if curent middle ware doesn't match
//it will navigate the default middle ware
app.use ('/add-product', (req, res, next) => {
    res.send (`<h1>Add Product</h1>
        <form method="POST" action="/product">
            <input type="text" name="title"/>
            <input type="submit" 
        </form>
    `);
});
app.post ('/product', (req, res, next)=> {
    console.log (req.body);
    res.redirect ('/');
})

// when we say '/ (slash) ' if we make the ur; localhose:5001/add product it will land to same
app.use ('/', (req, res, next) => {
    res.send ('<h1>Hello</h1>');
});

app.listen(5001);