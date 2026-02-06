import { Router } from "express";
import { UserController } from "@controllers/UserController";

const routes: Router = Router();
const userController = new UserController();

routes.get("/users", (req, res, next) =>
  userController.getAllUsers(req, res, next),
);
routes.get("/users/:id", (req, res, next) =>
  userController.getUserById(req, res, next),
);
/*
routes.post("/users", userController.createUser);
routes.put("/users/:id", userController.updateUser);
routes.delete("/users/:id", userController.deleteUser);
*/
export default routes;
