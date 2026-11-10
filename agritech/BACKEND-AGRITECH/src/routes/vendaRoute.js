// routes/vendaRoute.js

const express = require("express");
const router = express.Router();
const db = require("../database");

router.get("/", async (req, res) => {
  const [vendas] = await db.promise().query(
    `SELECT compra_venda.*, usuario.nome
     FROM compra_venda
     INNER JOIN usuario
     ON compra_venda.id_usuario = usuario.id_usuario`
  );

  res.json(vendas);
});

router.get("/:id", async (req, res) => {
  const [vendas] = await db.promise().query(
    "SELECT * FROM compra_venda WHERE id_venda = ?",
    [req.params.id]
  );

  res.json(vendas[0]);
});

router.post("/", async (req, res) => {
  const {
    id_usuario,
    status_venda,
    valor_total
  } = req.body;

  const [resultado] = await db.promise().query(
    `INSERT INTO compra_venda
    (id_usuario, status_venda, valor_total)
    VALUES (?, ?, ?)`,
    [id_usuario, status_venda, valor_total]
  );

  res.status(201).json({
    id_venda: resultado.insertId,
    id_usuario,
    status_venda,
    valor_total
  });
});

router.put("/:id", async (req, res) => {
  const {
    id_usuario,
    status_venda,
    valor_total
  } = req.body;

  await db.promise().query(
    `UPDATE compra_venda
     SET id_usuario = ?, status_venda = ?, valor_total = ?
     WHERE id_venda = ?`,
    [
      id_usuario,
      status_venda,
      valor_total,
      req.params.id
    ]
  );

  res.json({
    mensagem: "Venda atualizada com sucesso"
  });
});

router.delete("/:id", async (req, res) => {
  await db.promise().query(
    "DELETE FROM compra_venda WHERE id_venda = ?",
    [req.params.id]
  );

  res.json({
    mensagem: "Venda excluída com sucesso"
  });
});

module.exports = router;
