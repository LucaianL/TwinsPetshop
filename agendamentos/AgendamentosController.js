const express = require("express");
const router = express.Router();

const Usuario = require("../usuarios/Usuario");
const Agendamento = require("./Agendamento");

const usuarioAuth = require("../middlewares/usuarioAuth");

router.get("/usuario/agendamento", usuarioAuth, (req, res) => {
    res.render("usuarios/cliente/agendamento")
});

router.get("/usuario/meusagendamentos", usuarioAuth, (req, res) => {
    
    Agendamento.findAll({ 
        include: [{model: Usuario}]
     }).then(agendamentos => {
        res.render("usuarios/cliente/meusagendamentos", {
            agendamentos: agendamentos,

        });
    });
    // Agendamento.findAll({ raw: true }).then(agendamentos => {
    //     res.render("usuario/meusagendamentos", {
    //         agendamentos: agendamentos
    //     });
    // }).catch(error => {
    //     console.log(error);
    //     res.redirect("/usuario/agendamento");
    // });
});

router.post("/agendamento", (req, res) => {
    let tipoPet = req.body.tipoPet;
    let nomePet = req.body.nomePet;
    let servico = req.body.servico;
    let observacoes = req.body.observacoes;
    let horario = req.body.horario;
    let idUsuario = req.body.usuario;

    Agendamento.create({
        tipoPet: tipoPet,
        nomePet: nomePet,
        servico: servico,
        observacoes: observacoes,
        horario: horario,
        idUsuario: idUsuario

    }).then(() => {
        res.redirect("/usuario/meusagendamentos");
    }).catch((err) => {
        // console.log(err);
        res.redirect("/");
    });
});

module.exports = router;
