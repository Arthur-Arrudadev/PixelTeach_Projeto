
const Produto = require('../models/Produto');
let cacheProdutos = null;

// Função auxiliar pra converter checkboxes
function converterBooleans(data) {
  if (data.emOferta !== undefined) {
    data.emOferta = data.emOferta === 'on' || data.emOferta === true;
  }
  if (data.ativo !== undefined) {
    data.ativo = data.ativo === 'on' || data.ativo === true;
  }
  return data;
}

// Criar produto
exports.criarProduto = async (req, res) => {
  try {
    const dados = converterBooleans(req.body);
    
    const novoProduto = new Produto(req.body);
    await novoProduto.save();

    // 🧹 LIMPA O CACHE
    cacheProdutos = null;

    res.status(201).json({
      success: true,
      mensagem: "Produto salvo com sucesso!",
      id: novoProduto._id,
      produto: novoProduto
    });
  } catch (error) {
    console.error("Erro ao salvar produto:", error);
    res.status(500).json({ success: false, mensagem: "Erro ao salvar produto." });
  }
};

// Lista todos os produtos mesmo
exports.listarTodosProdutos = async (req, res) => {
  try {
    const produtos = await Produto.find(); // ← SEM FILTRO!
    res.status(200).json({ success: true, produtos });
  } catch (error) {
    res.status(500).json({ success: false, mensagem: "Erro ao listar produtos." });
  }
};

// Listar todos os produtos
exports.listarProdutos = async (req, res) => {
  try {
    // Se já tem cache, usa ele
    if (cacheProdutos) {
      console.log("📦 Produtos vindos do CACHE");
      return res.status(200).json({ success: true, produtos: cacheProdutos });
    }

    // Se não tem cache, busca no banco
    console.log("🗄️ Produtos vindos do BANCO");
    const produtos = await Produto.find();

    // Salva no cache
    cacheProdutos = produtos;

    res.status(200).json({ success: true, produtos });
  } catch (error) {
    console.error("Erro ao listar produtos:", error);
    res.status(500).json({ success: false, mensagem: "Erro ao listar produtos." });
  }
};

// Lista os produtos ativos
exports.listarProdutosAtivos = async (req, res) => {
  try {
    const produtos = await Produto.find(); // { ativo: true } <- Filtro de produtos ativos/ Coloca os {} dentro () p/ funcionar
    res.json(produtos);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao buscar produtos ativos' });
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
  
  console.log("=== DEBUG ATUALIZAÇÃO PRODUTO ===");
  console.log("📦 Body recebido:", req.body);

  try {
    // Converte os checkboxes ANTES de qualquer coisa
    const dadosAtualizados = converterBooleans({ ...req.body });

    // Converte números (preço, estoque)
    if (dadosAtualizados.preco !== undefined) {
      dadosAtualizados.preco = Number(dadosAtualizados.preco);
    }
    if (dadosAtualizados.precoOriginal !== undefined) {
      dadosAtualizados.precoOriginal = Number(dadosAtualizados.precoOriginal);
    }
    if (dadosAtualizados.estoque !== undefined) {
      dadosAtualizados.estoque = Number(dadosAtualizados.estoque);
    }

    console.log("📝 Dados após conversão:", dadosAtualizados);

    const produto = await Produto.findByIdAndUpdate(
      id, 
      dadosAtualizados, 
      { new: true, runValidators: true }
    );

    if (!produto) {
      return res.status(404).json({ 
        success: false, 
        mensagem: "Produto não encontrado." 
      });
    }

    cacheProdutos = null;

    res.status(200).json({ 
      success: true, 
      mensagem: "Produto atualizado com sucesso!", 
      produto 
    });
    
  } catch (error) {
    console.error("❌ ERRO:", error.message);
    res.status(500).json({ 
      success: false, 
      mensagem: error.message || "Erro ao atualizar produto."
    });
  }
};

// Deletar produto
exports.deletarProduto = async (req, res) => {
  const { id } = req.params;

  try {
    const produto = await Produto.findByIdAndDelete(id);

    if (!produto) {
      return res.status(404).json({
        success: false,
        mensagem: "Produto não encontrado."
      });
    }

    // 🧹 INVALIDA O CACHE
    cacheProdutos = null;
    console.log("🧹 Cache de produtos limpo (delete)");

    res.status(200).json({
      success: true,
      mensagem: "Produto deletado com sucesso!"
    });

  } catch (error) {
    console.error("Erro ao deletar produto:", error);
    res.status(500).json({
      success: false,
      mensagem: "Erro ao deletar produto."
    });
  }
};

module.exports = exports;