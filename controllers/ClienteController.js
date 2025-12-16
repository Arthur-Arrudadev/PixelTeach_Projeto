// loja-pixeltech-backend/controllers/ClienteController.js
const Cliente = require('../models/Cliente');

// Criar cliente
exports.criarCliente = async (req, res) => {
  try {
    const novoCliente = new Cliente(req.body);
    await novoCliente.save();
    res.status(201).json({ success: true, mensagem: "Cliente salvo com sucesso!", id: novoCliente._id });
  } catch (error) {
    console.error("Erro ao salvar cliente:", error);
    res.status(500).json({ success: false, mensagem: "Erro ao salvar cliente." });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { email, senha } = req.body;
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
        email: cliente.email,
        role: cliente.role
      }
    });
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ 
      sucesso: false,
      mensagem: "Erro interno do servidor." 
    });
  }
};

// Atualizar endereço
exports.atualizarEndereco = async (req, res) => {
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
};

// Atualizar senha
exports.atualizarSenha = async (req, res) => {
  const { id } = req.params;
  const { senhaAtual, novaSenha } = req.body;
  try {
    const cliente = await Cliente.findById(id);
    if (!cliente) {
      return res.status(404).json({ sucesso: false, mensagem: "Cliente não encontrado." });
    }
    if (cliente.senha !== senhaAtual) {
      return res.status(401).json({ sucesso: false, mensagem: "Senha atual incorreta." });
    }
    cliente.senha = novaSenha;
    await cliente.save();
    res.json({ sucesso: true, mensagem: "Senha atualizada com sucesso!", cliente });
  } catch (erro) {
    console.error("Erro ao atualizar senha:", erro);
    res.status(500).json({ sucesso: false, mensagem: "Erro ao atualizar senha." });
  }
};

// Listar todos os clientes
exports.listarClientes = async (req, res) => {
  try {
    const clientes = await Cliente.find();
    res.status(200).json({ success: true, clientes });
  } catch (error) {
    console.error("Erro ao listar clientes:", error);
    res.status(500).json({ success: false, mensagem: "Erro ao listar clientes." });
  }
};

// Buscar cliente por ID
exports.buscarClientePorId = async (req, res) => {
  const { id } = req.params;
  try {
    const cliente = await Cliente.findById(id);
    if (!cliente) {
      return res.status(404).json({ success: false, mensagem: "Cliente não encontrado." });
    }
    res.status(200).json({ success: true, cliente });
  } catch (error) {
    console.error("Erro ao buscar cliente:", error);
    res.status(500).json({ success: false, mensagem: "Erro ao buscar cliente." });
  }
};

// Deletar cliente
exports.deletarCliente = async (req, res) => {
  const { id } = req.params;
  try {
    const cliente = await Cliente.findByIdAndDelete(id);
    if (!cliente) {
      return res.status(404).json({ success: false, mensagem: "Cliente não encontrado." });
    }
    res.status(200).json({ success: true, mensagem: "Cliente deletado com sucesso!" });
  } catch (error) {
    console.error("Erro ao deletar cliente:", error);
    res.status(500).json({ success: false, mensagem: "Erro ao deletar cliente." });
  }
};

// Criar cliente como admin (pode ter campos extras)
exports.criarClienteComoAdmin = async (req, res) => {
  try {
    const { nome, email, senha, telefone, role = 'cliente', endereco } = req.body;
    
    // Validação básica
    if (!nome || !email || !senha) {
      return res.status(400).json({ 
        success: false, 
        mensagem: 'Nome, email e senha são obrigatórios' 
      });
    }
    
    // Verifica se email já existe
    const clienteExistente = await Cliente.findOne({ email });
    if (clienteExistente) {
      return res.status(400).json({ 
        success: false, 
        mensagem: 'Este email já está cadastrado' 
      });
    }
    
    // Cria o cliente (sua lógica atual salva senha em texto)
    const novoCliente = new Cliente({
      nome,
      email,
      senha, // Você está salvando em texto - considere usar bcrypt depois
      telefone,
      role,
      endereco
    });
    
    await novoCliente.save();
    
    res.status(201).json({
      success: true,
      mensagem: 'Cliente criado com sucesso pelo admin',
      cliente: {
        _id: novoCliente._id,
        nome: novoCliente.nome,
        email: novoCliente.email,
        role: novoCliente.role
      }
    });
    
  } catch (error) {
    console.error('Erro ao criar cliente como admin:', error);
    res.status(500).json({ 
      success: false, 
      mensagem: 'Erro interno do servidor',
      error: error.message 
    });
  }
};

// Atualizar cliente como admin
exports.atualizarClienteComoAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const atualizacoes = req.body;
    
    // Remove campos que não podem ser atualizados
    delete atualizacoes._id;
    delete atualizacoes.senha; // Para atualizar senha, use a rota específica
    
    // Se tentar atualizar email, verifica se não existe outro com mesmo email
    if (atualizacoes.email) {
      const clienteComEmail = await Cliente.findOne({ 
        email: atualizacoes.email, 
        _id: { $ne: id } 
      });
      if (clienteComEmail) {
        return res.status(400).json({ 
          success: false, 
          mensagem: 'Este email já está em uso por outro cliente' 
        });
      }
    }
    
    const clienteAtualizado = await Cliente.findByIdAndUpdate(
      id,
      { $set: atualizacoes },
      { new: true, runValidators: true }
    );
    
    if (!clienteAtualizado) {
      return res.status(404).json({ 
        success: false, 
        mensagem: 'Cliente não encontrado' 
      });
    }
    
    res.json({
      success: true,
      mensagem: 'Cliente atualizado com sucesso',
      cliente: clienteAtualizado
    });
    
  } catch (error) {
    console.error('Erro ao atualizar cliente como admin:', error);
    res.status(500).json({ 
      success: false, 
      mensagem: 'Erro interno do servidor',
      error: error.message 
    });
  }
};

module.exports = exports;
