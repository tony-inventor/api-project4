import "dotenv/config";
import { app } from "./app";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL not set, check file .env")
}


app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
