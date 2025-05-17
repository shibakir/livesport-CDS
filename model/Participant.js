const { DataTypes } = require('sequelize');
const { sequelize } = require('./db');

const Participant = sequelize.define('Participant', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    participant_type: {
        type: DataTypes.ENUM('team', 'single'),
        allowNull: false
    },
    match_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    team_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    single_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    score: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0
    }
}, {
    tableName: 'Participant',
    timestamps: false,
    validate: {
        eitherTeamOrSingle() {
            if (!this.team_id && !this.single_id) {
                throw new Error('Either team_id or single_id must be provided');
            }
            if (this.team_id && this.single_id) {
                throw new Error('Only one of team_id or single_id should be provided');
            }
            if (this.participant_type === 'team' && !this.team_id) {
                throw new Error('team_id must be provided when participant_type is team');
            }
            if (this.participant_type === 'single' && !this.single_id) {
                throw new Error('single_id must be provided when participant_type is single');
            }
        }
    }
});

// These associations will be set up after Team and Single models are loaded
const setupAssociations = () => {
    const Team = require('./Team');
    const Single = require('./Single');
    
    Participant.belongsTo(Team, { foreignKey: 'team_id' });
    Team.hasMany(Participant, { foreignKey: 'team_id', onDelete: 'CASCADE' });
    
    Participant.belongsTo(Single, { foreignKey: 'single_id' });
    Single.hasMany(Participant, { foreignKey: 'single_id', onDelete: 'CASCADE' });
};

module.exports = Participant;
module.exports.setupAssociations = setupAssociations; 