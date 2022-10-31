const express = require("express");
const router = express.Router();

const Usuario = require("../models/Usuario");
const Agendamento = require("../models/Agendamento");

const usuarioAuth = require("../middlewares/usuarioAuth");

router.get("/usuario/agendamento", usuarioAuth, (req, res) => {
    res.render("usuarios/cliente/agendamento")
});

router.get("/usuario/meusagendamentos", usuarioAuth, (req, res) => {
    console.log(req.session.usuario);
    Agendamento.findAll({
        include: [{
            model: Usuario,
            where: [{
                "id": req.session.usuario.id
            }]
        }]

    }).then(agendamentos => {
        res.render("usuarios/cliente/meusagendamentos", {
            agendamentos: agendamentos,

        });
    });
});

router.post("/agendamento", (req, res) => {
    let tipoPet = req.body.tipoPet;
    let nomePet = req.body.nomePet;
    let servico = req.body.servico;
    let observacoes = req.body.observacoes;
    let horario = req.body.horario;
    let diaSemana = req.body.diaSemana


    Agendamento.create({
        tipoPet: tipoPet,
        nomePet: nomePet,
        servico: servico,
        observacoes: observacoes,
        horario: horario,
        idUsuario: req.session.usuario.id,
        diaSemana: diaSemana

    }).then(() => {
        res.redirect("/usuario/meusagendamentos");
    }).catch((err) => {
        // console.log(err);
        res.redirect("/");
    });
});

router.post("/agendamento/deletar", (req, res) => {
    var id = req.body.id
    if (id != undefined) {
        if (!isNaN(id)) {
            Agendamento.destroy({
                where: {
                    id: id
                }
                
            }).then(() => {
                res.redirect("/usuario/meusagendamentos");
            });
        } else { //não for um número
            res.redirect("/usuario/meusagendamentos");
        }
    } else { //null
        res.redirect("/usuario/meusagendamentos");
    }

});

module.exports = router;
