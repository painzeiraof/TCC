// routes/estoqueRoute.js

const express = require("express");
const router = express.Router();
const db = require("../database");

router.get("/", async (req, res) => {
  const [estoques] = await db.promise().query(
    `SELECT estoque.*, produto.nome_produto
     FROM estoque
     INNER JOIN produto
     ON estoque.id_produto = produto.id_produto`
  );

  res.json(estoques);
});

router.get("/:id", async (req, res) => {
  const [estoques] = await db.promise().query(
    "SELECT * FROM estoque WHERE id_estoque = ?",
    [req.params.id]
  );

  res.json(estoques[0]);
});

router.post("/", async (req, res) => {
  const {
    id_produto,
    lote,
    localizacao,
    quantidade
  } = req.body;

  const [resultado] = await db.promise().query(
    `INSERT INTO estoque
    (id_produto, lote, localizacao, quantidade)
    VALUES (?, ?, ?, ?)`,
    [id_produto, lote, localizacao, quantidade]
  );

  res.status(201).json({
    id_estoque: resultado.insertId,
    id_produto,
    lote,
    localizacao,
    quantidade
  });
});

router.put("/:id", async (req, res) => {
  const {
    id_produto,
    lote,
    localizacao,
    quantidade
  } = req.body;

  await db.promise().query(
    `UPDATE estoque
     SET id_produto = ?, lote = ?, localizacao = ?, quantidade = ?
     WHERE id_estoque = ?`,
    [
      id_produto,
      lote,
      localizacao,
      quantidade,
      req.params.id
    ]
  );

  res.json({
    mensagem: "Estoque atualizado com sucesso"
  });
});

router.delete("/:id", async (req, res) => {
  await db.promise().query(
    "DELETE FROM estoque WHERE id_estoque = ?",
    [req.params.id]
  );

  res.json({
    mensagem: "Estoque excluído com sucesso"
  });
});

module.exports = router;
