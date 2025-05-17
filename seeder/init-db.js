require('dotenv').config();
const mysql = require('mysql2/promise');

const createDatabase = async () => {
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST || 'localhost',
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASSWORD || ''
        });

        const dbName = process.env.DB_NAME || 'lifesport';
        
        console.log(`Creating database ${dbName}...`);
        await connection.query(`DROP DATABASE IF EXISTS ${dbName}`);
        await connection.query(`CREATE DATABASE ${dbName}`);
        
        console.log(`Database ${dbName} successfully created.`);
        await connection.end();
        
        return true;
    } catch (error) {
        console.error('Error creating database:', error);
        return false;
    }
};

if (require.main === module) {
    createDatabase()
        .then(() => {
            process.exit(0);
        })
        .catch(err => {
            console.error(err);
            process.exit(1);
        });
}

module.exports = { createDatabase }; 