import express from "express";
import userRoutes from "@routes/user.routes";
import { errorHandler } from "@middlewares/errorHandler";

export const app: express.Express = express();

app.use(express.json());
app.use(userRoutes);
app.use(errorHandler);
