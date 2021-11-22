import { Router } from "express";
import signIn from "./controllers/sessions.js";
import postUserSubscription from "./controllers/post-subscription.js";
import signUp from "./controllers/users.js";
import validateToken from "./middlewares/tokenValidator.js";
import getUserSubscription from "./controllers/get-subscription.js";

const routes = Router();

routes.post("/sign-up", signUp);
routes.post("/sign-in", signIn);
routes.post("/subscription", validateToken, postUserSubscription);
routes.get("/subscription",validateToken, getUserSubscription);
export default routes;
