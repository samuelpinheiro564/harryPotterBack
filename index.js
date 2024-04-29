const express = require("express");
const { Pool } = require("pg");

const app = express();
const PORT = 4000;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "harrypotter",
  password: "ds564",
  port: 7007,
});

app.use(express.json());

app.listen(PORT, () => {
  console.log(`funcionando normalmente ${PORT}🚀`);
});

app.get("/bruxos", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM bruxos;");
    res.json(result.rows);
  } catch (err) {
    console.log(err);
  }
});
app.get("/varinha", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM varinha;");
    res.json(result.rows);
  } catch (err) {
    console.log(err);
  }
});

app.get("/bruxos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM bruxos WHERE id = $1", [id]);
    if(result.rowCount === 0) {
        return res.status(404).send("Bruxo não encontrado");
        }
    res.json(result.rows);
  } catch (err) {
    console.log(err);
  }
});
app.get("/", async (req, res) => {    

    return res.send("É importante lutar e continuar lutando, mesmo quando a batalha parece impossível. - Harry Potter");
});
app.get("/bruxos/:nome", async (req, res) => {
    try {
        const { nome } = req.params;
        const result = await pool.query("SELECT * FROM bruxos WHERE nome = $1", [nome]);
        if(result.rowCount === 0) {
            return res.status(404).send("Bruxo não encontrado");
            }
        res.json(result.rows);
    } catch (err) {
        console.log(err);
    }
    });
app.get("/varinha/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM varinha WHERE id = $1", [
      id,
    ]);
    if(result.rowCount === 0) {
        return res.status(404).send("id Varinha não encontrada");
        }
    res.json(result.rows);
  } catch (err) {
    console.log(err);
  }
});
app.post("/bruxos", async (req, res) => {
  try {
    const { nome,idade,casa_hogwarts,patrono,habilidade_especial,status_sangue,id_varinha} = req.body;
    await pool.query(
      "INSERT INTO bruxos (nome,idade,casa_hogwarts,patrono,habilidade_especial,status_sangue,id_varinha) VALUES ($1, $2,$3,$4,$5,$6)",
      [nome,idade,casa_hogwarts,patrono,habilidade_especial,status_sangue,id_varinha]
    );
    if(id_varinha === undefined){
        return res.status(400).send("id_varinha é obrigatório");
    }
    if( nome == nome ){

        return res.status(400).send("bruxo já cadastrado");
    }
    if(nome === undefined){
        return res.status(400).send("Nome é obrigatório");
    }
    if(idade === undefined){
        return res.status(400).send("Idade é obrigatório");
    }
    if(casa_hogwarts === undefined){
        return res.status(400).send("Casa de Hogwarts é obrigatório");
    }
    if(patrono === undefined){
        return res.status(400).send("Patrono é obrigatório");
    }
    if(habilidade_especial === undefined){
        return res.status(400).send("Habilidade especial é obrigatório");
    }
    if(status_sangue === undefined){
        return res.status(400).send("Status de sangue é obrigatório");
    }
    if(id_varinha == id_varinha){
        return res.status(400).send("id_varinha já cadastrado");
    }
    return res.status(201).send("usuario criado com sucesso");
  } catch (error) {
    console.error("erro buscar todos os usuarios", error);
    res.status(500).send(error);
  }
});

