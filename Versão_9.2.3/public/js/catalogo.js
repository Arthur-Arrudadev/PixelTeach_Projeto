// js/catalogo.js

// Lista de produtos (isso aqui simula um "banco de dados")
const produtos = [
  //Categoria TVs
  {
    id: 1,
    nome: "Smart TV 50\"",
    preco: 2899.00,
    precoOriginal: 3499.00,
    categoria: "tvs",
    imagem: "img/tv50.1.webp",
    emOferta: true
  },
  {
    id: 2,
    nome: "Smart TV 43\"",
    preco: 1899.00,
    precoOriginal: 2899.00,
    categoria: "tvs",
    imagem: "img/TV43TCL.png",
    emOferta: true
  },
  {
    id: 3,
    nome: "Smart TV 55\"",
    preco: 3599.00,
    precoOriginal: 3599.00,
    categoria: "tvs",
    imagem: "img/TV55Samsung.jpeg",
    emOferta: false
  },
  // Categoria Monitores
  {
    id: 4,
    nome: "Monitor Gamer PCFort",
    preco: 599.00,
    precoOriginal: 699.00,
    categoria: "monitores",
    imagem: "img/monitor gamer PCFort.webp",
    emOferta: true
  },
  {
    id: 5,
    nome: "Monitor Gamer OLED",
    preco: 1599.00,
    precoOriginal: 1599.00,
    categoria: "monitores",
    imagem: "img/monitor gamer OLED.jpeg",
    emOferta: false
  },
  {
    id: 6,
    nome: "Monitor Gamer AOC",
    preco: 799.00,
    precoOriginal: 799.00,
    categoria: "monitores",
    imagem: "img/monitor gamer AOC.webp",
    emOferta: false
  },
  // Categoria Notebooks
  {
    id: 7,
    nome: "Notebook Gamer",
    preco: 4799.00,
    precoOriginal: 4799.00,
    categoria: "notebooks",
    imagem: "img/notebook1.jpg",
    emOferta: false
  },
  {
    id: 8,
    nome: "Notebook Gamer Acer Nitro 5",
    preco: 3799.00,
    precoOriginal: 3799.00,
    categoria: "notebooks",
    imagem: "img/NotebookGamer acer-nitro-5.webp",
    emOferta: false
  },
  {
    id: 9,
    nome: "Notebook Gamer Asus",
    preco: 3899.00,
    precoOriginal: 3799.00,
    categoria: "notebooks",
    imagem: "img/NotebookGamerAsus.jpg",
    emOferta: true
  },
  {
    id: 10,
    nome: "Notebook Gamer Legion",
    preco: 3899.00,
    precoOriginal: 2799.00,
    categoria: "notebooks",
    imagem: "img/NotebookGamerLegion.webp",
    emOferta: true
  },
  // Categoria PC Gamer
 {
    id: 11,
    nome: "PC Gamer Completo",
    preco: 2999.00,
    precoOriginal: 2999.00,
    categoria: "Pc Gamer",
    imagem: "img/kit i5 completo.jpg",
    emOferta: false
  },
    {
    id: 12,
    nome: "PC Gamer Completo 2",
    preco: 1999.00,
    precoOriginal: 2799.00,
    categoria: "Pc Gamer",
    imagem: "img/kit i5.jpg",
    emOferta: true
  },
  {
    id: 13,
    nome: "PC Gamer Completo 3",
    preco: 1599.00,
    precoOriginal: 2099.00,
    categoria: "Pc Gamer",
    imagem: "img/kit pc i5.jpg",
    emOferta: true
  },
  {
    id: 14,
    nome: "PC Gamer Completo 4",
    preco: 2599.00,
    precoOriginal: 2599.00,
    categoria: "Pc Gamer",
    imagem: "img/pc completo.jpg",
    emOferta: false
  },
  // Categoria CPU Gamer
  {
    id: 15,
    nome: "CPU Gamer Mancer",
    preco: 2599.00,
    precoOriginal: 3599.00,
    categoria: "CPU Gamer",
    imagem: "img/PC Gamer Mancer.jpg",
    emOferta: true
  },
  {
    id: 16,
    nome: "CPU Gamer Alligator",
    preco: 2599.00,
    precoOriginal: 2899.00,
    categoria: "CPU Gamer",
    imagem: "img/PC Gamer Alligator.jpg",
    emOferta: true
  },
  {
    id: 17,
    nome: "CPU Gamer Hyperx",
    preco: 3099.00,
    precoOriginal: 3099.00,
    categoria: "CPU Gamer",
    imagem: "img/PC Gamer Hyperx.png",
    emOferta: false
  },
  {
    id: 18,
    nome: "CPU Gamer T6",
    preco: 8999.00,
    precoOriginal: 9900.00,
    categoria: "CPU Gamer",
    imagem: "img/PC Gamer T6.webp",
    emOferta: true
  },
  //Categoria celulares
  {
    id: 19,
    nome: "Samsung S23",
    preco: 999.00,
    precoOriginal: 999.00,
    categoria: "celulares",
    imagem: "img/celular S23.jpg",
    emOferta: false
  },  
  {
    id: 20,
    nome: "Samsung S24 FE",
    preco: 1999.00,
    precoOriginal: 1999.00,
    categoria: "celulares",
    imagem: "img/celular S24.jpg",
    emOferta: false
  },
  {
    id: 21,
    nome: "Samsung Flip Z",
    preco: 4999.00,
    precoOriginal: 4999.00,
    categoria: "celulares",
    imagem: "img/celular Samsung Z.jpg",
    emOferta: false
  },
  {
    id: 22,
    nome: "Samsung Galaxy",
    preco: 899.00,
    precoOriginal: 999.00,
    categoria: "celulares",
    imagem: "img/celular Galaxy.webp",
    emOferta: true
  },
  {
    id: 23,
    nome: "Samsung Fold",
    preco: 8099.00,
    precoOriginal: 8999.00,
    categoria: "celulares",
    imagem: "img/galaxy-fold Fold.webp",
    emOferta: true
  },
  //Categoria Teclado Gamer
  {
    id: 24,
    nome: "Teclado Gamer Hayom Semi Mec",
    preco: 139.00,
    precoOriginal: 199.00,
    categoria: "teclado gamer",
    imagem: "img/Teclado Gamer Hayom Semi.webp",
    emOferta: true
  },
  {
    id: 25,
    nome: "Teclado Gamer Led Mec Letron",
    preco: 250.00,
    precoOriginal: 250.00,
    categoria: "teclado gamer",
    imagem: "img/teclado-gamer-play-on-led-semi-mecanico-letron-74359--1.png",
    emOferta: false
  },
  {
    id: 26,
    nome: "Teclado Gamer Lakshami Bubllegum",
    preco: 99.00,
    precoOriginal: 99.00,
    categoria: "teclado gamer",
    imagem: "img/teclaro Lakshami bubllegum.webp",
    emOferta: false
  },
  // Categoria Mouse Gamer
  {
    id: 27,
    nome: "Mouse Gamer Evus",
    preco: 59.00,
    precoOriginal: 79.99,
    categoria: "mouse gamer",
    imagem: "img/mouse gamer Evus.jpeg",
    emOferta: true
  },
  {
    id: 28,
    nome: "Mouse Gamer Exbom",
    preco: 49.00,
    precoOriginal: 49.00,
    categoria: "mouse gamer",
    imagem: "img/mouse gamer Exbom.avif",
    emOferta: false
  },
  {
    id: 29,
    nome: "Mouse Gamer G502 HERO",
    preco: 49.00,
    precoOriginal: 49.99,
    categoria: "mouse gamer",
    imagem: "img/mouse gamer G502 Hero.webp",
    emOferta: false
  },
  //Categoria Headset
  {
    id: 30,
    nome: "Headset Gamer Orelha de Gato",
    preco: 49.00,
    precoOriginal: 49.00,
    categoria: "headset",
    imagem: "img/fone_preto_com_orelha_de_gato.jpg",
    emOferta: false
  },
  {
    id: 31,
    nome: "Headset Gamer TGT",
    preco: 49.00,
    precoOriginal: 49.00,
    categoria: "headset",
    imagem: "img/HeadSet Gamer TGT.png",
    emOferta: false
  },
  {
    id: 32,
    nome: "Headset Gamer LED Python",
    preco: 49.00,
    precoOriginal: 49.00,
    categoria: "headset",
    imagem: "img/Headset-Gamer-LED-Python-01.png",
    emOferta: false
  },
];

