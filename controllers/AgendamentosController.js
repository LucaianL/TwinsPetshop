const express = require("express");
const router = express.Router();

const Usuario = require("../models/Usuario");
const Agendamento = require("../models/Agendamento");

const usuarioAuth = require("../middlewares/usuarioAuth");
const adminAuth = require("../middlewares/adminAuth");



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
    const { tipoPet, nomePet, servico, observacoes, horario, diaSemana } = req.body

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

router.post("/admin/agendamento/deletar", (req, res) => {
    var id = req.body.id
    if (id != undefined) {
        if (!isNaN(id)) {
            Agendamento.destroy({
                where: {
                    id: id
                }

            }).then(() => {
                res.redirect("/usuario/admin/consultar_agendamentos");
            });
        } else { //não for um número
            res.redirect("/usuario/admin/consultar_agendamentos");
        }
    } else { //null
        res.redirect("/usuario/admin/consultar_agendamentos");
    }

});

// ADMIN
router.get("/admin/adicionarAgendamento", adminAuth, (req, res) => {
    res.render("usuarios/admin/adm_adicionarAgendamento");
})

router.post("/admin/agendamento", (req, res) => {
    const { tipoPet, nomePet, servico, observacoes, horario, diaSemana } = req.body

    Agendamento.create({
        tipoPet: tipoPet,
        nomePet: nomePet,
        servico: servico,
        observacoes: observacoes,
        horario: horario,
        idUsuario: req.session.usuario.id,
        diaSemana: diaSemana

    }).then(() => {
        res.redirect("/usuario/admin/consultar_agendamentos");
    }).catch((err) => {
        // console.log(err);
        res.redirect("/");
    });
})

router.get("/admin/agendamento/editar/:id", adminAuth, (req, res) => {
    var id = req.params.id;
    if (isNaN(id)) {
        res.redirect("/admin/adicionarAgendamento");
    }
    Agendamento.findByPk(id).then(agendamento => {
        if (agendamento != undefined) {
            res.render("usuarios/admin/adm_editarAgendamento", { agendamento: agendamento });
        } else {
            res.redirect("/admin/adicionarAgendamento");
        }
    }).catch(err => {
        res.redirect("/usuario/admin/produtos");
    });
})

router.post("/admin/agendamento/editar", (req, res) => {
    const { id, tipoPet, nomePet, servico, observacoes, horario, diaSemana } = req.body

    Agendamento.update({
        tipoPet: tipoPet,
        nomePet: nomePet,
        servico: servico,
        observacoes: observacoes,
        horario: horario,
        diaSemana: diaSemana
    }, {
        where: {
            id: id
        }
    }).then(() => {
        res.redirect("/usuario/admin/consultar_agendamentos");
    })
});


module.exports = router;
