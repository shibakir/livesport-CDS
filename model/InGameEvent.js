const { DataTypes } = require('sequelize');
const { sequelize } = require('./db');
const Match = require('./Match');
const InGameEventType = require('./InGameEventType');
const Participant = require('./Participant');

const InGameEvent = sequelize.define('InGameEvent', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    match_id: {
        type: DataTypes.INTEGER,
        references: {
        model: Match,
        key: 'id'
        }
    },
    event_type_id: {
        type: DataTypes.INTEGER,
        references: {
        model: InGameEventType,
        key: 'id'
        }
    },
    timestamp_sec: {
        type: DataTypes.INTEGER
    },
    participant_id: {
        type: DataTypes.INTEGER,
        references: {
        model: Participant,
        key: 'id'
        }
    },
    description: {
        type: DataTypes.TEXT
    }
}, {
    tableName: 'InGameEvent',
    timestamps: false
});

InGameEvent.belongsTo(Match, { foreignKey: 'match_id' });
Match.hasMany(InGameEvent, { foreignKey: 'match_id' });

InGameEvent.belongsTo(InGameEventType, { foreignKey: 'event_type_id' });
InGameEventType.hasMany(InGameEvent, { foreignKey: 'event_type_id' });

InGameEvent.belongsTo(Participant, { foreignKey: 'participant_id' });
Participant.hasMany(InGameEvent, { foreignKey: 'participant_id', onDelete: 'CASCADE' });

module.exports = InGameEvent; 