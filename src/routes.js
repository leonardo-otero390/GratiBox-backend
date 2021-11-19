import { Router } from "express";
import signIn from "./controllers/sessions.js";
import signUp from "./controllers/users.js";

const routes = Router();

routes.get("/health", (req, res) => {
	res.send("Healthy");
});
routes.post("/sign-up", signUp);
routes.post("/sign-in", signIn);
export default routes;