const { DataTypes } = require('sequelize');
const { sequelize } = require('./db');
const Team = require('./Team');
const Person = require('./Person');

const TeamMember = sequelize.define('TeamMember', {
    team_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: Team,
            key: 'id'
        }
    },
    person_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: Person,
            key: 'id'
        }
    },
}, {
    tableName: 'TeamMember',
    timestamps: false
});

Team.belongsToMany(Person, { through: TeamMember, foreignKey: 'team_id' });
Person.belongsToMany(Team, { through: TeamMember, foreignKey: 'person_id' });

module.exports = TeamMember; 