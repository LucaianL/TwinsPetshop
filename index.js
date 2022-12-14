const connection = require("./database/database");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const session = require("express-session");

const UsuariosController = require("./controllers/UsuariosController");
const AgendamentosController = require("./controllers/AgendamentosController");
const AdminsController = require("./controllers/AdminsController");

const Produto = require("./models/Produto");

// DIZ PARA O EXPRESS USAR EJS COMO VIEW ENGINE
app.set('view engine', 'ejs');
app.use(express.static('public'));

//CONFIGURA BODY-PARSER
app.use(bodyParser.urlencoded({ extended: false })) // converte os dados enviados em js p conseguir usar dentro do projeto
app.use(bodyParser.json()); // permite ler dados em json

app.use(session({
    secret: "samambaia", cookie: { maxAge: 10000000 }  //texto qualquer para aumentar a segurança da sessão
}));

app.use("/", UsuariosController);
app.use("/", AgendamentosController);
app.use("/", AdminsController);


// ROTAS
app.get("/", (req, res) => {
    res.render("index");
});

app.get("/produtos", (req, res) => {
    Produto.findAll({
        order: [
            ['id', 'ASC']
        ]
    }).then(produtos => {
        res.render("produtos", {
            produtos: produtos
        });
    });
});

app.get("/servicos", (req, res) => {
    res.render("servicos");
});

app.get("/doacao", (req, res) => {
    res.render("doacao");
});

app.get("/entrarLogado", (req, res) => {
    res.render("entrarLogado");
});

connection.authenticate().then(() => {
    console.log("Conexão feita com o banco de dados"); // Se conectar com sucesso mostra o console.log
})
    .catch((msgErro) => {                              // Se não conectar mostra a msg de erro
        console.log(msgErro);
    })


app.listen(5070, () => { console.log("App rodando"); });