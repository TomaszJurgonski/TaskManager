const express = require('express');
const mysql = require('mysql');
const mysqldb = require("./db");
const cors = require('cors');
const app = express();
app.use(cors());

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'yourUsername',
  password: 'yourPassword',
  database: 'yourDatabase'
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to the MySQL server.');
});

app.get('/data', (req, res) => {
  connection.query('SELECT * FROM yourTable', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

const port = 3000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
