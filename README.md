# BiblioTech UNIAVAN

API REST para gestão de biblioteca universitária, desenvolvida na disciplina de Programação Web I (UNIAVAN).

Nesta etapa (Módulo 2) os dados ficam em memória (arrays JavaScript gerados com faker). Ao reiniciar o servidor, os dados voltam ao estado inicial.

## Tecnologias

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/pt-br/) — servidor HTTP e rotas
- [Zod](https://zod.dev) — validação dos dados de entrada
- [@faker-js/faker](https://fakerjs.dev/) — dados fictícios
- [dotenv](https://github.com/motdotla/dotenv) — variáveis de ambiente
- [cors](https://github.com/expressjs/cors) — liberação de CORS
- [morgan](https://github.com/expressjs/morgan) — log de requisições

## Como rodar

```bash
# 1. Clonar o repositório
git clone https://github.com/YanNicolas0/biblio-tech.git
cd biblio-tech

# 2. Instalar as dependências
npm install

# 3. Criar o arquivo .env a partir do modelo
cp .env.example .env

# 4. Rodar em modo desenvolvimento (reinicia ao salvar)
npm run dev
```

A API sobe em `http://localhost:3000`.

## Endpoints

### Livros

| Método | Rota | Descrição | Sucesso |
|---|---|---|---|
| GET | `/livros` | Lista todos os livros (filtro opcional `?titulo=`) | 200 |
| GET | `/livros/:id` | Retorna um livro | 200 |
| POST | `/livros` | Cria um livro | 201 |
| PUT | `/livros/:id` | Substitui um livro inteiro | 200 |
| PATCH | `/livros/:id` | Atualiza parte de um livro | 200 |
| DELETE | `/livros/:id` | Remove um livro | 204 |

### Autores

| Método | Rota | Descrição | Sucesso |
|---|---|---|---|
| GET | `/autores` | Lista todos os autores (filtro opcional `?nacionalidade=`) | 200 |
| GET | `/autores/:id` | Retorna um autor | 200 |
| POST | `/autores` | Cria um autor | 201 |
| PUT | `/autores/:id` | Substitui um autor inteiro | 200 |
| PATCH | `/autores/:id` | Atualiza parte de um autor | 200 |
| DELETE | `/autores/:id` | Remove um autor | 204 |

Campos de um autor:

| Campo | Tipo | Regra |
|---|---|---|
| `nome` | string | obrigatório, até 150 caracteres |
| `nacionalidade` | string | obrigatório, até 60 caracteres |
| `data_nascimento` | string | obrigatório, formato `AAAA-MM-DD` |
| `biografia` | string | opcional, até 2000 caracteres |

Exemplo de corpo para `POST /autores`:

```json
{
  "nome": "Machado de Assis",
  "nacionalidade": "Brasileira",
  "data_nascimento": "1839-06-21",
  "biografia": "Fundador da Academia Brasileira de Letras."
}
```

### Respostas de erro

| Status | Quando acontece |
|---|---|
| 400 | JSON malformado no corpo da requisição |
| 404 | Recurso ou rota não encontrados |
| 422 | Dados não passaram na validação do Zod |
| 500 | Erro interno do servidor |

## Testes

As rotas foram testadas no Postman, usando um environment `BiblioTech - Local` com a variável `baseUrl = http://localhost:3000`.

## Autor

Yan Nicolas — [github.com/YanNicolas0](https://github.com/YanNicolas0)

## Status

Módulo 2 concluído: CRUD de Livros e Autores com dados em memória.
