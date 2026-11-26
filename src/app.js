// src/app.js
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const livrosRouter = require("./routes/livros.routes");
const autoresRouter = require("./routes/autores.routes");
const { erroHandler } = require("./middlewares/erros");

const app = express();

// Middlewares globais
app.use(cors()); // libera CORS para todos os domínios
app.use(express.json()); // lê JSON do corpo das requisições
app.use(morgan("dev")); // log colorido de requisições

// Rota raiz
app.get("/", (req, res) => {
  res.json({
    nome: "BiblioTech API",
    versao: "0.1.0",
    docs: "/livros, /autores",
  });
});

// Rotas de recursos
app.use("/livros", livrosRouter);
app.use("/autores", autoresRouter);

// 404 genérico
app.use((req, res) => {
  res.status(404).json({ erro: "Rota não encontrada" });
});

// Middleware de erros (sempre por último)
app.use(erroHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`[biblio-tech] rodando em http://localhost:${PORT}`);
});