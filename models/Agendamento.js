const connection = require("../database/database");
const Sequelize = require("sequelize");

const Usuario = require("../models/Usuario")

const Agendamento = connection.define('agendamentos', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    tipoPet: {
        type: Sequelize.STRING,
        allowNull: false
    },
    nomePet: {
        type: Sequelize.STRING,
        allowNull: false
    },
    servico: {
        type: Sequelize.STRING,
        allowNull: false
    },
    observacoes: {
        type: Sequelize.STRING,
        allowNull: false
    },
    horario: {
        type: Sequelize.STRING,
        allowNull: false
    },
    diaSemana:{
        type: Sequelize.STRING,
        allowNull: false
    }
});

Agendamento.belongsTo(Usuario, {
    constraint: true,
    foreignKey: 'idUsuario'
}); // um Agendamento pertence a um Usuario (1 para 1)
Usuario.hasMany(Agendamento, {
    constraint: true,
    foreignKey: 'idUsuario'
}); // um Usuario pertence a muitos Agendamentos (1 para N)

// Agendamento.sync({ force: true });

module.exports = Agendamento; 