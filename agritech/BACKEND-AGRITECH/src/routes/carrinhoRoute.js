// routes/carrinhoRoute.js

const express = require("express");
const router = express.Router();
const db = require("../database");

router.get("/", async (req, res) => {
  const [carrinhos] = await db.promise().query(
    `SELECT carrinho.*, produto.nome_produto
     FROM carrinho
     INNER JOIN produto
     ON carrinho.id_produto = produto.id_produto`
  );

  res.json(carrinhos);
});

router.get("/:id", async (req, res) => {
  const [carrinhos] = await db.promise().query(
    "SELECT * FROM carrinho WHERE id_carrinho = ?",
    [req.params.id]
  );

  res.json(carrinhos[0]);
});

router.post("/", async (req, res) => {
  const {
    id_usuario,
    id_produto,
    quantidade
  } = req.body;

  const [resultado] = await db.promise().query(
    `INSERT INTO carrinho
    (id_usuario, id_produto, quantidade)
    VALUES (?, ?, ?)`,
    [id_usuario, id_produto, quantidade]
  );

  res.status(201).json({
    id_carrinho: resultado.insertId,
    id_usuario,
    id_produto,
    quantidade
  });
});

router.put("/:id", async (req, res) => {
  const {
    id_usuario,
    id_produto,
    quantidade
  } = req.body;

  await db.promise().query(
    `UPDATE carrinho
     SET id_usuario = ?, id_produto = ?, quantidade = ?
     WHERE id_carrinho = ?`,
    [
      id_usuario,
      id_produto,
      quantidade,
      req.params.id
    ]
  );

  res.json({
    mensagem: "Carrinho atualizado com sucesso"
  });
});

router.delete("/:id", async (req, res) => {
  await db.promise().query(
    "DELETE FROM carrinho WHERE id_carrinho = ?",
    [req.params.id]
  );

  res.json({
    mensagem: "Item removido do carrinho"
  });
});

module.exports = router;
