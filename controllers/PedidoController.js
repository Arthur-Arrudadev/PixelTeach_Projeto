const axios = require('axios');
const Pedido = require('../models/Pedido');

exports.criarPedido = async (req, res) => {
  console.log('🔔 === INICIANDO CRIAÇÃO DE PEDIDO ===');
  console.log('📦 Dados recebidos no body:', JSON.stringify(req.body, null, 2));
  
  try {
    // 1. Salva o pedido no MongoDB
    const pedido = new Pedido(req.body);
    await pedido.save();
    
    console.log('✅ Pedido salvo no banco! ID:', pedido._id);
    console.log('📝 Dados do pedido salvo:', JSON.stringify(pedido.toObject(), null, 2));
    
    // 2. Tenta enviar para o Telegram (MAS NÃO FALHA SE DER ERRO)
    try {
      await enviarParaTelegram(pedido);
      console.log('📤 Notificação Telegram enviada com sucesso!');
    } catch (telegramError) {
      console.error('⚠️  ERRO NO TELEGRAM (mas o pedido foi salvo):', telegramError.message);
      // Continua normalmente - não falha o pedido
    }
    
    // 3. Retorna sucesso para o frontend
    res.status(201).json({
      success: true,
      id: pedido._id,
      mensagem: 'Pedido salvo com sucesso!'
    });
    
  } catch (error) {
    console.error('❌ ERRO GRAVE AO SALVAR PEDIDO:', error);
    res.status(400).json({
      success: false,
      mensagem: 'Erro ao salvar pedido.',
      erro: error.message
    });
  }
};

// FUNÇÃO SEPARADA para enviar ao Telegram
async function enviarParaTelegram(pedido) {
  const telegramToken = '7955648954:AAGRY-hJxkGHf9KklrJPLTGfm37mPUUKlVM';
  const telegramChatId = '8411109336';
  
  console.log('📡 Preparando mensagem para Telegram...');
  console.log('   Token:', telegramToken ? '✅ Presente' : '❌ Ausente');
  console.log('   Chat ID:', telegramChatId);
  
  // Formata a mensagem de forma segura
  const clienteNome = pedido.cliente || 'Cliente não informado';
  const total = pedido.total ? `R$${parseFloat(pedido.total).toFixed(2)}` : 'R$0.00';
  const formaPagamento = pedido.formaPagamento || 'Não informada';
  
  let mensagem = `📦 *NOVO PEDIDO RECEBIDO!*\n\n`;
  mensagem += `👤 *Cliente:* ${clienteNome}\n`;
  mensagem += `🆔 *ID:* ${pedido._id}\n`;
  mensagem += `📅 *Data:* ${new Date().toLocaleString('pt-BR')}\n\n`;
  
  // Adiciona itens se existirem
  if (pedido.itens && Array.isArray(pedido.itens) && pedido.itens.length > 0) {
    mensagem += `🛒 *Itens:*\n`;
    pedido.itens.forEach((item, index) => {
      const nome = item.nome || `Item ${index + 1}`;
      const quantidade = item.quantidade || 1;
      const preco = item.preco || item.total || '0.00';
      mensagem += `   • ${nome} x${quantidade} - R$${preco}\n`;
    });
  } else {
    mensagem += `🛒 *Itens:* Nenhum item informado\n`;
  }
  
  mensagem += `\n💰 *Total:* ${total}\n`;
  mensagem += `💳 *Pagamento:* ${formaPagamento}\n`;
  mensagem += `\n🎉 *Pedido criado com sucesso!*`;
  
  console.log('📝 Mensagem formatada:', mensagem);
  
  // Envia para o Telegram
  const response = await axios.post(
    `https://api.telegram.org/bot${telegramToken}/sendMessage`,
    {
      chat_id: telegramChatId,
      text: mensagem,
      parse_mode: 'Markdown' // Para formatação em negrito
    },
    {
      timeout: 10000, // 10 segundos de timeout
      headers: {
        'Content-Type': 'application/json'
      }
    }
  );
  
  console.log('📊 Resposta do Telegram:', JSON.stringify(response.data, null, 2));
  return response.data;
}

// ========== FUNÇÕES RESTANTES (mantenha as que já tem) ==========

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