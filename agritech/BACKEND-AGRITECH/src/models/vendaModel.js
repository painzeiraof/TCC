const db = require('../../db');

exports.listar = () => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM venda', (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

exports.criar = (venda) => {
  return new Promise((resolve, reject) => {
    db.query(
      'INSERT INTO venda (usuario_id, data_venda, valor_total, status) VALUES (?, ?, ?, ?)',
      [venda.usuario_id, venda.data_venda, venda.valor_total, venda.status],
      (err, result) => {
        if (err) return reject(err);
        resolve({ id: result.insertId, ...venda });
      }
    );
  });
};

exports.atualizar = (id, dados) => {
  return new Promise((resolve, reject) => {
    db.query(
      'UPDATE venda SET usuario_id = ?, data_venda = ?, valor_total = ?, status = ? WHERE id = ?',
      [dados.usuario_id, dados.data_venda, dados.valor_total, dados.status, id],
      (err, result) => {
        if (err) return reject(err);
        resolve({ id, ...dados });
      }
    );
  });
};

exports.deletar = (id) => {
  return new Promise((resolve, reject) => {
    db.query('DELETE FROM venda WHERE id = ?', [id], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};
