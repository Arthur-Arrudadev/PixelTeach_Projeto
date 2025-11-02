
const express = require('express');
const router = express.Router();
const ClienteController = require('../controllers/ClienteController');

router.post('/', ClienteController.criarCliente);
router.post('/login', ClienteController.login);
router.put('/:id/endereco', ClienteController.atualizarEndereco);
router.put('/:id/senha', ClienteController.atualizarSenha);
router.get('/', ClienteController.listarClientes);
router.get('/:id', ClienteController.buscarClientePorId);
router.delete('/:id', ClienteController.deletarCliente);

module.exports = router;
