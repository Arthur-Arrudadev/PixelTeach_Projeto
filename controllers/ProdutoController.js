//produtoController.js
//controlador para gerenciar operações relacionadas a Produtos
const Produto = require('../models/Produto');

// Criar produto
exports.criarProduto = async (req, res) => {
  try {
    const novoProduto = new Produto(req.body);
    await novoProduto.save();
    res.status(201).json({ success: true, mensagem: "Produto salvo com sucesso!", id: novoProduto._id, produto: novoProduto });
  } catch (error) {
    console.error("Erro ao salvar produto:", error);
    res.status(500).json({ success: false, mensagem: "Erro ao salvar produto." });
  }
};

// Listar todos os produtos
exports.listarProdutos = async (req, res) => {
  try {
    const produtos = await Produto.find();
    res.status(200).json({ success: true, produtos });
  } catch (error) {
    console.error("Erro ao listar produtos:", error);
    res.status(500).json({ success: false, mensagem: "Erro ao listar produtos." });
  }
};

// Buscar produto por ID
exports.buscarProdutoPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const produto = await Produto.findById(id);
    if (!produto) {
      return res.status(404).json({ success: false, mensagem: "Produto não encontrado." });
    }
    res.status(200).json({ success: true, produto });
  } catch (error) {
    console.error("Erro ao buscar produto:", error);
    res.status(500).json({ success: false, mensagem: "Erro ao buscar produto." });
  }
};

// Atualizar produto
exports.atualizarProduto = async (req, res) => {
  const { id } = req.params;
  try {
    const produto = await Produto.findByIdAndUpdate(id, req.body, { new: true });
    if (!produto) {
      return res.status(404).json({ success: false, mensagem: "Produto não encontrado." });
    }
    res.status(200).json({ success: true, mensagem: "Produto atualizado com sucesso!", produto });
  } catch (error) {
    console.error("Erro ao atualizar produto:", error);
    res.status(500).json({ success: false, mensagem: "Erro ao atualizar produto." });
  }
};

// Deletar produto
exports.deletarProduto = async (req, res) => {
  const { id } = req.params;
  try {
    const produto = await Produto.findByIdAndDelete(id);
    if (!produto) {
      return res.status(404).json({ success: false, mensagem: "Produto não encontrado." });
    }
    res.status(200).json({ success: true, mensagem: "Produto deletado com sucesso!" });
  } catch (error) {
    console.error("Erro ao deletar produto:", error);
    res.status(500).json({ success: false, mensagem: "Erro ao deletar produto." });
  }
};

module.exports = exports;
