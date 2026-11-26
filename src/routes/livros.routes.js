const express = require("express");
const { livros, proximoId } = require("../data/livros.data");
const {
  LivroCreateSchema,
  LivroReplaceSchema,
  LivroPatchSchema,
} = require("../schemas/livros.schema");

const router = express.Router();

// GET /livros?titulo=... → lista com filtro opcional
router.get("/", (req, res) => {
  const { titulo } = req.query;
  let resultado = livros;
  if (titulo) {
    resultado = livros.filter((l) =>
      l.titulo.toLowerCase().includes(titulo.toLowerCase())
    );
  }
  res.json({ total: resultado.length, livros: resultado });
});

// GET /livros/:id → retorna 1 livro ou 404
router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const livro = livros.find((l) => l.id === id);
  if (!livro) return res.status(404).json({ erro: "Livro não encontrado" });
  res.json(livro);
});

// POST /livros → cria e devolve 201 com o novo recurso
router.post("/", (req, res) => {
  const parsed = LivroCreateSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(422).json({ erro: "Dados inválidos", detalhes: parsed.error.issues });
  }
  const novo = { id: proximoId(), ...parsed.data };
  livros.push(novo);
  res.status(201).json(novo);
});

// PUT /livros/:id → substitui o recurso inteiro
router.put("/:id", (req, res) => {
  const id = Number(req.params.id);
  const idx = livros.findIndex((l) => l.id === id);
  if (idx === -1) return res.status(404).json({ erro: "Livro não encontrado" });

  const parsed = LivroReplaceSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(422).json({ erro: "Dados inválidos", detalhes: parsed.error.issues });
  }
  livros[idx] = { id, ...parsed.data };
  res.json(livros[idx]);
});

// PATCH /livros/:id → atualiza parcialmente
router.patch("/:id", (req, res) => {
  const id = Number(req.params.id);
  const idx = livros.findIndex((l) => l.id === id);
  if (idx === -1) return res.status(404).json({ erro: "Livro não encontrado" });

  const parsed = LivroPatchSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(422).json({ erro: "Dados inválidos", detalhes: parsed.error.issues });
  }
  livros[idx] = { ...livros[idx], ...parsed.data };
  res.json(livros[idx]);
});

// DELETE /livros/:id → 204 sem conteúdo
router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  const idx = livros.findIndex((l) => l.id === id);
  if (idx === -1) return res.status(404).json({ erro: "Livro não encontrado" });

  livros.splice(idx, 1);
  res.status(204).send();
});

module.exports = router;