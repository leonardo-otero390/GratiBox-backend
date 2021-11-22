import connection from "../database/connection.js";

export default async function getUserSubscription(req,res){
    const { authorization } = req.headers;
    const token = authorization.replace("Bearer ", "").trim();
    let userId;
    try {
		const dbResponse = await connection.query(
			"SELECT user_id FROM sessions WHERE token = $1",
			[token]
		);
		if (!dbResponse.rowCount) return res.sendStatus(404);
	} catch (error) {
		console.log("FAIL in getUserSubscription");
		console.log(error);
		return res.sendStatus(500);
	}
} 
