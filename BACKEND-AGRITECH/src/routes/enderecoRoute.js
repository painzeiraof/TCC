// routes/enderecoRoute.js

const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    mensagem: "O endereço está armazenado na tabela usuario"
  });
});

module.exports = router;
