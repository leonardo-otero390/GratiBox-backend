import connection from "../database/connection.js";

async function userAlredyExists(email) {
	try {
		const existentUser = await connection.query(
			`SELECT * FROM users WHERE email = $1;`,
			[email]
		);
		if (existentUser.rowCount !== 0) return existentUser.rows[0];
		return false;
	} catch (error) {
		console.log("ERROR func userAlredyExists");
		console.log(error);
		return false;
	}
}

async function sessionAlredyExists(userId) {
	try {
		const existentSession = await connection.query(
			`SELECT * FROM sessions WHERE user_id =$1`,
			[userId]
		);

		if (existentSession.rowCount !== 0) return existentSession.rows[0];
		return false;
	} catch (error) {
		console.log("ERROR func sessionAlredyExists");
		console.log(error);
		return false;
	}
}

export { userAlredyExists, sessionAlredyExists };