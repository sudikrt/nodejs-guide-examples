const User = require ('../models/user');
const bCrypt = require ('bcryptjs');

exports.getLogin = (req, res, next) => {
    // let cookies = {};
    // if (req.get ('Cookie')) {
    //     req.get ('Cookie').split (';').forEach (ele => {
    //         const tempResp  = ele.trim ().split ("=");
    //         cookies[tempResp[0]] = tempResp[1];
    //     });
    // }

    // console.log ('***** :' + req.session.loggedIn);
    // const isLoggedIn = cookies.loggedIn;
    
    console.log (req.session);
    return res.render ('auth/login', {
        docTitle : 'Login', 
        path : '/login',
        isAuthenticated : false
    });
}

exports.postLogin = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    User.findOne ({email : email})
    .then (user => {
        if (!user) {
            return res.redirect ('/login');
        }

        bCrypt.compare (password, user.password)
        .then ( result => {
            if (result) {
                req.session.user = user;
                req.session.isLoggedIn = true;
                return req.session.save ( error => {
                    console.log (error);
                    res.redirect ('/');
                });
            } else {
                return res.redirect ('/login');    
            }
        }).catch (error => {
            console.log (error);
            return res.redirect ('/login');
        })
    }).catch (error => {
        console.log (error);
        return res.redirect ('/login');
    })
}
exports.postLogout = (req, res, next) => {
    req.session.destroy ( error => {
        console.log (error);
        res.redirect ('/');
    })
}
exports.postSignup = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;

    User.findOne ({email : email})
    .then (userDoc => {
        if (userDoc) {
            return res.redirect ('/signup')
        } else {
            return bCrypt.hash (password, 12)
            .then (hashedPassword => {
                const user = new User ({
                    email : email,
                    password : hashedPassword,
                    cart : {items : []}
                })
                return user.save ();
            })
            .then (result => {
                return res.redirect ('/login');
            });
           
        }
    })
    .catch (error => {
        console.log ('Error :' + error);
    });
};

exports.getSignup = (req, res, next) => {
    res.render('auth/signup', {
      path: '/signup',
      docTitle: 'Signup',
      isAuthenticated: false
    });
};
  