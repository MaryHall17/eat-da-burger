var connection = require("../config/connection.js");


//Helper function for SQL syntax.
function printQuestionMarks(num) {
	var array = [];

	for (var i =0; i < num; i++) {
		array.push("?");
	}

	return array.toString();
}

//Helper function to convert object key/value pairs to SQL syntax
function objToSql(object) {
	var array = [];

	//Loop through the keys and push the key/value as a string into array
	for (var key in object) {
		var value = object[key];
		//check to skip hidden properties
		if (Object.hasOwnProperty.call(object, key)) {
			//if string with spaces, add quotations
			if (typeof value === "string" && value.indexOf(" ") >=0) {
				value = "'" + value + "'";
			}

			array.push(key + "=" + value);
		}
	}

	return array.toString();
}

//Object for SQL statement functions.
var orm = {
	selectAll: function(tableInput, cb) {
		var queryString = "SELECT * FROM " + tableInput + ";";
		connection.query(queryString, function (err, result) {
			if (err) {
				throw err;
			}
			cb(result);
		});
	},
	insertOne: function(table, cols, vals, cb) {
		var queryString = "INSERT INTO " + table;

		queryString += " (";
		queryString += cols.toString();
		queryString += ") ";
		queryString += "VALUES (";
		queryString += printQuestionMarks(vals.length);
		queryString += ") ";

		console.log(queryString);

		connection.query(queryString, vals, function(err, result) {
			if (err) {
				throw err;
			}

			cb(result);
		});
	},
	updateOne: function(table, objColVals, condition, cb) {
		var queryString = "UPDATE " + table;

		queryString += " SET "; 
		queryString += objToSql(objColVals);
		queryString += " WHERE ";
		queryString += condition;

		console.log(queryString);
		connection.query(queryString, function(err, result) {
			if (err) {
				throw err;
			}

			cb(result);
		});
	}

};

module.exports = orm;