import { Router } from "express";
import { postUser } from "./controllers/users.js";

const routes = Router();

routes.get("/health", (req, res) => {
	res.send("Healthy");
});
routes.post("/users", postUser);
export default routes;