const { faker } = require("@faker-js/faker");

faker.seed(42); // determinístico: toda vez os mesmos dados

function gerarLivro(id) {
  return {
    id,
    titulo: faker.lorem.words({ min: 2, max: 5 }).replace(/\b\w/g, (c) => c.toUpperCase()),
    isbn: faker.string.numeric(13),
    ano: faker.number.int({ min: 1980, max: 2026 }),
    editora: faker.company.name(),
    qtd_disponivel: faker.number.int({ min: 0, max: 10 }),
    preco: Number(faker.commerce.price({ min: 20, max: 300, dec: 2 })),
    sinopse: faker.lorem.paragraph(),
  };
}

const livros = Array.from({ length: 20 }, (_, i) => gerarLivro(i + 1));

let nextId = livros.length + 1;
function proximoId() {
  return nextId++;
}

module.exports = { livros, proximoId };