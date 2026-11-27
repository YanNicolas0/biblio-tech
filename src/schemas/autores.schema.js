const { z } = require("zod");

const AutorBase = z.object({
  nome: z.string().min(1, "Nome é obrigatório").max(150),
  nacionalidade: z.string().min(1, "Nacionalidade é obrigatória").max(60),
  data_nascimento: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Data deve estar no formato AAAA-MM-DD"),
  biografia: z.string().max(2000).optional(),
});

// POST — tudo obrigatório
const AutorCreateSchema = AutorBase;

// PUT — tudo obrigatório (substitui o recurso inteiro)
const AutorReplaceSchema = AutorBase;

// PATCH — tudo opcional
const AutorPatchSchema = AutorBase.partial();

module.exports = { AutorCreateSchema, AutorReplaceSchema, AutorPatchSchema };