import { PrismaClient } from "@prisma/client";
import { randomUUID } from "crypto";

const prisma = new PrismaClient();

async function main() {
  // Delete existing data (reverse order)
  await prisma.priceEntry.deleteMany();
  await prisma.user.deleteMany();
  await prisma.product.deleteMany();
  await prisma.supermarket.deleteMany();
  await prisma.role.deleteMany();

  console.log("Iniciando seed...");

  // 2 Roles
  await prisma.role.createMany({
    data: [{ value: "ADMIN" }, { value: "USER" }],
  });
  const adminRole = await prisma.role.findUnique({
    where: { value: "ADMIN" },
  })!;
  const userRole = await prisma.role.findUnique({ where: { value: "USER" } })!;

  // 50 Realistic Users (Brazilian + international names)
  const userNames = [
    "Tony Brown",
    "Maria Silva",
    "João Santos",
    "Ana Oliveira",
    "Carlos Lima",
    "Fernanda Costa",
    "Pedro Almeida",
    "Juliana Pereira",
    "Lucas Ferreira",
    "Camila Rocha",
    "Rafael Souza",
    "Beatriz Martins",
    "Gabriel Silva",
    "Larissa Santos",
    "Thiago Oliveira",
    "Patrícia Lima",
    "Eduardo Costa",
    "Vanessa Almeida",
    "Ricardo Pereira",
    "Monica Ferreira",
    "Daniel Rocha",
  ];
  const userEmails = userNames.map(
    name => name.toLowerCase().replace(/ /g, ".") + "@gmail.com",
  );

  const users = await Promise.all(
    Array.from({ length: 50 }, (_, i) =>
      prisma.user.create({
        data: {
          id: randomUUID(),
          openId: `oid_${i}`,
          email: userEmails[i % userEmails.length]!,
          name: userNames[i % userNames.length]!,
          roleId: i === 0 ? adminRole!.id : userRole!.id,
          lastSignedIn: new Date(),
        },
      }),
    ),
  );

  // 5 Real BH Supermarkets
  const supermarkets = await prisma.supermarket
    .createMany({
      data: [
        {
          id: randomUUID(),
          name: "Supermercado BH",
          location: "Rua dos Caetes, Centro",
        },
        {
          id: randomUUID(),
          name: "Extra Hipermercado Savassi",
          location: "Rua Antônio de Albuquerque",
        },
        {
          id: randomUUID(),
          name: "Carrefour Mercado Lourdes",
          location: "Av. do Contorno",
        },
        { id: randomUUID(), name: "Pão de Açúcar", location: "BH Shopping" },
        {
          id: randomUUID(),
          name: "Prezunic Funcionários",
          location: "Rua dos Timbiras",
        },
      ],
    })
    .then(() => prisma.supermarket.findMany());

  // 100 Real Products (Brazilian supermarket items)
  const products = [
    "Arroz Integral Tio João 5kg",
    "Feijão Carioca 1kg",
    "Macarrão Espaguete Renata 500g",
    "Açúcar Cristal 1kg",
    "Óleo de Soja 900ml",
    "Leite Integral Piracanjuba 1L",
    "Pão de Forma Pullman",
    "Margarina Qualy 500g",
    "Café Pelé 500g",
    "Açúcar Mascavo 500g",
  ];
  const productData = Array.from({ length: 100 }, (_, i) => ({
    id: randomUUID(),
    barcode: `789123456${String(i + 1).padStart(5, "0")}`,
    name: products[i % products.length],
    description: `Produto de alta qualidade - Item ${i + 1}`,
  }));
  await prisma.product.createMany({ data: productData });

  // 50 Price Entries with realistic prices
  const entries = Array.from({ length: 50 }, () => ({
    productId: products[Math.floor(Math.random() * 100)].id,
    supermarketId: supermarkets[Math.floor(Math.random() * 5)].id,
    collectorId: users[Math.floor(Math.random() * 50)].id,
    price: Number((15 + Math.random() * 85).toFixed(2)), // R$15-100
    isOnSale: Math.random() > 0.8,
    date: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000), // last 30 days
  }));
  await prisma.priceEntry.createMany({ data: entries });

  console.log(
    "✅ Seed finalizado: 2 roles, 50 users, 5 supermarkets, 100 products, 50 entries",
  );
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
