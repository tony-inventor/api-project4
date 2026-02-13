import express from "express";
import userRoutes from "@routes/user.routes";
import productRoutes from "@routes/product.routes";
import { errorHandler } from "@middlewares/errorHandler";

export const app: express.Express = express();

app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use(errorHandler);
