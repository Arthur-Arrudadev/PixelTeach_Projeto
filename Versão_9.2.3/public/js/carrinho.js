// Carrinho de compras (usando localStorage para persistência)
let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

// Função global para adicionar ao carrinho
window.adicionarAoCarrinho = function(id) {
  const produto = produtos.find(p => p.id === id);
  if (!produto) return;

  const itemExistente = carrinho.find(item => item.id === id);
  
  if (itemExistente) {
    itemExistente.quantidade++;
  } else {
    carrinho.push({
      ...produto,
      quantidade: 1
    });
  }

  salvarCarrinho();
  atualizarCarrinho();
  mostrarMensagemCarrinho(`${produto.nome} adicionado ao carrinho!`);
};

// Salva no localStorage
function salvarCarrinho() {
  localStorage.setItem('carrinho', JSON.stringify(carrinho));
}

// Atualiza a exibição do carrinho
function atualizarCarrinho() {
  const tbody = document.querySelector(".carrinho tbody");
  if (!tbody) return; // Se não existir na página atual
  
  tbody.innerHTML = "";
  let total = 0;

  carrinho.forEach(item => {
    const subtotal = item.preco * item.quantidade;
    total += subtotal;

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${item.nome}</td>
      <td>
        <button onclick="alterarQuantidade(${item.id}, -1)">-</button>
        ${item.quantidade}
        <button onclick="alterarQuantidade(${item.id}, 1)">+</button>
      </td>
      <td>R$ ${item.preco.toFixed(2).replace(".", ",")}</td>
      <td>R$ ${subtotal.toFixed(2).replace(".", ",")}</td>
      <td><button onclick="removerDoCarrinho(${item.id})">✖</button></td>
    `;
    tbody.appendChild(tr);
  });

  const totalElement = document.querySelector(".total-final p");
  if (totalElement) {
    totalElement.innerHTML = `<strong>Total:</strong> R$ ${total.toFixed(2).replace(".", ",")}`;
  }
}

// Funções globais para manipulação
window.alterarQuantidade = function(id, delta) {
  const item = carrinho.find(item => item.id === id);
  if (!item) return;

  item.quantidade += delta;
  
  if (item.quantidade <= 0) {
    removerDoCarrinho(id);
  } else {
    salvarCarrinho();
    atualizarCarrinho();
  }
};

window.removerDoCarrinho = function(id) {
  carrinho = carrinho.filter(item => item.id !== id);
  salvarCarrinho();
  atualizarCarrinho();
};

// Inicializa o carrinho quando a página carrega
document.addEventListener("DOMContentLoaded", () => {
  // Carrega os produtos do localStorage
  carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
  atualizarCarrinho();
  
  // Atualiza o contador do carrinho no menu
  atualizarContadorCarrinho();
});

function atualizarContadorCarrinho() {
  const contador = document.getElementById("contador-carrinho");
  if (contador) {
    const totalItens = carrinho.reduce((total, item) => total + item.quantidade, 0);
    contador.textContent = totalItens > 0 ? `(${totalItens})` : "";
  }
}

// Mostrar mensagem de sucesso ao adicionar no carrinho

function mostrarMensagemCarrinho(texto) {
  const div = document.getElementById("mensagem-carrinho");
  div.textContent = texto;
  div.classList.add("mostrar");

  setTimeout(() => {
    div.classList.remove("mostrar");
  }, 2500); // mensagem desaparece em 2.5 segundos
}

