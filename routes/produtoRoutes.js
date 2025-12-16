const express = require('express');
const router = express.Router();
const ProdutoController = require('../controllers/ProdutoController');
const autenticar = require("../middlewares/autenticarCliente");
const verificarAdmin = require('../middlewares/verificarAdmin');

// ---- Rotas abertas ao cliente ----
router.get('/', ProdutoController.listarProdutosAtivos);
router.get('/:id', ProdutoController.buscarProdutoPorId);

// ---- Rotas exclusivas do admin ----
router.post('/', autenticar, verificarAdmin, ProdutoController.criarProduto);
router.put('/:id', autenticar, verificarAdmin, ProdutoController.atualizarProduto);
router.delete('/:id', autenticar, verificarAdmin, ProdutoController.deletarProduto);

module.exports = router;
