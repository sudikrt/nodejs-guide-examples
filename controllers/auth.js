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
    req.session.loggedIn = true;

    console.log (req.session);
    res.redirect ('/');
}