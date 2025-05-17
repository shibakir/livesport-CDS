const { DataTypes } = require('sequelize');
const { sequelize } = require('./db');

const Team = sequelize.define('Team', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'Team',
    timestamps: false
});

module.exports = Team; 