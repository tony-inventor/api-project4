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

export class UserRepository {
  static async getAll() {
    return prisma.tb_user.findMany();
  }

  static async getById(id: string | number) {
    const userId = typeof id === "string" ? Number(id) : id;
    if (typeof userId !== "number" || Number.isNaN(userId)) {
      return null;
    }

    return prisma.tb_user.findUnique({ where: { id: userId } });
  }
}
