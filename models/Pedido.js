// loja-pixeltech-backend/models/Pedido.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PedidoSchema = new Schema({
  cliente: String,
  endereco: {
    rua: String,
    numero: String,
    bairro: String,
    cidade: String,
    estado: String,
    cep: String
  }, // Opcional, sem required: true
  itens: [{
    nome: String,
    preco: Number,
    quantidade: Number,
    total: Number
  }],
  total: Number,
  formaPagamento: String,
  data: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Pedido', PedidoSchema);
