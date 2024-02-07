const { Pool } = require('pg');
const { delaySomething } = require('../sharedFunctions/helperFunctions');

const pool = new Pool({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	database: process.env.DB_NAME,
	password: process.env.DB_PASSWORD,
	port: parseInt(process.env.DB_PORT || '5432'),
});

const connectToDB = async () => {
	let tries = 0;
	let success = false;
	while (tries <= 5 && !success) {
		try {
			await pool.connect();
			console.log('Connection succeeded: Connected to db on port:', process.env.DB_PORT);
			success = true;
		} catch (err) {
			console.log(`Connection failed: We will retry ${5 - tries} more times. Error: `, err);
			tries += 1;
			await delaySomething((tries + 1) * 2000);
		}
	}
};

module.exports = { connectToDB };
