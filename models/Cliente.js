const mongoose = require("mongoose");

const ClienteSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true },
  senha: { type: String, required: true },
  
  role: {
    type: String,
    enum: ["cliente", "admin"],
    default: "cliente"
  },

  endereco: {
    rua: String,
    numero: String,
    bairro: String,
    cidade: String,
    estado: String,
    cep: String,
  },

  dataCadastro: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Cliente", ClienteSchema);
