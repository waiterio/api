const fs = require('fs');
const sqlite = require('sqlite3').verbose();
const settings = require('../settings.js');

if (settings.database !== ':memory:') {
	const db = new sqlite.Database(settings.database);

	db.get('SELECT * FROM users', function(error) {
		if (error !== null) {
			console.log('preparing persistent database');
			db.exec(fs.readFileSync('./bootstrap_db.sql', 'utf-8'));

		}
	});
}
