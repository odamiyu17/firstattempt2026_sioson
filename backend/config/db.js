const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'alumni_db'
});

connection.connect((err) => {
  if (err) {
    console.log('DB connection error:', err);
  } else {
    console.log('Connected to MySQL');
  }
});

module.exports = connection;