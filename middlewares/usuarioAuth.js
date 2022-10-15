function usuarioAuth(req, res, next) {
    if (req.session.usuario != undefined) {
        next();
    } else {
        res.redirect('/usuario/entrar');
    }
}
module.exports = usuarioAuth;