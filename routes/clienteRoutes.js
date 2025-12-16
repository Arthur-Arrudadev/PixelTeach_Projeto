const express = require('express');
const router = express.Router();
const ClienteController = require('../controllers/ClienteController');
const autenticar = require("../middlewares/autenticarCliente");
const verificarAdmin = require('../middlewares/verificarAdmin');

// ========== ROTAS PÚBLICAS ==========
router.post('/', ClienteController.criarCliente); // Criação pública
router.post('/login', ClienteController.login);

// ========== ROTAS DO PRÓPRIO CLIENTE (autenticado) ==========
router.put('/:id/endereco', autenticar, ClienteController.atualizarEndereco);
router.put('/:id/senha', autenticar, ClienteController.atualizarSenha);

// ========== ROTAS ADMINISTRATIVAS ==========
router.get('/', autenticar, verificarAdmin, ClienteController.listarClientes);
router.get('/:id', autenticar, verificarAdmin, ClienteController.buscarClientePorId);

// NOVA: Criar cliente como admin (pode ter campos diferentes)
router.post('/admin/criar', autenticar, verificarAdmin, ClienteController.criarClienteComoAdmin);

// NOVA: Atualizar cliente como admin
router.put('/:id/admin', autenticar, verificarAdmin, ClienteController.atualizarClienteComoAdmin);

// Já existe: Deletar cliente
router.delete('/:id', autenticar, verificarAdmin, ClienteController.deletarCliente);

module.exports = router;