require('dotenv').config();
const { createDatabase } = require('./init-db');
const { 
    Person, 
    Team, 
    TeamMember, 
    InGameEventType,
    
    sequelize
} = require('../model');

const seedDatabase = async () => {
    try {
        await createDatabase();
        
        await sequelize.sync({ force: true });
        console.log('Seeder: Db synced');
        
        const eventTypes = await InGameEventType.bulkCreate([
            { name: 'Goal' },
            { name: 'Penalty' },
            { name: 'Yellow Card' },
            { name: 'Red Card' },
        ]);
        console.log('Event types created');
        
        const personsData = [];
        for (let i = 1; i <= 33; i++) {
            personsData.push({ name: i.toString() });
        }
        const persons = await Person.bulkCreate(personsData);
        console.log('Persons created');
        
        const teams = await Team.bulkCreate([
            { name: 'Sparta'},
            { name: 'Spartak'},
            { name: 'Dukla'}
        ]);
        console.log('Teams created');
        
        const teamMembersData = [];
        for (let i = 1; i <= 11; i++) {
            teamMembersData.push({ team_id: 1, person_id: i });
        }
        for (let i = 12; i <= 22; i++) {
            teamMembersData.push({ team_id: 2, person_id: i });
        }
        for (let i = 23; i <= 33; i++) {
            teamMembersData.push({ team_id: 3, person_id: i });
        }
        
        await TeamMember.bulkCreate(teamMembersData);
        console.log('Team members created');

        
        
        console.log('Database successfully seeded!');
    } catch (error) {
        console.error('Error filling the database:', error);
        return false;
    }
};

module.exports = { seedDatabase };

if (require.main === module) {
    seedDatabase().then(() => {
        console.log('Seeding completed, exiting...');
        process.exit(0);
    }).catch(err => {
        console.error('Seeding failed:', err);
        process.exit(1);
    });
} 