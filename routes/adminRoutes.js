const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/AdminController');
const autenticar = require("../middlewares/autenticarCliente");
const verificarAdmin = require('../middlewares/verificarAdmin');

// criar admin — USE UMA VEZ SÓ
router.post('/', AdminController.criarAdmin);

// login de admin
router.post('/login', AdminController.login);

// ver perfil do admin
router.get('/perfil', autenticar, verificarAdmin, AdminController.perfil);

module.exports = router;
