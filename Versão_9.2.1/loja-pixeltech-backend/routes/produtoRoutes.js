
const express = require('express');
const router = express.Router();
const ProdutoController = require('../controllers/ProdutoController');

router.post('/', ProdutoController.criarProduto);
router.get('/', ProdutoController.listarProdutos);
router.get('/:id', ProdutoController.buscarProdutoPorId);
router.put('/:id', ProdutoController.atualizarProduto);
router.delete('/:id', ProdutoController.deletarProduto);

module.exports = router;
