const mongoose = require("mongoose");

const PedidoSchema = new mongoose.Schema({
  cliente: String,
  endereco: {
    rua: String,
    numero: String,
    bairro: String,
    cidade: String,
    estado: String,
    cep: String,
  },
  itens: [
    {
      nome: String,
      preco: Number,
      quantidade: Number,
      total: Number,
    },
  ],
  total: Number,
  formaPagamento: String,
  data: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Pedido", PedidoSchema);
