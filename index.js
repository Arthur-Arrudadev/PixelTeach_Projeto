
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const clienteRoutes = require('./routes/clienteRoutes');
const pedidoRoutes = require('./routes/pedidoRoutes');
const produtoRoutes = require('./routes/produtoRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API PixelTech funcionando! 🎉');
});

app.use('/api/clientes', clienteRoutes);
app.use('/api/pedidos', pedidoRoutes);
app.use('/api/produtos', produtoRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('🟢 Conectado ao MongoDB Atlas');
  })
  .catch((err) => {
    console.error('🔴 Erro ao conectar ao MongoDB:', err);
  });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