// Função para renderizar os produtos
function renderizarProdutos(produtosParaMostrar) {
  const container = document.querySelector(".produtos-catalogo");
  container.innerHTML = "";

  produtosParaMostrar.forEach((produto) => {
    const card = document.createElement("article");
    card.classList.add("produto");

    card.innerHTML = `
      <img src="${produto.imagem}" alt="${produto.nome}">
      <h3>${produto.nome}</h3>
      <p>R$ ${produto.preco.toFixed(2).replace(".", ",")}</p>
      <button onclick="adicionarAoCarrinho(${produto.id})">🛒 Adicionar ao carrinho</button>
    `;

    container.appendChild(card);
  });
}

// Função para obter o parâmetro da URL
function obterParametroBusca(nome) {
  const params = new URLSearchParams(window.location.search);
  return params.get(nome);
}

// Filtrando os produtos pela busca
const termoBusca = obterParametroBusca("q");

if (termoBusca) {
  const termoLower = termoBusca.toLowerCase();
  const resultados = produtos.filter(p =>
    p.nome.toLowerCase().includes(termoLower)
  );
  renderizarProdutos(resultados);
} else {
  renderizarProdutos(produtos);
}

// Filtros Laterais

// Função para aplicar os filtros
function aplicarFiltros() {
  const termoBusca = obterParametroBusca("q")?.toLowerCase() || "";
  
  const categoriasSelecionadas = Array.from(document.querySelectorAll('input[name="categoria"]:checked'))
    .map(cb => cb.value.toLowerCase());

  const precoMax = parseFloat(document.querySelector('input[name="preco"]').value) || Infinity;

  const somenteOfertas = document.getElementById("filtro-oferta")?.checked || false;

  const produtosFiltrados = produtos.filter(produto => {
    const nomeIncluiBusca = produto.nome.toLowerCase().includes(termoBusca);
    const dentroDaCategoria = categoriasSelecionadas.length === 0 || categoriasSelecionadas.includes(produto.categoria.toLowerCase());
    const dentroDoPreco = produto.preco <= precoMax;
    const estaEmOferta = !somenteOfertas || produto.emOferta;

    return nomeIncluiBusca && dentroDaCategoria && dentroDoPreco && estaEmOferta;
  });

  renderizarProdutos(produtosFiltrados);
}

