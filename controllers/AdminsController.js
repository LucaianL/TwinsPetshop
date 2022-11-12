const express = require("express");
const router = express.Router();
const fetch = require("fetch");

const Agendamento = require("../models/Agendamento");
const Usuario = require("../models/Usuario");
const Produto = require("../models/Produto");

const adminAuth = require("../middlewares/adminAuth");
const uploadImage = require("../middlewares/uploadImage");

router.get("/usuario/admin/index", adminAuth, (req, res) => {
    res.render("usuarios/admin/adm_index");
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

router.get("/usuario/admin/consultar_agendamentos", adminAuth, (req, res) => {
    Agendamento.findAll({
        order: [
            ['id', 'DESC']
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

// PRODUTOS
router.get("/usuario/admin/cadastrar_produto", adminAuth, (req, res) => {
    res.render("usuarios/admin/adm_cadastrar");
});

router.get("/usuario/admin/produtos", adminAuth, (req, res) => {
    Produto.findAll({
        order: [
            ['id', 'DESC']
        ]
    }).then(produtos => {
        res.render("usuarios/admin/adm_catalogo", {
            produtos: produtos
        });
    });
});

router.post("/admin/adicionar-produto", uploadImage.single('image'), async (req, res) => {
    const { nomeProduto, marca, tipo, preco, descricao } = req.body

    Produto.create({
        nomeProduto: nomeProduto,
        marca: marca,
        tipo: tipo,
        preco: preco,
        descricao: descricao,
        image: req.file.filename
    }).then(() => {
        res.redirect("/usuario/admin/produtos");
    }).catch((err) => {
        console.log(err);
        res.redirect("/usuario/admin/produtos");
    });
});

router.post("/admin/produto/deletar", (req, res) => {
    var id = req.body.id
    if (id != undefined) {
        if (!isNaN(id)) {
            Produto.destroy({
                where: {
                    id: id
                }

            }).then(() => {
                res.redirect("/usuario/admin/produtos");
            });
        } else { //não for um número
            res.redirect("/usuario/admin/produtos");
        }
    } else { //null
        res.redirect("/usuario/admin/produtos");
    }
});

router.get("/admin/produto/editar/:id", adminAuth, (req, res) => {
    var id = req.params.id;
    if (isNaN(id)) {
        res.redirect("/usuario/admin/produtos");
    }
    Produto.findByPk(id).then(produto => {
        if (produto != undefined) {
            res.render("usuarios/admin/adm_atualizar", { produto: produto });
        } else {
            res.redirect("/usuario/admin/produtos");
        }
    }).catch(err => {
        res.redirect("/usuario/admin/produtos");
    });
});

router.post("/produto/editar", uploadImage.single('image'), (req, res) => {
    const { id, nomeProduto, marca, tipo, preco, descricao } = req.body

    Produto.update({
        nomeProduto: nomeProduto,
        marca: marca,
        tipo: tipo,
        preco: preco,
        descricao: descricao,
        image: req.file.filename
    }, {
        where: {
            id: id
        }
    }).then(() => {
        res.redirect("/usuario/admin/produtos");
    })
});


module.exports = router;
