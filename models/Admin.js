const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  senha: { type: String, required: true },
  role: { type: String, default: 'admin' } // só pra reforçar
});

module.exports = mongoose.model('Admin', AdminSchema);
