// routes/produtoRoute.js

const express = require("express");
const router = express.Router();
const db = require("../database");

router.get("/", async (req, res) => {
  const [produtos] = await db.promise().query(
    `SELECT produto.*, categoria.nome AS categoria
     FROM produto
     INNER JOIN categoria
     ON produto.id_categoria = categoria.id_categoria`
  );

  res.json(produtos);
});

router.get("/:id", async (req, res) => {
  const [produtos] = await db.promise().query(
    `SELECT produto.*, categoria.nome AS categoria
     FROM produto
     INNER JOIN categoria
     ON produto.id_categoria = categoria.id_categoria
     WHERE produto.id_produto = ?`,
    [req.params.id]
  );

  res.json(produtos[0]);
});

router.post("/", async (req, res) => {
  const {
    nome_produto,
    descricao,
    preco,
    id_categoria
  } = req.body;

  const [resultado] = await db.promise().query(
    `INSERT INTO produto
    (nome_produto, descricao, preco, id_categoria)
    VALUES (?, ?, ?, ?)`,
    [nome_produto, descricao, preco, id_categoria]
  );

  res.status(201).json({
    id_produto: resultado.insertId,
    nome_produto,
    descricao,
    preco,
    id_categoria
  });
});

router.put("/:id", async (req, res) => {
  const {
    nome_produto,
    descricao,
    preco,
    id_categoria
  } = req.body;

  await db.promise().query(
    `UPDATE produto
     SET nome_produto = ?, descricao = ?, preco = ?, id_categoria = ?
     WHERE id_produto = ?`,
    [
      nome_produto,
      descricao,
      preco,
      id_categoria,
      req.params.id
    ]
  );

  res.json({
    mensagem: "Produto atualizado com sucesso"
  });
});

router.delete("/:id", async (req, res) => {
  await db.promise().query(
    "DELETE FROM produto WHERE id_produto = ?",
    [req.params.id]
  );

  res.json({
    mensagem: "Produto excluído com sucesso"
  });
});

module.exports = router;
