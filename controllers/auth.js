const User = require ('../models/user');

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
    console.log (req.session);
    //res.setHeader ('Set-Cookie', 'loggedIn=true; Max-age=10; Secure');
    User.findById ("60b5daf8307517723e29cc91").then (user => {
        req.session.user = user;
        req.session.isLoggedIn = true;
        req.session.save ( error => {
            console.log (error);
            res.redirect ('/');
        });
    }).catch (error => {
        console.log (error);
    })
}
exports.postLogout = (req, res, next) => {
    req.session.destroy ( error => {
        console.log (error);
        res.redirect ('/');
    })
}