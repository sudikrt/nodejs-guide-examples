exports.get404 = (req, res, next) => {
    res.status (404).render ('404', {docTitle : '404 Not found', path : '',isAuthenticated : req.session.isLoggedIn});
}