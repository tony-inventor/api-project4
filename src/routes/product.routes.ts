import { Router } from "express";
import { ProductController } from "@controllers/ProductController";

const routes: Router = Router();
const productController = new ProductController();

routes.get("/", (req, res, next) =>
  productController.getAllProducts(req, res, next),
);

routes.get("/:id", (req, res, next) => {
  productController.getProductById(req, res, next);
});

routes.post("/", (req, res, next) => {
  productController.newProduct(req, res, next);
});
export default routes;

routes.patch("/", (req, res, next) => {
  productController.updateProduct(req, res, next);
});

routes.delete("/:id", (req, res, next) => {
  productController.deleteProduct(req, res, next);
});
