function adminAuth(req, res, next) {
    if (req.session.usuario != undefined && req.session.usuario.admin == true) {
        next();
    } else {
        res.redirect('/usuario/entrar');
    }
}
// function adminGo(req, res, next) {
//     if (req.user.adm == true) {
//         next();
//     } else {
//         res.redirect('/login');
//     }
// }

// module.exports = adminGo;
module.exports = adminAuth;