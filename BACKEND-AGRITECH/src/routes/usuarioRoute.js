// routes/usuarioRoute.js

const express = require("express");
const router = express.Router();
const db = require("../database");

router.get("/", async (req, res) => {
  const [usuarios] = await db.promise().query(
    "SELECT * FROM usuario"
  );

  res.json(usuarios);
});

router.get("/:id", async (req, res) => {
  const [usuarios] = await db.promise().query(
    "SELECT * FROM usuario WHERE id_usuario = ?",
    [req.params.id]
  );

  res.json(usuarios[0]);
});

router.post("/", async (req, res) => {
  const {
    nome,
    cpf,
    email,
    senha,
    endereco
  } = req.body;

  const [resultado] = await db.promise().query(
    `INSERT INTO usuario
    (nome, cpf, email, senha, endereco)
    VALUES (?, ?, ?, ?, ?)`,
    [nome, cpf, email, senha, endereco]
  );

  res.status(201).json({
    id_usuario: resultado.insertId,
    nome,
    cpf,
    email,
    endereco
  });
});

router.put("/:id", async (req, res) => {
  const {
    nome,
    cpf,
    email,
    senha,
    endereco
  } = req.body;

  await db.promise().query(
    `UPDATE usuario
     SET nome = ?, cpf = ?, email = ?, senha = ?, endereco = ?
     WHERE id_usuario = ?`,
    [nome, cpf, email, senha, endereco, req.params.id]
  );

  res.json({
    mensagem: "Usuário atualizado com sucesso"
  });
});

router.delete("/:id", async (req, res) => {
  await db.promise().query(
    "DELETE FROM usuario WHERE id_usuario = ?",
    [req.params.id]
  );

  res.json({
    mensagem: "Usuário excluído com sucesso"
  });
});

module.exports = router;

