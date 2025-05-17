const { DataTypes } = require('sequelize');
const { sequelize } = require('./db');
const Person = require('./Person');

const Single = sequelize.define('Single', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    person_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Person,
            key: 'id'
        }
    }
}, {
    tableName: 'Single',
    timestamps: false
});

Single.belongsTo(Person, { foreignKey: 'person_id', as: 'person' });
Person.hasMany(Single, { foreignKey: 'person_id' });

module.exports = Single; 