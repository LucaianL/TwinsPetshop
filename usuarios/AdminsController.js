const express = require("express");
const router = express.Router();

const adminAuth = require("../middlewares/adminAuth");

router.get("/usuario/admin/index", adminAuth, (req, res) => {
    res.render("usuarios/admin/adm_index");
});

router.get("/usuario/admin/produtos", adminAuth, (req, res) => {
    res.render("usuarios/admin/adm_catalogo");
});

router.get("/usuario/admin/consultar_agendamentos", adminAuth, (req, res) => {
    res.render("usuarios/admin/adm_clienteAgendamento");
});

router.get("/usuario/admin/cadastrar_produto", adminAuth, (req, res) => {
    res.render("usuarios/admin/adm_cadastrar");
});

router.get("/usuario/admin/atualizar_produto", adminAuth, (req, res) => {
    res.render("usuarios/admin/adm_atualizar");
});

module.exports = router;
