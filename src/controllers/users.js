import connection from '../database/connection.js';
import { newUserSchema } from './validations/schemas.js';
import bcrypt from 'bcrypt';

async function postUser(req, res) {
    const { name, email, password } = req.body;

    const validation = newUserSchema.validate({
		name,
		email,
		password,
	});

    if (validation.error) {
		res.sendStatus(400);
		return;
	}

    try {
		const encryptedPassword = bcrypt.hashSync(password, 10);

		connection.query(
			`INSERT INTO users (name, email, password) VALUES ($1, $2, $3)`,
			[name, email, encryptedPassword]
		);
		res.sendStatus(201);
	} catch (error) {
		console.log(error.message);
		res.send(500);
	}
}

export {
    postUser
}