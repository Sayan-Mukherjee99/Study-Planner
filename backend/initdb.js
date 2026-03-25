const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

async function setup() {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        multipleStatements: true
    });

    try {
        const sql = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');
        await connection.query(sql);
        console.log('Database and tables created successfully.');
    } catch (err) {
        console.error('Error setting up database:', err);
    } finally {
        await connection.end();
    }
}

setup();
