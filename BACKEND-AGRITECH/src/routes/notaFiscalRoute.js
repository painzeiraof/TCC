// routes/notaFiscalRoute.js

const express = require("express");
const router = express.Router();
const db = require("../database");

// Listar notas fiscais
router.get("/", async (req, res) => {
  try {
    const [notasFiscais] = await db.promise().query(
      `SELECT 
        nota_fiscal.id_nota_fiscal,
        nota_fiscal.id_venda,
        nota_fiscal.valor_imposto,
        nota_fiscal.data_emissao,
        nota_fiscal.chave_acesso,
        compra_venda.valor_total,
        compra_venda.id_usuario
       FROM nota_fiscal
       INNER JOIN compra_venda
       ON nota_fiscal.id_venda = compra_venda.id_venda`
    );

    res.json(notasFiscais);
  } catch (erro) {
    res.status(500).json({
      mensagem: "Erro ao buscar notas fiscais",
      erro: erro.message
    });
  }
});

// Buscar nota fiscal por ID
router.get("/:id", async (req, res) => {
  try {
    const [notasFiscais] = await db.promise().query(
      `SELECT 
        nota_fiscal.id_nota_fiscal,
        nota_fiscal.id_venda,
        nota_fiscal.valor_imposto,
        nota_fiscal.data_emissao,
        nota_fiscal.chave_acesso,
        compra_venda.valor_total,
        compra_venda.id_usuario
       FROM nota_fiscal
       INNER JOIN compra_venda
       ON nota_fiscal.id_venda = compra_venda.id_venda
       WHERE nota_fiscal.id_nota_fiscal = ?`,
      [req.params.id]
    );

    if (notasFiscais.length === 0) {
      return res.status(404).json({
        mensagem: "Nota fiscal não encontrada"
      });
    }

    res.json(notasFiscais[0]);
  } catch (erro) {
    res.status(500).json({
      mensagem: "Erro ao buscar nota fiscal",
      erro: erro.message
    });
  }
});

// Cadastrar nota fiscal
router.post("/", async (req, res) => {
  try {
    const {
      id_venda,
      valor_imposto,
      chave_acesso
    } = req.body;

    const [resultado] = await db.promise().query(
      `INSERT INTO nota_fiscal
      (id_venda, valor_imposto, chave_acesso)
      VALUES (?, ?, ?)`,
      [
        id_venda,
        valor_imposto,
        chave_acesso
      ]
    );

    res.status(201).json({
      mensagem: "Nota fiscal cadastrada com sucesso",
      id_nota_fiscal: resultado.insertId,
      id_venda,
      valor_imposto,
      chave_acesso
    });
  } catch (erro) {
    res.status(500).json({
      mensagem: "Erro ao cadastrar nota fiscal",
      erro: erro.message
    });
  }
});

// Atualizar nota fiscal
router.put("/:id", async (req, res) => {
  try {
    const {
      id_venda,
      valor_imposto,
      chave_acesso
    } = req.body;

    const [resultado] = await db.promise().query(
      `UPDATE nota_fiscal
       SET id_venda = ?,
           valor_imposto = ?,
           chave_acesso = ?
       WHERE id_nota_fiscal = ?`,
      [
        id_venda,
        valor_imposto,
        chave_acesso,
        req.params.id
      ]
    );

    if (resultado.affectedRows === 0) {
      return res.status(404).json({
        mensagem: "Nota fiscal não encontrada"
      });
    }

    res.json({
      mensagem: "Nota fiscal atualizada com sucesso"
    });
  } catch (erro) {
    res.status(500).json({
      mensagem: "Erro ao atualizar nota fiscal",
      erro: erro.message
    });
  }
});

// Excluir nota fiscal
router.delete("/:id", async (req, res) => {
  try {
    const [resultado] = await db.promise().query(
      "DELETE FROM nota_fiscal WHERE id_nota_fiscal = ?",
      [req.params.id]
    );

    if (resultado.affectedRows === 0) {
      return res.status(404).json({
        mensagem: "Nota fiscal não encontrada"
      });
    }

    res.json({
      mensagem: "Nota fiscal excluída com sucesso"
    });
  } catch (erro) {
    res.status(500).json({
      mensagem: "Erro ao excluir nota fiscal",
      erro: erro.message
    });
  }
});

module.exports = router;
