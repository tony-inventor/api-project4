import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

const connectionUrl = process.env.DATABASE_URL;

const pool = new pg.Pool({
  connectionString: connectionUrl,
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

export class ProductRepository {
  static async getAll() {
    console.log("productRepository.getAll()");
    return prisma.product.findMany();
  }

  static async getById(id: string) {
    return prisma.product.findUnique({ where: { id: String(id) } });
  }

  static async newProduct(data: {
    barcode: string;
    name: string;
    description: string;
  }) {
    return prisma.product.create({ data: { ...data } });
  }

  static async update(
    id: string,
    data: {
      barcode?: string;
      name?: string;
      description?: string;
    },
  ) {
    console.log(`Updating user with id: ${id}`);

    try {
      return prisma.product.update({
        where: { id: String(id) },
        data,
      });
    } catch (error) {
      console.error("Error:", error);
    }
  }

  static async delete(idParam: string) {
    try {
      return prisma.product.delete({
        where: {id: idParam}
      })
    } catch (error) {
      console.error('Error:', error);
    }
  }
}
