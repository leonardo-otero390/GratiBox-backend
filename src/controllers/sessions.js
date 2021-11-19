import connection from "../database/connection.js";
import { userAlredyExists, sessionAlredyExists } from "../helpers/users.js";
import { newSessionSchema } from "./validations/schemas.js";
import { v4 as uuid } from "uuid";
import bcrypt from 'bcrypt';

export default async function postSession(req, res) {
  const { email, password } = req.body;

  const validation = newSessionSchema.validate({
    email,
    password,
  });

  if (validation.error) {
    return res.sendStatus(400);
  }

  const user = await userAlredyExists(email);

  if (!user) return res.sendStatus(401);

  if (!bcrypt.compareSync(password, user.password)) {
    res.sendStatus(401);
    return;
  }
  try {
    const previousSession = await sessionAlredyExists(user.id);

    if (previousSession) {
      await connection.query(`DELETE FROM sessions WHERE id = $1`, [
        previousSession.id,
      ]);
    }
    const token = uuid();

    connection.query(
      `INSERT INTO sessions ("user_id", token) VALUES ($1, $2)`,
      [user.id, token]
    );

    delete user.password;
    res.status(201).send({ token, user });
  } catch (error) {
    console.log(error.message);
    res.send(500);
  }
}
