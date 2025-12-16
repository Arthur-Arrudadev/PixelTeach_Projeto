document.addEventListener("DOMContentLoaded", () => {
  const cliente = JSON.parse(localStorage.getItem("clienteLogado"));
  const form = document.getElementById("form-endereco");
  const visualizacao = document.getElementById("endereco-visualizacao");
  const btnLogout = document.getElementById("btn-logout");

  if (!cliente) {
    alert("Você precisa estar logado para acessar esta página.");
    window.location.href = "login.html";
    return;
  }

  // Preenche dados de saudação
  document.getElementById("cliente-nome").textContent = cliente.nome;
  document.getElementById("cliente-email").textContent = cliente.email;

  // Função para preencher a visualização com os dados do endereço
  function preencherVisualizacao(endereco) {
    document.getElementById("vis-rua").textContent = endereco.rua;
    document.getElementById("vis-numero").textContent = endereco.numero;
    document.getElementById("vis-bairro").textContent = endereco.bairro;
    document.getElementById("vis-cidade").textContent = endereco.cidade;
    document.getElementById("vis-estado").textContent = endereco.estado;
    document.getElementById("vis-cep").textContent = endereco.cep;
  }

  // Mostrar ou ocultar formulário conforme presença de endereço
  if (cliente.endereco) {
    preencherVisualizacao(cliente.endereco);
    visualizacao.style.display = "block";
    form.style.display = "none";
  } else {
    visualizacao.style.display = "none";
    form.style.display = "block";
  }

  // Botão de editar
  const btnEditar = document.getElementById("btn-editar-endereco");
  if (btnEditar) {
    btnEditar.addEventListener("click", () => {
      const endereco = cliente.endereco;
      document.getElementById("rua").value = endereco.rua;
      document.getElementById("numero").value = endereco.numero;
      document.getElementById("bairro").value = endereco.bairro;
      document.getElementById("cidade").value = endereco.cidade;
      document.getElementById("estado").value = endereco.estado;
      document.getElementById("cep").value = endereco.cep;

      visualizacao.style.display = "none";
      form.style.display = "block";
    });
  }

  // Salvar endereço
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const endereco = {
      rua: document.getElementById("rua").value.trim(),
      numero: document.getElementById("numero").value.trim(),
      bairro: document.getElementById("bairro").value.trim(),
      cidade: document.getElementById("cidade").value.trim(),
      estado: document.getElementById("estado").value.trim(),
      cep: document.getElementById("cep").value.trim()
    };

    try {
      const resposta = await fetch(`http://localhost:3000/api/clientes/${cliente._id}/endereco`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(endereco)
      });

      const resultado = await resposta.json();

      if (resposta.ok) {
        // Atualiza o localStorage com a resposta do backend
        localStorage.setItem("clienteLogado", JSON.stringify(resultado.cliente));
        preencherVisualizacao(resultado.cliente.endereco);

        visualizacao.style.display = "block";
        form.style.display = "none";
        alert("Endereço atualizado com sucesso!");
      } else {
        alert("Erro ao salvar endereço: " + resultado.mensagem);
      }
    } catch (erro) {
      console.error("Erro ao atualizar endereço:", erro);
      alert("Erro ao tentar salvar o endereço.");
    }
  });

  // Logout
  btnLogout.addEventListener("click", () => {
    localStorage.removeItem("clienteLogado");
    alert("Você saiu da sua conta.");
    window.location.href = "login.html";
  });
});
