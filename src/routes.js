import { Router } from "express";
import signIn from "./controllers/sessions.js";
import postUserSubscription from "./controllers/subscriptions.js";
import signUp from "./controllers/users.js";
import validateToken from "./middlewares/tokenValidator.js";

const routes = Router();

routes.get("/health", (req, res) => {
  res.send("Healthy");
});
routes.post("/sign-up", signUp);
routes.post("/sign-in", signIn);
routes.post("/subscription", validateToken, postUserSubscription);
export default routes;
