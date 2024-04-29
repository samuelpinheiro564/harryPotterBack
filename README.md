# API Harry Potter

Esta é uma API simples para gerenciar informações sobre bruxos e varinhas no mundo de Harry Potter.

## Requisitos

- Node.js
- PostgreSQL

## Instalação

1. Clone o repositório:

```bash
git clone <URL_DO_REPOSITORIO>
cd harry-potter-api
```

2. Instale as dependências:

```bash
npm install
```

3. Configure o banco de dados PostgreSQL. Certifique-se de que o PostgreSQL esteja em execução e crie um banco de dados chamado `harrypotter`.

4. Execute o servidor:

```bash
node index.js
```

O servidor estará em execução em `http://localhost:4000`.

## Rotas

### GET /bruxos

Retorna uma lista de todos os bruxos cadastrados.

### GET /varinha

Retorna uma lista de todas as varinhas cadastradas.

### GET /bruxos/:id

Retorna informações sobre um bruxo específico com base no ID fornecido.

### GET /bruxos/:nome

Retorna informações sobre um bruxo específico com base no nome fornecido.

### GET /varinha/:id

Retorna informações sobre uma varinha específica com base no ID fornecido.

### POST /bruxos

Cria um novo registro de bruxo com os dados fornecidos no corpo da requisição.

### POST /varinha

Cria um novo registro de varinha com os dados fornecidos no corpo da requisição.

### PUT /bruxos/:id

Atualiza as informações de um bruxo existente com base no ID fornecido.

### PUT /varinha/:id

Atualiza as informações de uma varinha existente com base no ID fornecido.

### DELETE /bruxos/:id

Remove um bruxo específico com base no ID fornecido.

### DELETE /varinha/:id

Remove uma varinha específica com base no ID fornecido, juntamente com o bruxo associado a ela.

```