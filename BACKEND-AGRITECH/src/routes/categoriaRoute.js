// routes/categoriaRoute.js

const express = require("express");
const router = express.Router();
const db = require("../database");

router.get("/", async (req, res) => {
  const [categorias] = await db.promise().query(
    "SELECT * FROM categoria"
  );

  res.json(categorias);
});

router.get("/:id", async (req, res) => {
  const [categorias] = await db.promise().query(
    "SELECT * FROM categoria WHERE id_categoria = ?",
    [req.params.id]
  );

  res.json(categorias[0]);
});

router.post("/", async (req, res) => {
  const {
    nome,
    descricao
  } = req.body;

  const [resultado] = await db.promise().query(
    `INSERT INTO categoria
    (nome, descricao)
    VALUES (?, ?)`,
    [nome, descricao]
  );

  res.status(201).json({
    id_categoria: resultado.insertId,
    nome,
    descricao
  });
});

router.put("/:id", async (req, res) => {
  const {
    nome,
    descricao
  } = req.body;

  await db.promise().query(
    `UPDATE categoria
     SET nome = ?, descricao = ?
     WHERE id_categoria = ?`,
    [nome, descricao, req.params.id]
  );

  res.json({
    mensagem: "Categoria atualizada com sucesso"
  });
});

router.delete("/:id", async (req, res) => {
  await db.promise().query(
    "DELETE FROM categoria WHERE id_categoria = ?",
    [req.params.id]
  );

  res.json({
    mensagem: "Categoria excluída com sucesso"
  });
});

module.exports = router;
