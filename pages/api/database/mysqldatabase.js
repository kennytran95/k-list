var mysql = require("mysql2");
let yelpconfig = require("../../yelpconfig");

exports.dbConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: yelpconfig.dbpassword,
  database: "GLIST",
});
