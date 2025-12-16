require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Pedido = require('./models/Pedido');
const Cliente = require("./models/Cliente");

const app = express();
app.use(cors());
app.use(express.json());

// Rota de teste
app.get('/', (req, res) => {
  res.send('API PixelTech funcionando! 🎉');
});

// Rota para salvar pedidos

app.post('/api/pedidos', async (req, res) => {
  try {
    const novoPedido = new Pedido(req.body);
    await novoPedido.save();
    res.status(201).json({
        success: true,
        id: novoPedido._id,
        mensagem: "Pedido salvo com sucesso!" });
  } catch (error) {
    console.error("Erro ao salvar pedido:", error);
    res.status(500).json({
        success: false,
        mensagem: "Não foi possível salvar o pedido." });
  }
});

// Rota para salvar clientes

app.post("/api/clientes", async (req, res) => {
  try {
    const novoCliente = new Cliente(req.body);
    await novoCliente.save();
    res.status(201).json({ success: true, mensagem: "Cliente salvo com sucesso!" });
  } catch (error) {
    console.error("Erro ao salvar cliente:", error);
    res.status(500).json({ success: false, mensagem: "Erro ao salvar cliente." });
  }
});

// Rota de login
app.post("/api/login", async (req, res) => {
  try {
    const { email, senha } = req.body;

    // Validação básica
    if (!email || !senha) {
      return res.status(400).json({ 
        sucesso: false,
        mensagem: "Email e senha são obrigatórios." 
      });
    }

    const cliente = await Cliente.findOne({ email });

    if (!cliente) {
      return res.status(401).json({ 
        sucesso: false,
        mensagem: "Usuário não encontrado." 
      });
    }

    if (cliente.senha !== senha) {
      return res.status(401).json({ 
        sucesso: false,
        mensagem: "Senha incorreta." 
      });
    }

    res.status(200).json({
      sucesso: true,
      mensagem: "Login realizado com sucesso!",
      cliente: {
        _id: cliente._id,
        nome: cliente.nome,
        email: cliente.email
      }
    });

  } catch (erro) {
    console.error(erro);
    res.status(500).json({ 
      sucesso: false,
      mensagem: "Erro interno do servidor." 
    });
  }
});

// Rota do cadastro de clientes

app.put("/api/clientes/:id/endereco", async (req, res) => {
  const { id } = req.params;
  const endereco = req.body;

  try {
    const cliente = await Cliente.findByIdAndUpdate(id, { endereco }, { new: true });
    if (!cliente) {
      return res.status(404).json({ mensagem: "Cliente não encontrado" });
    }
    res.json({ sucesso: true, mensagem: "Endereço atualizado com sucesso", cliente });
  } catch (erro) {
    console.error("Erro ao atualizar endereço:", erro);
    res.status(500).json({ mensagem: "Erro no servidor" });
  }
});

// Conectar ao MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('🟢 Conectado ao MongoDB Atlas');
  })
  .catch((err) => {
    console.error('🔴 Erro ao conectar ao MongoDB:', err);
  });

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
