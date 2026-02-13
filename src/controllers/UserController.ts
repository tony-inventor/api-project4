import { Request, Response, NextFunction } from "express";
import { UserRepository } from "@repositories/UserRepository";

export class UserController {
  async getAllUsers(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      console.log("Entering getAllUsers()");
      const users = await UserRepository.getAll();
      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  }

  async getUserById(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const idParam = req.params.id;
      if (!idParam || Array.isArray(idParam)) {
        res.status(400).json({ message: "Invalid or missing id parameter" });
        return;
      }

      const user = await UserRepository.getById(idParam);
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      next(error);
    }
  }

  async newUser(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { openId, email, name, roleId } = req.body;
      if (!openId || !email || !name) {
        res.status(400).json({ message: "Missing required fields" });
        return;
      }
      const newUser = await UserRepository.newUser({
        openId,
        email,
        name,
        roleId,
      });
      res.status(201).json(newUser);
    } catch (error) {
      next(error);
    }
  }

  async updateUser(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { id, openId, email, name, roleId } = req.body;

      if (!id || !openId || email || name) {
        res.status(400).json({ message: "Missing required fields" });
        return;
      }
      const userUpdated = await UserRepository.updateUser(id, {
        openId,
        email,
        name,
        roleId,
      });
      res.status(201).json(userUpdated);
    } catch (error) {
      next(error);
    }
  }

  async deleteUser(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      console.log("Entering deleteUser()");
      const deleteId = req.params.id;
      if (!deleteId) {
        res.status(400).json({ message: "Invalid or missing id parameter" });
      }

      const user = await UserRepository.deleteUser(String(deleteId));
      if (user) {
        res.status(200).json(user);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }
}
