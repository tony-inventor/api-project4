import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

const connectionUrl = process.env.DATABASE_URL;

if (!connectionUrl) {
  throw new Error("DATABASE_URL environment variable is not set");
}

const pool = new pg.Pool({
  connectionString: connectionUrl,
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

export class SupermarketRepository {
  static async getAll() {
    try {
      const supermarket = await prisma.supermarket.findMany();
      return supermarket;
    } catch (error) {
      console.error("Error:", error);
    }
  }

  static async getById() {}

  static async new() {}

  static async delete() {}
}
