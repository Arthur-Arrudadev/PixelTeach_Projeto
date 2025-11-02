
const express = require('express');
const router = express.Router();
const PedidoController = require('../controllers/PedidoController');

router.post('/', PedidoController.criarPedido);
router.get('/', PedidoController.listarPedidos);
router.get('/:id', PedidoController.buscarPedidoPorId);
router.delete('/:id', PedidoController.deletarPedido);

module.exports = router;