const express = require("express");
const router = express.Router();
const fetch = require("fetch");

const Agendamento = require("../agendamentos/Agendamento");
const Usuario = require("../usuarios/Usuario");
const Produto = require("../produtos/Produto");

const adminAuth = require("../middlewares/adminAuth");
const uploadImage = require("../middlewares/uploadImage");

router.get("/usuario/admin/index", adminAuth, (req, res) => {
    res.render("usuarios/admin/adm_index");
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

// router.post("/upload-image", uploadImage.single('image'), async (req, res) => {
//     if (req.file) {
//         res.redirect("/usuario/admin/produtos");
//     } else {
//         res.redirect("/usuario/admin/index");
//     }

// });
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


module.exports = router;
