const express = require ('express');
const bodyParser = require ('body-parser');
const path = require ('path');
const mongoose = require ('mongoose');
const session = require ('express-session');
const MongoDBStore = require ('connect-mongodb-session')(session);

const MONGODB_URI = 'mongodb+srv://I3oGP0zw8HbAQE9q:1mjuPSWejBh13JHX@cluster0.gtc5u.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

const app = express (); //express as function
const store = new MongoDBStore ({
    uri : MONGODB_URI,
    collection : 'sessions'
});


app.set ('view engine', 'ejs');
const adminRoutes =  require ('./routes/admin');
const shopRoutes =  require ('./routes/shop');
const authRoutes =  require ('./routes/auth');
const erorController = require ('./controllers/error');

const User = require ('./models/user');

//app.use (express.json ()); // registers a midlleware   the request body parsing
app.use (bodyParser.urlencoded ({extended : false})); // registers a midlleware   the request body parsing

app.use (express.static (path.join (__dirname, 'public')))

app.use (session ({
    secret : 'my secret',
    resave : false,
    saveUninitialized : false,
    store : store
}));

app.use ( (req,res, next) => {
    if (!req.session.user) {
        return next ();
    }
    User.findById (req.session.user._id).then (user => {
        req.user = user;
        next ();
    }).catch (error => {
        console.log (error);
    })
})
app.use ('/admin', adminRoutes);
app.use (shopRoutes);
app.use (authRoutes);
app.use ('/', erorController.get404);

mongoose.connect (
    MONGODB_URI
).then (() => {
    User.findOne ().then (user => {
        if (!user) {
            const newUser = new User ({
                name : 'Sud',
                email  : 'sud@test.com',
                cart : {
                    items : []
                }
            });
            newUser.save();
        }
    })
    app.listen (5004);
}).catch (error => {
    console.log (error);
})

