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

// ⬇️ AS PRÓXIMAS ROTAS ENTRAM AQUI ⬇️

module.exports = router;