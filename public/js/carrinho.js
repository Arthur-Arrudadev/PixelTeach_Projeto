// Carrinho de compras SIMPLIFICADO
let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

// ========== FUNÇÃO PARA BUSCAR QUALQUER PRODUTO ==========
function buscarProdutoPorId(id) {
  console.log("🔍 Buscando produto ID:", id);
  
  // 1. Primeiro tenta nos produtos do catálogo (se disponível)
  if (typeof window.todosProdutosCarrinho !== 'undefined') {
    const produto = window.todosProdutosCarrinho.find(p => p.id.toString() === id.toString());
    if (produto) {
      console.log("✅ Encontrado em produtosAtivos:", produto.nome);
      return produto;
    }
  }
  
  // 2. Tenta na variável global
  if (window.todosProdutosCarrinho && Array.isArray(window.todosProdutosCarrinho)) {
    const produto = window.todosProdutosCarrinho.find(p => p.id.toString() === id.toString());
    if (produto) {
      console.log("✅ Encontrado em todosProdutosCarrinho:", produto.nome);
      return produto;
    }
  }
  
  // 3. Tenta nos produtos fixos (IDs numéricos)
  if (typeof produtos !== 'undefined') {
    const produto = produtos.find(p => p.id === Number(id));
    if (produto) {
      console.log("✅ Encontrado em produtos fixos:", produto.nome);
      return produto;
    }
  }
  
  // 4. Tenta no carrinho atual (para quando estiver na página do carrinho)
  const itemCarrinho = carrinho.find(item => item.id.toString() === id.toString());
  if (itemCarrinho) {
    console.log("⚠️  Produto só encontrado no carrinho (sem detalhes completos)");
    return {
      id: itemCarrinho.id,
      nome: itemCarrinho.nome,
      preco: itemCarrinho.preco,
      imagem: itemCarrinho.imagem,
      estoque: itemCarrinho.estoque || 999
    };
  }
  
  console.error("❌ Produto não encontrado em nenhuma fonte!");
  return null;
}

// ========== FUNÇÃO GLOBAL PARA ADICIONAR AO CARRINHO ==========
window.adicionarAoCarrinho = function(id) {
  console.log("🛒 Adicionar ao carrinho chamado com ID:", id);
  
  const produto = buscarProdutoPorId(id);
  if (!produto) {
    alert("Produto não encontrado!");
    return;
  }
  
  // VERIFICA ESTOQUE
  if (produto.estoque !== undefined && produto.estoque <= 0) {
    alert(`❌ "${produto.nome}" está esgotado!`);
    return;
  }
  
  const itemExistente = carrinho.find(item => item.id.toString() === id.toString());
  
  if (itemExistente) {
    // Verifica estoque
    if (produto.estoque !== undefined && itemExistente.quantidade >= produto.estoque) {
      alert(`❌ Não há estoque suficiente de "${produto.nome}".\nMáximo: ${produto.estoque} unidades`);
      return;
    }
    itemExistente.quantidade++;
  } else {
    carrinho.push({
      id: produto.id,
      nome: produto.nome,
      preco: produto.preco,
      quantidade: 1,
      imagem: produto.imagem || 'img/placeholder.png',
      estoque: produto.estoque || 999
    });
  }

  salvarCarrinho();
  atualizarCarrinho();
  mostrarMensagemCarrinho(`${produto.nome} adicionado ao carrinho!`);
};

// ========== FUNÇÕES AUXILIARES ==========

function salvarCarrinho() {
  localStorage.setItem('carrinho', JSON.stringify(carrinho));
  atualizarContadorCarrinho();
}

function atualizarCarrinho() {
  const tbody = document.querySelector(".carrinho tbody");
  if (!tbody) return;
  
  tbody.innerHTML = "";
  let total = 0;

  carrinho.forEach(item => {
    const produto = buscarProdutoPorId(item.id);
    const preco = produto ? produto.preco : item.preco;
    const subtotal = preco * item.quantidade;
    total += subtotal;

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>
        ${produto && produto.imagem ? `<img src="${produto.imagem}" alt="${item.nome}" style="width: 50px; height: 50px; object-fit: contain; margin-right: 10px; vertical-align: middle;">` : ''}
        ${item.nome}
      </td>
      <td>
        <button onclick="alterarQuantidade('${item.id}', -1)">-</button>
        ${item.quantidade}
        <button onclick="alterarQuantidade('${item.id}', 1)">+</button>
      </td>
      <td>R$ ${preco.toFixed(2).replace(".", ",")}</td>
      <td>R$ ${subtotal.toFixed(2).replace(".", ",")}</td>
      <td><button onclick="removerDoCarrinho('${item.id}')">✖</button></td>
    `;
    tbody.appendChild(tr);
  });

  const totalElement = document.querySelector(".total-final p");
  if (totalElement) {
    totalElement.innerHTML = `<strong>Total:</strong> R$ ${total.toFixed(2).replace(".", ",")}`;
  }
}

window.alterarQuantidade = function(id, delta) {
  const item = carrinho.find(item => item.id.toString() === id.toString());
  if (!item) return;

  const produto = buscarProdutoPorId(id);
  
  item.quantidade += delta;
  
  if (delta > 0 && produto && produto.estoque !== undefined && item.quantidade > produto.estoque) {
    alert(`❌ Não há estoque suficiente de "${produto.nome}".\nMáximo: ${produto.estoque} unidades`);
    item.quantidade = produto.estoque;
  }
  
  if (item.quantidade <= 0) {
    removerDoCarrinho(id);
  } else {
    salvarCarrinho();
    atualizarCarrinho();
  }
};

window.removerDoCarrinho = function(id) {
  carrinho = carrinho.filter(item => item.id.toString() !== id.toString());
  salvarCarrinho();
  atualizarCarrinho();
};

// ========== INICIALIZAÇÃO ==========

document.addEventListener("DOMContentLoaded", () => {
  carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
  console.log("🛒 Carrinho carregado:", carrinho.length, "itens");
  console.log("📦 Produtos disponíveis para busca:", 
    window.todosProdutosCarrinho ? window.todosProdutosCarrinho.length : "N/A",
    window.todosProdutosCarrinho ? window.todosProdutosCarrinho.length : "N/A"
  );
  
  atualizarCarrinho();
  atualizarContadorCarrinho();
});

function atualizarContadorCarrinho() {
  const contador = document.getElementById("contador-carrinho");
  if (contador) {
    const totalItens = carrinho.reduce((total, item) => total + item.quantidade, 0);
    contador.textContent = totalItens > 0 ? `(${totalItens})` : "";
  }
}

function mostrarMensagemCarrinho(texto) {
  const div = document.getElementById("mensagem-carrinho");
  if (div) {
    div.textContent = texto;
    div.classList.add("mostrar");

    setTimeout(() => {
      div.classList.remove("mostrar");
    }, 2500);
  }
}