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
    return prisma.user.findMany();
  }

  static async getById(id: string) {
    console.log(`Fetching user with id: ${id}`);
    return prisma.user.findUnique({ where: { id: String(id) } });
  }

  static async newUser(data: {
    openId: string;
    email: string;
    name: string;
    roleId: string;
  }) {
    // Set default role to 'user' if not provided
    const roleId = data.roleId || "user";

    return prisma.user.create({ data });
  }
}
