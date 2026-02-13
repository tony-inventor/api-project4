import { Request, Response, NextFunction } from "express";
import { ProductRepository } from "@repositories/ProductRepository";

export class ProductController {
  // GET ALL PRODUCTS ----------------------------------------//
  async getAllProducts(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      console.log("Entering getAllProducts..");
      const products = await ProductRepository.getAll();
      res.status(200).json(products);
    } catch (error) {
      console.error("Error:", error);
    }
  }
  // GET PRODUCT BY ID ---------------------------------------//
  async getProductById(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const idParam = req.params.id;

      if (!idParam) {
        res.status(400).json({ message: "Invalid or missing id parameter" });
        return;
      }

      const product = await ProductRepository.getById(String(idParam));

      if (product) {
        res.status(200).json(product);
      } else {
        res.status(404).json({ message: "Product not found" });
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }
  // NEW PRODUCT ---------------------------------------------//
  async newProduct(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { barcode, name, description } = req.body;

      if (!barcode || !name) {
        res.status(400).json({ message: "Missing required fields" });
        return;
      }

      const newProduct = await ProductRepository.newProduct({
        barcode,
        name,
        description,
      });
      res.status(201).json(newProduct);
    } catch (error) {
      console.error("Error:", error);
    }
  }
  // UPDATE PRODUCT ------------------------------------------//
  async updateProduct(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    console.log("Entering update product");
    const { id, barcode, name, description } = req.body;

    if (!id || !barcode || !name) {
      res.status(400).json({ message: "Invalid or missing id parameter" });
    }

    try {
      const updatedProduct = ProductRepository.update(id, {
        barcode,
        name,
        description,
      });

      res.status(201).json(updatedProduct);
    } catch (error) {
      console.error("Error:", error);
    }
  }
  // DELETE PRODUCT ------------------------------------------//
  async deleteProduct(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;

    if (!id) {
      res.status(400).json({ message: "ID is missing" });
    }

    try {
      const deletedProduct = await ProductRepository.delete(String(id));

      if (deletedProduct) {
        res.status(200).json(deletedProduct);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }
}
