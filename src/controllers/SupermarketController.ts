import { Request, Response, NextFunction } from "express";

import { SupermarketRepository } from "@repositories/SupermarketRepository";

export class SupermarketController {
  async getAllSupermarkets(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const supermarkets = await SupermarketRepository.getAll();
      res.status(200).json(supermarkets);
    } catch (error) {
      console.error("Error:", error);
    }
  }
  async getSupermarketById() {}
  async newSupermarket() {}
}
