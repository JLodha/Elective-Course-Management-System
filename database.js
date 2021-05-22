var mysql = require('mysql');
var conn = mysql.createConnection({
  host: 'localhost', // assign your host name
  user: 'root',      //  assign your database username
  password:'janit0l',
  database: 'se_prince' // assign database Name
});

conn.connect(function(err) {
  if (err) throw err;
  console.log('Database is connected successfully !');
});

// password: 'madank@2kati',      // assign your database password

module.exports = conn;