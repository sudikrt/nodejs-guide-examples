const Sequelize = require ('sequelize');
const mysql = require('mysql2/promise');
const dbName = 'node-complete';

// initilize ();

// async function initilize () {
    
//     const connection = await mysql.createConnection({ host : 'localhost', user : 'root', password : 'drive@123' });
//     await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\`;`);
// }

const sequelize = new Sequelize (dbName, 'root', 'drive@123', {
    dialect : 'mysql',
    host : 'localhost'
});

module.exports = sequelize;


