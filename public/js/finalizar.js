document.addEventListener("DOMContentLoaded", () => {
  const btnFinalizar = document.getElementById("btn-finalizar");
  const corpoTabela = document.getElementById("resumo-itens");
  const totalSpan = document.getElementById("resumo-total");
  const radios = document.getElementsByName("pagamento");
  const parcelaDiv = document.getElementById("opcao-parcelamento");
  const selectParcelas = document.getElementById("parcelas");
  const valorParcelaTexto = document.getElementById("valor-parcela");

  let totalCompra = 0;

  // Carrega e exibe os produtos do carrinho na tabela de resumo
  function carregarResumo() {
    const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

    if (carrinho.length === 0) {
      corpoTabela.innerHTML = "<tr><td colspan='3'>Seu carrinho está vazio.</td></tr>";
      return;
    }

    let totalGeral = 0;
    corpoTabela.innerHTML = "";

    carrinho.forEach(item => {
      const subtotal = item.preco * item.quantidade;
      totalGeral += subtotal;

      const linha = document.createElement("tr");
      linha.innerHTML = `
        <td>${item.nome}</td>
        <td>${item.quantidade}</td>
        <td>R$ ${subtotal.toFixed(2).replace(".", ",")}</td>
      `;
      corpoTabela.appendChild(linha);
    });

    totalCompra = totalGeral;
    totalSpan.textContent = totalCompra.toFixed(2).replace(".", ",");
    atualizarParcelas(totalCompra);
  }

  // Atualiza as opções de parcelamento com base no valor total
  function atualizarParcelas(total) {
    selectParcelas.innerHTML = "";
    for (let i = 1; i <= 12; i++) {
      const valorParcela = (total / i).toFixed(2).replace(".", ",");
      const option = document.createElement("option");
      option.value = i;
      option.textContent = `${i}x de R$ ${valorParcela} sem juros`;
      selectParcelas.appendChild(option);
    }
  }

  // Exibe o valor da parcela escolhida
  selectParcelas.addEventListener("change", () => {
    const qtd = parseInt(selectParcelas.value);
    const valor = totalCompra / qtd;
    valorParcelaTexto.textContent = `Você pagará ${qtd}x de R$ ${valor.toFixed(2).replace(".", ",")} sem juros.`;
  });

  // Mostra ou oculta a opção de parcelamento
  radios.forEach(radio => {
    radio.addEventListener("change", () => {
      if (radio.value === "credito" && radio.checked) {
        parcelaDiv.style.display = "block";
        atualizarParcelas(totalCompra);
      } else {
        parcelaDiv.style.display = "none";
        valorParcelaTexto.innerHTML = "";
      }
    });
  });

  // Finaliza o pedido, gera o JSON e exibe o popup
  btnFinalizar.addEventListener("click", () => {
    const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

    if (carrinho.length === 0) {
      alert("Seu carrinho está vazio!");
      return;
    }

    const total = carrinho.reduce((soma, item) => soma + item.preco * item.quantidade, 0);

    const formaPagamentoSelecionada = document.querySelector('input[name="pagamento"]:checked')?.value;

    const dadosCompra = {
      cliente: "Nome do cliente fictício",
      endereco: {
        rua: "Rua das Estrelas",
        numero: "123",
        bairro: "Universo",
        cidade: "São Paulo",
        estado: "SP",
        cep: "00000-000"
      },
      itens: carrinho.map(item => ({
        nome: item.nome,
        preco: item.preco,
        quantidade: item.quantidade,
        total: item.preco * item.quantidade
      })),
      total: total.toFixed(2),
      formaPagamento: formaPagamentoSelecionada
    };

    console.log("Forma de pagamento:", formaPagamentoSelecionada);
    console.log("Objeto enviado:", dadosCompra);

    fetch('/api/pedidos', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(dadosCompra)
    })
      .then(response => response.json())
      .then(data => {
        console.log("Pedido salvo com sucesso:", data);
        localStorage.removeItem("carrinho");
        mostrarPopupSucesso();
      })
      .catch(error => {
        console.error("Erro ao salvar pedido:", error);
        alert("Não foi possível finalizar o pedido.");
      });
  });


  // Exibe popup de sucesso
  function mostrarPopupSucesso() {
    const popup = document.getElementById("popup-sucesso");
    popup.classList.add("ativo");

    const btnFechar = document.getElementById("btn-fechar");
    btnFechar.addEventListener("click", () => {
      popup.classList.remove("ativo");
      window.location.href = "index.html";
    });

    // Fecha ao clicar fora do conteúdo
    popup.addEventListener("click", (e) => {
      if (e.target === popup) {
        popup.classList.remove("ativo");
        window.location.href = "index.html";
      }
    });
  }

  // Inicializa tudo
  carregarResumo();
});
