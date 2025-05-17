const { DataTypes } = require('sequelize');
const { sequelize } = require('./db');
const Participant = require('./Participant');

const Match = sequelize.define('Match', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    start_time: {
        type: DataTypes.DATE,
        allowNull: false
    },
    end_time: {
        type: DataTypes.DATE,
        allowNull: true
    },
    status: {
        type: DataTypes.ENUM('scheduled', 'in_progress', 'completed', 'cancelled'),
        allowNull: false,
        defaultValue: 'scheduled'
    }
}, {
    tableName: 'Match',
    timestamps: false
});

Match.hasMany(Participant, { foreignKey: 'match_id', as: 'participants', onDelete: 'CASCADE' });
Participant.belongsTo(Match, { foreignKey: 'match_id' });

module.exports = Match; 