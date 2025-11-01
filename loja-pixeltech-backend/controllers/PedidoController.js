
const axios = require('axios');
const Pedido = require('../models/Pedido');

exports.criarPedido = async (req, res) => {
  try {
    const pedido = new Pedido(req.body);
    await pedido.save();

    const telegramToken = '8488174239:AAEX_giRUY4GhtnqNqndD0Wau-DUlpzWZSo'; // Substitua por variável de ambiente
    const telegramChatId = '8488174239'; // Substitua por variável de ambiente
    const message = `Novo pedido de ${req.body.cliente}: ${req.body.itens.map(item => `${item.nome} x${item.quantidade} (R  $${item.total})`).join(', ')}, Total: R$${req.body.total}, Pagamento: ${req.body.formaPagamento}`;

    await axios.post(`https://api.telegram.org/bot${telegramToken}/sendMessage`, {
      chat_id: telegramChatId,
      text: message
    });

    res.status(201).json({
      success: true,
      id: pedido._id,
      mensagem: 'Pedido salvo com sucesso!'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      mensagem: 'Erro ao salvar pedido.',
      erro: error.message
    });
  }
};

exports.listarPedidos = async (req, res) => {
  try {
    const pedidos = await Pedido.find();
    res.status(200).json({ success: true, pedidos });
  } catch (error) {
    console.error("Erro ao listar pedidos:", error);
    res.status(500).json({ success: false, mensagem: "Erro ao listar pedidos." });
  }
};

exports.buscarPedidoPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const pedido = await Pedido.findById(id);
    if (!pedido) {
      return res.status(404).json({ success: false, mensagem: "Pedido não encontrado." });
    }
    res.status(200).json({ success: true, pedido });
  } catch (error) {
    console.error("Erro ao buscar pedido:", error);
    res.status(500).json({ success: false, mensagem: "Erro ao buscar pedido." });
  }
};

exports.deletarPedido = async (req, res) => {
  const { id } = req.params;
  try {
    const pedido = await Pedido.findByIdAndDelete(id);
    if (!pedido) {
      return res.status(404).json({ success: false, mensagem: "Pedido não encontrado." });
    }
    res.status(200).json({ success: true, mensagem: "Pedido deletado com sucesso!" });
  } catch (error) {
    console.error("Erro ao deletar pedido:", error);
    res.status(500).json({ success: false, mensagem: "Erro ao deletar pedido." });
  }
};

module.exports = exports;
