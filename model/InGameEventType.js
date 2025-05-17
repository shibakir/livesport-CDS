const { DataTypes } = require('sequelize');
const { sequelize } = require('./db');

const InGameEventType = sequelize.define('InGameEventType', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(100),
        unique: true
    }
}, {
    tableName: 'InGameEventType',
    timestamps: false
});

module.exports = InGameEventType; 