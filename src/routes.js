import { Router } from "express";
import postSession from "./controllers/sessions.js";
import { postUser } from "./controllers/users.js";

const routes = Router();

routes.get("/health", (req, res) => {
	res.send("Healthy");
});
routes.post("/users", postUser);
routes.post("/sessions", postSession);
export default routes;