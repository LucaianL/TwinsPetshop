const Sequelize = require("sequelize");

const connection = new Sequelize('twinspetshop', 'root', '996738', {
    host: 'localhost',
    dialect: 'mysql',
    timezone: '-03:00'
});

module.exports = connection;

// CONECTA O BANCO DE DADOS COM O SEQUELIZE