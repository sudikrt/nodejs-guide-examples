const User = require ('../models/user');

exports.getLogin = (req, res, next) => {
    let cookies = {};
    if (req.get ('Cookie')) {
        req.get ('Cookie').split (';').forEach (ele => {
            const tempResp  = ele.trim ().split ("=");
            cookies[tempResp[0]] = tempResp[1];
        });
    }

    console.log ('***** :' + req.session.loggedIn);
    const isLoggedIn = cookies.loggedIn;
    
    console.log (req.session);
    return res.render ('auth/login', {
        docTitle : 'Login', 
        path : '/login',
        isAuthenticated : isLoggedIn
    });
}

exports.postLogin = (req, res, next) => {
    console.log (req.session);
    //res.setHeader ('Set-Cookie', 'loggedIn=true; Max-age=10; Secure');
    app.use ((req,res, next) => {
        User.findById ("60b5daf8307517723e29cc91").then (user => {
            req.session.user = user;
            req.session.loggedIn = true;
            res.redirect ('/');
        }).catch (error => {
            console.log (error);
        })
    })
}