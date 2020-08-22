const { Router } = require('express');

const r = Router();

r.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'API - YOPmail. v1 path live 🔥',
    data: null
  });
});

module.exports = r;
