import { Router } from "express";
import { UserController } from "@controllers/UserController";

const routes: Router = Router();
const userController = new UserController();

routes.get("/", (req, res, next) => userController.getAllUsers(req, res, next));
routes.get("/:id", (req, res, next) =>
  userController.getUserById(req, res, next),
);
routes.post("/", (req, res, next) => userController.newUser(req, res, next));

export default routes;
