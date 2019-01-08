const sys = require('sys')
var sqlite3 = require('sqlite3').verbose();
var file = __dirname + "/dbs/bolnorecoffee";
var db = new sqlite3.Database(file);

// create table if it does not already exist
db.run("CREATE TABLE IF NOT EXISTS answers ('question1' TEXT, 'question2' TEXT, 'question3' TEXT, 'question4' TEXT, 'question5' TEXT, 'datestamp' Date, 'ip+address' TEXT, 'browser_agent' TEXT)")


db.all("SELECT * FROM answers", function(err, rows) {
        rows.forEach(function (row) {
            console.log(row);
        })
	});	
db.close();