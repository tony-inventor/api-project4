import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Delete existing users to avoid unique constraint violations
  await prisma.tb_user.deleteMany();

  console.log("Iniciando seed...");

  const users = [
    {
      name: "João Silva",
      email: "joao.silva@gmail.com",
    },
    {
      name: "Maria Oliveira",
      email: "maria.oliveira@gmail.com",
    },
    {
      name: "Carlos Santos",
      email: "carlos.santos@gmail.com",
    },
  ];

  for (const user of users) {
    const createdUser = await prisma.tb_user.create({
      data: user,
    });
    console.log(`Usuário criado: ${createdUser.name}`);
  }

  console.log("Seed finalizado com sucesso!");
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
