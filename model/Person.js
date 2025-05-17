const { DataTypes } = require('sequelize');
const { sequelize } = require('./db');

const Person = sequelize.define('Person', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(100)
    },
}, {
    tableName: 'Person',
    timestamps: false
});

module.exports = Person; 