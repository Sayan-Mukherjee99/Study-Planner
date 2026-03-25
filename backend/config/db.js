const mysql = require('mysql2/promise');
require('dotenv').config();

console.log(`Attempting to connect to database: ${process.env.DB_NAME} on ${process.env.DB_HOST} as ${process.env.DB_USER}`);

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

pool.getConnection()
  .then(conn => {
    console.log('Successfully connected to MySQL database');
    conn.release();
  })
  .catch(err => {
    console.error('Initial DB Connection Error:', err.message);
  });

module.exports = pool;
