const express = require("express");
const { autores, proximoId } = require("../data/autores.data");
const {
  AutorCreateSchema,
  AutorReplaceSchema,
  AutorPatchSchema,
} = require("../schemas/autores.schema");

const router = express.Router();

// GET /autores?nacionalidade=... → lista com filtro opcional
router.get("/", (req, res) => {
  const { nacionalidade } = req.query;
  let resultado = autores;
  if (nacionalidade) {
    resultado = autores.filter((a) =>
      a.nacionalidade.toLowerCase().includes(nacionalidade.toLowerCase())
    );
  }
  res.json({ total: resultado.length, autores: resultado });
});

// GET /autores/:id → retorna 1 autor ou 404
router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const autor = autores.find((a) => a.id === id);
  if (!autor) return res.status(404).json({ erro: "Autor não encontrado" });
  res.json(autor);
});

// POST /autores → cria e devolve 201
router.post("/", (req, res) => {
  const parsed = AutorCreateSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(422).json({ erro: "Dados inválidos", detalhes: parsed.error.issues });
  }
  const novo = { id: proximoId(), ...parsed.data };
  autores.push(novo);
  res.status(201).json(novo);
});

// PUT /autores/:id → substitui o recurso inteiro
router.put("/:id", (req, res) => {
  const id = Number(req.params.id);
  const idx = autores.findIndex((a) => a.id === id);
  if (idx === -1) return res.status(404).json({ erro: "Autor não encontrado" });

  const parsed = AutorReplaceSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(422).json({ erro: "Dados inválidos", detalhes: parsed.error.issues });
  }
  autores[idx] = { id, ...parsed.data };
  res.json(autores[idx]);
});

// PATCH /autores/:id → atualiza parcialmente
router.patch("/:id", (req, res) => {
  const id = Number(req.params.id);
  const idx = autores.findIndex((a) => a.id === id);
  if (idx === -1) return res.status(404).json({ erro: "Autor não encontrado" });

  const parsed = AutorPatchSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(422).json({ erro: "Dados inválidos", detalhes: parsed.error.issues });
  }
  autores[idx] = { ...autores[idx], ...parsed.data };
  res.json(autores[idx]);
});

// DELETE /autores/:id → 204 sem conteúdo
router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  const idx = autores.findIndex((a) => a.id === id);
  if (idx === -1) return res.status(404).json({ erro: "Autor não encontrado" });

  autores.splice(idx, 1);
  res.status(204).send();
});

module.exports = router;