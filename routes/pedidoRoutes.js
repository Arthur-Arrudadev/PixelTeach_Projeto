const express = require('express');
const router = express.Router();
const PedidoController = require('../controllers/PedidoController');
const autenticar = require("../middlewares/autenticarCliente");
const verificarAdmin = require('../middlewares/verificarAdmin');

// Cliente cria pedido
router.post('/', PedidoController.criarPedido);

// Admin vê todos os pedidos
router.get('/', autenticar, verificarAdmin, PedidoController.listarPedidos);

// Admin vê pedido específico
router.get('/:id', autenticar, verificarAdmin, PedidoController.buscarPedidoPorId);

// Admin deleta pedido
router.delete('/:id', autenticar, verificarAdmin, PedidoController.deletarPedido);

module.exports = router;
