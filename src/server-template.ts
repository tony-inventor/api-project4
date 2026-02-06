// src/index.ts

import express from "express";
import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Listar todos os usuários
app.get("/users", async (req: Request, res: Response) => {
  try {
    const users = await prisma.tb_user.findMany();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar usuários" });
  }
});

// Buscar um usuário por ID
app.get("/users/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await prisma.tb_user.findUnique({
      where: { id: Number(id) },
    });
    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar usuário" });
  }
});

// Criar um novo usuário
app.post("/users", async (req: Request, res: Response) => {
  const { name, email, phone } = req.body;
  try {
    const newUser = await prisma.tb_user.create({
      data: { name, email },
    });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar usuário" });
  }
});

// Atualizar um usuário
app.put("/users/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, email, phone } = req.body;
  try {
    const updatedUser = await prisma.tb_user.update({
      where: { id: Number(id) },
      data: { name, email },
    });
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar usuário" });
  }
});

// Deletar um usuário
app.delete("/users/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.tb_user.delete({
      where: { id: Number(id) },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Erro ao deletar usuário" });
  }
});

app.listen(port, () => {
  console.log(`API rodando em http://localhost:${port}`);
});
