var mysql = require("mysql2");
let yelpconfig = require("../../yelpconfig");

// exports.dbConnection = mysql.createConnection({
//   host: "ec2-13-52-254-187.us-west-1.compute.amazonaws.com",
//   port: 3306,
//   user: "admin",
//   password: yelpconfig.awsMYSQLpassword,
//   database: "KLIST",
// });

//why does the above not work but the bottom does?!

let dbConnection = mysql.createConnection({
  host: "ec2-13-52-254-187.us-west-1.compute.amazonaws.com",
  port: 3306,
  user: "admin",
  password: yelpconfig.awsMYSQLpassword,
  database: "KLIST",
});

dbConnection.connect(function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log("Connected to MySQL K-List Database 😁!");
  }
});

exports.dbConnection = dbConnection;
