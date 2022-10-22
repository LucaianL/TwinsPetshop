const express = require("express");
const router = express.Router();

const Agendamento = require("../agendamentos/Agendamento");
const Usuario = require("../usuarios/Usuario")

const adminAuth = require("../middlewares/adminAuth");

router.get("/usuario/admin/index", adminAuth, (req, res) => {
    res.render("usuarios/admin/adm_index");
});

router.get("/usuario/admin/produtos", adminAuth, (req, res) => {
    res.render("usuarios/admin/adm_catalogo");
});

router.get("/usuario/admin/consultar_agendamentos", adminAuth, (req, res) => {
    Agendamento.findAll({
        order: [
            ['id', 'ASC']
        ],
        include: [{
            model: Usuario
        }]
    }).then(data => {
        let agendamentos = data.map(agendamento => {
            const agend = agendamento.dataValues;
            agend.usuario = agend.usuario.dataValues;
            return agend;
        });
        res.render("usuarios/admin/adm_clienteAgendamento", { agendamentos })
    });
});
router.get("/usuario/admin/cadastrar_produto", adminAuth, (req, res) => {
    res.render("usuarios/admin/adm_cadastrar");
});

router.get("/usuario/admin/atualizar_produto", adminAuth, (req, res) => {
    res.render("usuarios/admin/adm_atualizar");
});

router.get("/usuario/admin/dadosClientes", adminAuth, (req, res) => {
    Usuario.findAll({
        order: [
            ['id', 'DESC']
        ]
    }).then(usuarios => {
        res.render("usuarios/admin/adm_dados_cli", {
            usuarios: usuarios
        });
    });
});


module.exports = router;
