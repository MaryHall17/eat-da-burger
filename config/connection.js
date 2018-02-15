require("dotenv").config();


exports.password = {
	password: process.env.PASSWORD
};

var sqlPassword = exports.password.password;

var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: sqlPassword,
  database: "burgers_db"
});

connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
}); 

module.exports = {
	sqlConnection: connection, 
	password: sqlPassword
};
