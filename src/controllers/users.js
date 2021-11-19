import connection from '../database/connection.js';
import { newUserSchema } from './validations/schemas.js';
import bcrypt from 'bcrypt';
import {userAlredyExists} from '../helpers/users.js'
export default async function signUp(req, res) {
    const { name, email, password } = req.body;

    const validation = newUserSchema.validate({
		name,
		email,
		password,
	});

    if (validation.error) return res.sendStatus(400);
	if (await userAlredyExists(email)) return res.sendStatus(409);
    try {
		const encryptedPassword = bcrypt.hashSync(password, 10);

		connection.query(
			`INSERT INTO users (name, email, password) VALUES ($1, $2, $3)`,
			[name, email, encryptedPassword]
		);
		res.sendStatus(201);
	} catch (error) {
		console.log(error.message);
		res.sendStatus(500);
	}
}