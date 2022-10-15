const express = require("express");
const router = express.Router();
const Usuario = require("./Usuario");

const bcrypt = require("bcryptjs");
const usuarioAuth = require("../middlewares/usuarioAuth");


router.get("/usuario/cadastrar", (req, res) => {
    res.render("usuarios/cadastrar");
});

router.get("/usuario/entrar", (req, res) => {
    res.render("usuarios/entrar");
});

router.post("/cadastrar", (req, res) => {
    const { nome, cpf, estado, cidade, rua, telefone, email, senha, admin } = req.body

    Usuario.findOne({ where: { email: email } }).then(usuario => { // impede email duplicado
        if (usuario == undefined) {

            var salt = bcrypt.genSaltSync(10);
            var hash = bcrypt.hashSync(senha, salt);

            Usuario.create({
                nome: nome,
                cpf: cpf,
                estado: estado,
                cidade: cidade,
                rua: rua,
                telefone: telefone,
                email: email,
                senha: hash,
                admin: admin
            }).then(() => {
                res.redirect("/usuario/entrar");
            }).catch((err) => {
                console.log(err);
                res.redirect("/");
            });
        } else {
            res.redirect("/usuario/cadastrar");
        }

    });
});

router.post("/entrar", (req, res) => {

    let email = req.body.email;
    let senha = req.body.senha;

    Usuario.findOne({ where: { email: email } }).then(usuario => {
        if (usuario != undefined) {  // se existir o email no bd pd loga
            //valida senha
            let correto = bcrypt.compareSync(senha, usuario.senha);

            if (correto) {
                req.session.usuario = {
                    id: usuario.id,
                    email: usuario.email,
                    admin: usuario.admin
                }
                // if (usuario.admin == true) {
                //     res.redirect('/adm');
                // } else {
                res.redirect("/usuario/index");
                // }
            } else {
                res.redirect("/usuario/entrar");
            }
        } else {
            res.redirect("/usuario/entrar");
        }
    });

});

router.get("/usuario/index", usuarioAuth, (req, res) => {
    res.render("usuarios/cliente/index");
});

router.get("/usuario/doacao", usuarioAuth, (req, res) => {
    res.render("usuarios/cliente/doacao");
});

router.get("/usuario/produtos", usuarioAuth, (req, res) => {
    res.render("usuarios/cliente/produtos");
});

router.get("/usuario/servicos", usuarioAuth, (req, res) => {
    res.render("usuarios/cliente/servicos");
});

router.get("/sair", (req, res) => {
    req.session.usuario = undefined;
    res.redirect('/');
});


module.exports = router;