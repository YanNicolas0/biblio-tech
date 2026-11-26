const { z } = require("zod");

const LivroBase = z.object({
  titulo: z.string().min(1, "Título é obrigatório").max(200),
  isbn: z.string().regex(/^\d{13}$/, "ISBN deve ter 13 dígitos"),
  ano: z.number().int().min(1450).max(new Date().getFullYear() + 1),
  editora: z.string().min(1).max(100),
  qtd_disponivel: z.number().int().min(0).default(1),
  preco: z.number().min(0),
  sinopse: z.string().max(2000).optional(),
});

// POST — tudo obrigatório
const LivroCreateSchema = LivroBase;

// PUT — tudo obrigatório (substitui o recurso inteiro)
const LivroReplaceSchema = LivroBase;

// PATCH — tudo opcional (atualiza parcialmente)
const LivroPatchSchema = LivroBase.partial();

module.exports = { LivroCreateSchema, LivroReplaceSchema, LivroPatchSchema };