// Conectando os filtros aos eventos
document.addEventListener("DOMContentLoaded", () => {
  const checkboxesCategoria = document.querySelectorAll('input[name="categoria"]');
  const rangePreco = document.querySelector('input[name="preco"]');
  const checkboxOferta = document.getElementById("filtro-oferta");

  checkboxesCategoria.forEach(cb => cb.addEventListener("change", aplicarFiltros));
  rangePreco.addEventListener("input", aplicarFiltros);
  if (checkboxOferta) checkboxOferta.addEventListener("change", aplicarFiltros);

  // Atualiza o texto do range na inicialização
  const precoAtualSpan = document.getElementById("preco-atual");
  if (precoAtualSpan && rangePreco) {
    precoAtualSpan.textContent = `Até R$ ${parseFloat(rangePreco.value).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`;
  }

  aplicarFiltros(); // já exibe com filtros iniciais (incluindo busca)
});


//Atualizar o valor do range dinamicamente
const rangePreco = document.getElementById("slider-preco");
const precoAtualSpan = document.getElementById("preco-atual");

rangePreco.addEventListener("input", () => {
  precoAtualSpan.textContent = `Até R$ ${parseFloat(rangePreco.value).toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
  })}`;
  aplicarFiltros(); // já filtra também
});

// Botão limpar filtros

document.getElementById("btn-limpar-filtros").addEventListener("click", () => {
  // Desmarca todos os checkboxes de categoria
  document.querySelectorAll('input[name="categoria"]').forEach(cb => cb.checked = false);
  
  // Reseta o range para o máximo (supondo que o máximo seja o valor máximo do range)
  const rangePreco = document.querySelector('input[name="preco"]');
  if (rangePreco) {
    rangePreco.value = rangePreco.max;
  }
  
  // Desmarca o checkbox de ofertas
  const checkboxOferta = document.getElementById("filtro-oferta");
  if (checkboxOferta) {
    checkboxOferta.checked = false;
  }
  
  // Atualiza o texto do range
  const precoAtualSpan = document.getElementById("preco-atual");
  if (precoAtualSpan && rangePreco) {
    precoAtualSpan.textContent = `Até R$ ${parseFloat(rangePreco.value).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`;
  }
  
  // Remove o parâmetro "q" da URL sem recarregar a página
  if (history.replaceState) {
    const url = new URL(window.location);
    url.searchParams.delete("q");
    history.replaceState(null, "", url.toString());
  }
  
  // Aplica os filtros (que agora estão limpos)
  aplicarFiltros();
});

// Filtro Ordenar Preços

const ordenacao = document.getElementById("ordenar-preco").value;

if (ordenacao === "menor-para-maior") {
  produtosFiltrados.sort((a, b) => a.preco - b.preco);
} else if (ordenacao === "maior-para-menor") {
  produtosFiltrados.sort((a, b) => b.preco - a.preco);
}

const selectOrdenar = document.getElementById("ordenar-preco");
selectOrdenar.addEventListener("change", aplicarFiltros);

function aplicarFiltros() {
  const termoBusca = obterParametroBusca("q")?.toLowerCase() || "";

  const categoriasSelecionadas = Array.from(document.querySelectorAll('input[name="categoria"]:checked'))
    .map(cb => cb.value.toLowerCase());

  const precoMax = parseFloat(document.querySelector('input[name="preco"]').value) || Infinity;

  const somenteOfertas = document.getElementById("filtro-oferta")?.checked || false;

  const ordenacao = document.getElementById("ordenar-preco").value;

  let produtosFiltrados = produtos.filter(produto => {
    const nomeIncluiBusca = produto.nome.toLowerCase().includes(termoBusca);
    const dentroDaCategoria = categoriasSelecionadas.length === 0 || categoriasSelecionadas.includes(produto.categoria.toLowerCase());
    const dentroDoPreco = produto.preco <= precoMax;
    const estaEmOferta = !somenteOfertas || produto.emOferta;

    return nomeIncluiBusca && dentroDaCategoria && dentroDoPreco && estaEmOferta;
  });

  if (ordenacao === "menor-para-maior") {
    produtosFiltrados.sort((a, b) => a.preco - b.preco);
  } else if (ordenacao === "maior-para-menor") {
    produtosFiltrados.sort((a, b) => b.preco - a.preco);
  }

  renderizarProdutos(produtosFiltrados);
}
