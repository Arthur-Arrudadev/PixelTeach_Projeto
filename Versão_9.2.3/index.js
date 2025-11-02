require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path'); // Para servir arquivos estáticos

// Rotas
const clienteRoutes = require('./routes/clienteRoutes');
const pedidoRoutes = require('./routes/pedidoRoutes');
const produtoRoutes = require('./routes/produtoRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// SERVIR FRONTEND (pasta 'public')
app.use(express.static(path.join(__dirname, 'public')));

// ROTA PRINCIPAL → abre o index.html bonito
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Rotas da API
app.use('/api/clientes', clienteRoutes);
app.use('/api/pedidos', pedidoRoutes);
app.use('/api/produtos', produtoRoutes);

// Conexão com MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('🟢 Conectado ao MongoDB Atlas');
  })
  .catch((err) => {
    console.error('🔴 Erro ao conectar ao MongoDB:', err);
  });

// Porta do Cloud9
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`🌐 Acesse: https://<seu-id>.vfs.cloud9.us-east-1.amazonaws.com:${PORT}`);
});
