const express = require('express');
const router = express.Router();
const db = require('../database');

router.get('/answers', function(req, res, next) {
  db.all('SELECT * FROM answers', [], (err, rows) => res.send(rows))	
});

router.post('/answers', function(req, res, next) {
	let answers = req.body.answers
	let ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

	let values = [...answers.map(x => x.answer), Date.now(), ipAddress, req.useragent.source]
	db.run(`INSERT INTO answers (question1, question2, question3, question4, question5, question_datestamp, ip_address, browser_agent) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, 
		values, 
		function(err) {
			if (err) {
				return console.log(err.message);
				res.send(err.message);
			}
			// get the last insert id
			res.send(`A row has been inserted with rowid ${this.lastID}`);
		}
	);

});

// db.close();

module.exports = router;
