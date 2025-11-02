document.addEventListener("DOMContentLoaded", () => {
  // Elementos do DOM
  const cliente = JSON.parse(localStorage.getItem("clienteLogado"));
  const formEndereco = document.getElementById("form-endereco");
  const visualizacaoEndereco = document.getElementById("endereco-visualizacao");
  const formSenha = document.getElementById("form-senha");
  const senhaContainer = document.getElementById("senha-container");
  const btnLogout = document.getElementById("btn-logout");
  const btnEditarEndereco = document.getElementById("btn-editar-endereco");
  const btnCancelarEndereco = document.getElementById("btn-cancelar-endereco");
  const btnMostrarSenha = document.getElementById("btn-mostrar-senha");
  const btnCancelarSenha = document.getElementById("btn-cancelar-senha");

  // Verificação de login
  if (!cliente) {
    alert("Você precisa estar logado para acessar esta página.");
    window.location.href = "login.html";
    return;
  }

  // Funções auxiliares
  const preencherDadosCliente = () => {
    document.getElementById("cliente-nome").textContent = cliente.nome;
    document.getElementById("cliente-email").textContent = cliente.email;
  };

  const preencherVisualizacaoEndereco = (endereco) => {
    document.getElementById("vis-rua").textContent = endereco.rua;
    document.getElementById("vis-numero").textContent = endereco.numero;
    document.getElementById("vis-bairro").textContent = endereco.bairro;
    document.getElementById("vis-cidade").textContent = endereco.cidade;
    document.getElementById("vis-estado").textContent = endereco.estado;
    document.getElementById("vis-cep").textContent = endereco.cep;
  };

  const preencherFormEndereco = (endereco) => {
    document.getElementById("rua").value = endereco.rua;
    document.getElementById("numero").value = endereco.numero;
    document.getElementById("bairro").value = endereco.bairro;
    document.getElementById("cidade").value = endereco.cidade;
    document.getElementById("estado").value = endereco.estado;
    document.getElementById("cep").value = endereco.cep;
  };

  // Inicialização
  preencherDadosCliente();

  // Gerenciamento de Endereço
  if (cliente.endereco) {
    preencherVisualizacaoEndereco(cliente.endereco);
    visualizacaoEndereco.style.display = "block";
    formEndereco.style.display = "none";
  } else {
    visualizacaoEndereco.style.display = "none";
    formEndereco.style.display = "block";
  }

  // Event Listeners
  btnEditarEndereco?.addEventListener("click", () => {
    preencherFormEndereco(cliente.endereco || {});
    visualizacaoEndereco.style.display = "none";
    formEndereco.style.display = "block";
  });

  btnCancelarEndereco?.addEventListener("click", () => {
    formEndereco.style.display = "none";
    visualizacaoEndereco.style.display = "block";
    formEndereco.reset();
  });

  formEndereco?.addEventListener("submit", async (e) => {
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
        localStorage.setItem("clienteLogado", JSON.stringify(resultado.cliente));
        preencherVisualizacaoEndereco(resultado.cliente.endereco);
        visualizacaoEndereco.style.display = "block";
        formEndereco.style.display = "none";
        alert("Endereço atualizado com sucesso!");
      } else {
        alert("Erro ao salvar endereço: " + (resultado.mensagem || "Erro desconhecido"));
      }
    } catch (erro) {
      console.error("Erro ao atualizar endereço:", erro);
      alert("Erro ao tentar salvar o endereço.");
    }
  });

  // Gerenciamento de Senha
  btnMostrarSenha?.addEventListener("click", () => {
    const visivel = senhaContainer.style.display === "block";
    senhaContainer.style.display = visivel ? "none" : "block";
    btnMostrarSenha.textContent = visivel ? "✏️ Alterar Senha" : "❌ Cancelar";
    btnMostrarSenha.setAttribute("data-status", visivel ? "editar" : "cancelar");
  });

  btnCancelarSenha?.addEventListener("click", () => {
    senhaContainer.style.display = "none";
    btnMostrarSenha.textContent = "✏️ Alterar Senha";
    formSenha.reset();
  });

  formSenha?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const senhaAtual = document.getElementById("senha-atual").value;
    const novaSenha = document.getElementById("nova-senha").value;
    const confirmarSenha = document.getElementById("confirmar-senha").value;

    if (novaSenha !== confirmarSenha) {
      alert("A nova senha e a confirmação não coincidem.");
      return;
    }

    try {
      const resposta = await fetch(`http://localhost:3000/api/clientes/${cliente._id}/senha`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ senhaAtual, novaSenha }),
      });

      const resultado = await resposta.json();

      if (resultado.sucesso) {
        localStorage.setItem("clienteLogado", JSON.stringify(resultado.cliente));
        alert("Senha atualizada com sucesso!");
        formSenha.reset();
        senhaContainer.style.display = "none";
        btnMostrarSenha.textContent = "✏️ Alterar Senha";
      } else {
        alert("Erro: " + (resultado.mensagem || "Erro desconhecido"));
      }
    } catch (erro) {
      console.error("Erro ao atualizar senha:", erro);
      alert("Erro ao tentar atualizar senha.");
    }
  });

  // Logout
  btnLogout?.addEventListener("click", () => {
    localStorage.removeItem("clienteLogado");
    alert("Você saiu da sua conta.");
    window.location.href = "login.html";
  });
});
