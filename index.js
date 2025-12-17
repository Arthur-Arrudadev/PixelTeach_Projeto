require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

// Rotas
const clienteRoutes = require('./routes/clienteRoutes');
const pedidoRoutes = require('./routes/pedidoRoutes');
const produtoRoutes = require('./routes/produtoRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// SERVIR FRONTEND
app.use(express.static(path.join(__dirname, 'public')));
app.use("/img", express.static(path.join(__dirname, "public/img")));

// Rota principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 🔹 ROTA DE SAÚDE (para testes e CI)
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Rotas da API
app.use('/api/clientes', clienteRoutes);
app.use('/api/pedidos', pedidoRoutes);
app.use('/api/produtos', produtoRoutes);
app.use('/api/admin', adminRoutes);

// Porta
const PORT = process.env.PORT || 8080;

/**
 * ⚠️ BLOCO CRÍTICO
 * Só conecta no Mongo e sobe o servidor
 * se este arquivo for executado diretamente
 */
if (require.main === module) {
  mongoose.connect(process.env.MONGO_URI)
    .then(() => {
      console.log('🟢 Conectado ao MongoDB Atlas');

      app.listen(PORT, () => {
        console.log(`🚀 Servidor rodando na porta ${PORT}`);
      });
    })
    .catch((err) => {
      console.error('🔴 Erro ao conectar ao MongoDB:', err);
    });
}

// 🔹 EXPORTA O APP PARA TESTES
module.exports = app;