app.post("/varinha", async (req, res) => {
  const { material, tamanho, nucleo, data_fabricacao } = req.body;
  try {
    await pool.query(
      "INSERT INTO varinha (material, tamanho, nucleo, data_fabricacao) VALUES ($1, $2, $3, $4)",
      [material, tamanho, nucleo, data_fabricacao]
    );
    if (material == material) {
      return res.status(400).send("Varinha já cadastrada");
    }
    if (material === undefined) {
      return res.status(400).send("Material é obrigatório");
    }
    if(tamanho === undefined){
        return res.status(400).send("Tamanho é obrigatório");
    }
    if(nucleo === undefined){
        return res.status(400).send("Nucleo é obrigatório");
    }
    if(data_fabricacao === undefined){
        return res.status(400).send("Data de fabricação é obrigatório");
    }
    if(id_varinha == id_varinha){
        return res.status(400).send("id_varinha já cadastrado");
    }

    return res.status(201).send("Varinha adicionada com sucesso");
  } catch (erro) {
    console.log(erro);
    return res.status(400).send("Erro ao adicionar varinha");
  }
});
app.put("/varinha/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { material, tamanho, nucleo, data_fabricacao } = req.body;
    const result = await pool.query(
      "UPDATE varinha SET material = $1, tamanho = $2, nucleo = $3, data_fabricacao = $4 WHERE id = $5",
      [material, tamanho, nucleo, data_fabricacao, id]
    );
    if(result.rowCount === 0) {
        return res.status(404).send("Varinha não encontrada");
        }
    res.status(200).send("Varinha atualizada com sucesso");
  } catch (err) {
    console.log(err);
    return res.status(400).send("Erro ao atualizar varinha");
  }
});
app.put("/bruxos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { nome,idade,casa_hogwarts,patrono,habilidade_especial,status_sangue,id_varinha } = req.body;
    await pool.query(
      "UPDATE bruxos SET nome = $1, idade = $2, casa_hogwarts = $3, patrono = $4, habilidade_especial =$5 ,status_sangue = $6, id_varinha = $7 WHERE id = $8",
      [nome,idade,casa_hogwarts,patrono,habilidade_especial,status_sangue,id_varinha, id]
    );
    if(id_varinha === undefined){
        return res.status(400).send("id_varinha é obrigatório");
    }
    if( nome == nome ){

        return res.status(400).send("bruxo já cadastrado");
    }
    if(nome === undefined){
        return res.status(400).send("Nome é obrigatório");
    }
    if(idade === undefined){
        return res.status(400).send("Idade é obrigatório");
    }
    if(casa_hogwarts === undefined){
        return res.status(400).send("Casa de Hogwarts é obrigatório");
    }
    if(patrono === undefined){
        return res.status(400).send("Patrono é obrigatório");
    }
    if(habilidade_especial === undefined){
        return res.status(400).send("Habilidade especial é obrigatório");
    }
    if(status_sangue === undefined){
        return res.status(400).send("Status de sangue é obrigatório");
    }
    if(id_varinha === undefined){
        return res.status(400).send("id_varinha é obrigatório");
    }
    if(id_varinha == id_varinha){
        return res.status(400).send("id_varinha já cadastrado");
    }
 return res.status(200).send("Bruxo atualizado com sucesso");
  } catch (err) {
    console.log(err);
    return  res.status(400).send("Erro ao atualizar bruxo");
  }
});
app.delete("/bruxos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("DELETE FROM bruxos WHERE id = $1", [id]);
    res.json(result);
    if(result.rowCount === 0) {
        return res.status(404).send("Bruxo não encontrado");
        }
        if(id === undefined){
            return res.status(400).send("id é obrigatório");
        }
  } catch (err) {
    console.log(err);
  }
});

app.delete('/varinha/:id', async (req, res) => {
    const { id } = req.params;
    try {

        await pool.query('DELETE FROM bruxos WHERE id_varinha = $1', [id]);
        await pool.query('DELETE FROM varinha WHERE id = $1', [id]);
        if(id === undefined){
            return res.status(400).send("id é obrigatório");
        }
        if(result.rowCount === 0) {
            return res.status(404).send("Varinha não encontrada");
            }

        return res.status(200).send('Bruxo e sua varinha foram deletados com sucesso.');
    } catch (error) {
        console.error('Erro ao deletar bruxo e sua varinha:', error);
        return res.status(500).send('Ocorreu um erro ao deletar bruxo e sua varinha.');
    }
});
