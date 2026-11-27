const { faker } = require("@faker-js/faker");

faker.seed(7); // deterministico: toda vez os mesmos autores

const nacionalidades = ["Brasileira", "Portuguesa", "Argentina", "Americana", "Inglesa", "Francesa"];

function gerarAutor(id) {
  return {
    id,
    nome: faker.person.fullName(),
    nacionalidade: faker.helpers.arrayElement(nacionalidades),
    data_nascimento: faker.date
      .birthdate({ mode: "age", min: 30, max: 90 })
      .toISOString()
      .slice(0, 10), // formato AAAA-MM-DD
    biografia: faker.lorem.paragraph(),
  };
}

const autores = Array.from({ length: 10 }, (_, i) => gerarAutor(i + 1));

let nextId = autores.length + 1;
function proximoId() {
  return nextId++;
}

module.exports = { autores, proximoId };
