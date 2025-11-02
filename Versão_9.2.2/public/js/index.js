document.addEventListener("DOMContentLoaded", () => {
  // Só executa se estiver na página inicial
  const container = document.getElementById("ofertas-destaque");
  if (!container) return;

  // Filtra produtos em oferta (garantindo que precoOriginal existe)
  const ofertas = produtos.filter(p => p.emOferta && p.precoOriginal);
  
  // Limpa o container antes de adicionar o conteúdo por segurança
  container.innerHTML = '';

  // Cria o HTML de cada produto
  ofertas.forEach(produto => {
    const produtoHTML = `
      <article class="produto">
        <img src="${produto.imagem}" alt="${produto.nome}" loading="lazy">
        <h3>${produto.nome}</h3>
        <p class="preco">
          <span class="preco-original">De R$ ${produto.precoOriginal.toFixed(2).replace(".", ",")}</span>
          <span class="preco-oferta">Por R$ ${produto.preco.toFixed(2).replace(".", ",")}</span>
        </p>
        <button onclick="adicionarAoCarrinho(${produto.id})">🛒 Adicionar ao Carrinho</button>
      </article>
    `;
    container.insertAdjacentHTML('beforeend', produtoHTML);
  });
});
