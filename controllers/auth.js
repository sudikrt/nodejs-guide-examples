exports.getLogin = (req, res, next) => {
    let cookies = {};
    req.get ('Cookie').split (';').forEach (ele => {
        const tempResp  = ele.trim ().split ("=");
        cookies[tempResp[0]] = tempResp[1];
    });
    const isLoggedIn = cookies.loggedIn;
    

    return res.render ('auth/login', {
        docTitle : 'Login', 
        path : '/login',
        isAuthenticated : isLoggedIn
    });
}

exports.postLogin = (req, res, next) => {
    res.setHeader ('Set-Cookie', 'loggedIn=true');
    res.redirect ('/');
}