//root file node js file execute
const express = require ('express');

const app = express (); //express as function

//next is function to allow the request to travel on next middle ware
app.use ( (req, res, next) => {
    console.log ('In middle ware')
    next (); // we need to allow otehr middlware to execute . Allow request to continue to next middle ware

});

app.use ( (req, res, next) => {
    console.log ('In another middle ware')
    res.send ('<h1>Hello</h1>');
});

app.listen(5001);