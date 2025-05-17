const { sequelize, testConnection } = require('./db');
const Person = require('./Person');
const Team = require('./Team');
const TeamMember = require('./TeamMember');
const Single = require('./Single');
const Participant = require('./Participant');
const Match = require('./Match');
const InGameEventType = require('./InGameEventType');
const InGameEvent = require('./InGameEvent');

// Set up associations
Participant.setupAssociations();

const syncDatabase = async () => {
    try {
        await testConnection();
        
        await sequelize.sync({ force: false });
        console.log('Db synced');
    } catch (error) {
        console.error('Error syncing db:', error);
    }
};

module.exports = {
    sequelize,
    testConnection,
    syncDatabase,
    Person,
    Team,
    TeamMember,
    Single,
    Participant,
    Match,
    InGameEventType,
    InGameEvent
}; 