//modelo de dados para Produtos usando Mongoose com MongoDB
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProdutoSchema = new Schema({
  nome: String,
  preco: Number,
  descricao: String,
  categoria: String,
  estoque: Number
});

module.exports = mongoose.model('Produto', ProdutoSchema);
