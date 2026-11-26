function erroHandler(err, req, res, next) {
  // JSON malformado no corpo da requisição
  if (err.type === "entity.parse.failed") {
    return res.status(400).json({ erro: "JSON malformado" });
  }
  console.error(err);
  res.status(500).json({ erro: "Erro interno do servidor" });
}

module.exports = { erroHandler };