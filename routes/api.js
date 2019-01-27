const express = require('express');
const router = express.Router();
const db = require('../database');

router.get('/answers', function(req, res, next) {
  db.all('SELECT * FROM answers', [], (err, rows) => res.send(rows))	
});

router.get('/check', function(req, res, next) {
	let ip = req.query.ip || ''
	let browser = req.query.browser || ''
	db.all('SELECT * FROM answers WHERE ip_address = ? AND browser_agent = ?', 
	[ip, browser], 
	(err, rows) => {
		if (err) {
			res.send(err)
		}
		res.send(rows)
	})	
});

router.post('/answers', function(req, res, next) {
	let answers = req.body.answers
	let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
	let browser = req.useragent.source || ''	

	checkAnswersValid()

	function checkAnswersValid () {
		db.all('SELECT * FROM answers WHERE ip_address = ? AND browser_agent = ?', 
		[ip, browser], 
		(err, rows) => {
			if (err) {
				throw err
			}
			// check if answers has already been submitted by this user
			if (Boolean(rows.length <= 0)) {
				insertAnswers()
			} else {
				res.status(403).send('You have already submitted your answers!');

			}
		})
	}

	function insertAnswers () {
		let values = [...answers.map(x => x.answer), Date.now(), ip, browser]
		db.run(`INSERT INTO answers (question1, question2, question3, question4, question5, question_datestamp, ip_address, browser_agent) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, 
			values, 
			function(err) {
				if (err) {
					return console.log(err.message);
					res.send(err.message);
				}
				// get the last insert id
				res.send(`Answers successfully submitted! Row has been inserted with rowid ${this.lastID}`);
			}
		);
	}

});

module.exports = router;
