const sys = require('sys')
var sqlite3 = require('sqlite3').verbose();
// var file = __dirname + "/dbs/bolnorecoffee";
var file = __dirname + "/storage/dbs/bolnorecoffee";

// https://github.com/mapbox/node-sqlite3/issues/674
var db = new sqlite3.Database(file, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, function (err) {
  if (err) console.log("SQL Lite error", err.message);
});

// create table if it does not already exist
let sqlCreateCheck = "CREATE TABLE IF NOT EXISTS answers ('question1' TEXT, 'question2' TEXT, 'question3' TEXT, 'question4' TEXT, 'question5' TEXT, 'question_datestamp' Date, 'ip_address' TEXT, 'browser_agent' TEXT)"
db.run(sqlCreateCheck, (err, rows) => {
  if (err) {
    console.log("sqlCreateCheck Error", err)
    throw err;
  }
  // selectCheck()
});

function selectCheck () {
  let sqlSelect = 'SELECT * FROM answers'
  console.log("sqlSelect", sqlSelect)
  db.all(sqlSelect, [], (err, rows) => {
    console.log("rows", rows)
    if (err) {
      console.log("sqlSelect Error", err)
      throw err;
    }
    rows.forEach((row) => {
      console.log(row);
    });
  });
}


module.exports = db;
