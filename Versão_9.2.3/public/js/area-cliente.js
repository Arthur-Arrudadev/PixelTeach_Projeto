document.addEventListener("DOMContentLoaded", () => {
  // 1. PEGA O CLIENTE DO localStorage
  const clienteLogado = JSON.parse(localStorage.getItem("clienteLogado"));
  if (!clienteLogado) {
    alert("Faça login para acessar esta página.");
    window.location.href = "login.html";
    return;
  }

  // 2. PREENCHE NOME E EMAIL
  document.getElementById("cliente-nome").textContent = clienteLogado.nome;
  document.getElementById("cliente-email").textContent = clienteLogado.email;

  // 3. PREENCHE ENDEREÇO (se existir)
  const endereco = clienteLogado.endereco;
  if (endereco && Object.keys(endereco).length > 0) {
    document.getElementById("vis-rua").textContent = endereco.rua || "-";
    document.getElementById("vis-numero").textContent = endereco.numero || "-";
    document.getElementById("vis-bairro").textContent = endereco.bairro || "-";
    document.getElementById("vis-cidade").textContent = endereco.cidade || "-";
    document.getElementById("vis-estado").textContent = endereco.estado || "-";
    document.getElementById("vis-cep").textContent = endereco.cep || "-";
    document.getElementById("endereco-visualizacao").style.display = "block";
  }

  // 4. FORMULÁRIO DE ENDEREÇO
  const formEndereco = document.getElementById("form-endereco");
  const btnEditar = document.getElementById("btn-editar-endereco");
  const btnCancelar = document.getElementById("btn-cancelar-endereco");

  // Preenche o form com dados atuais (se existirem)
  if (endereco) {
    document.getElementById("rua").value = endereco.rua || "";
    document.getElementById("numero").value = endereco.numero || "";
    document.getElementById("bairro").value = endereco.bairro || "";
    document.getElementById("cidade").value = endereco.cidade || "";
    document.getElementById("estado").value = endereco.estado || "";
    document.getElementById("cep").value = endereco.cep || "";
  }

  // Mostrar form ao clicar em "Editar"
  btnEditar?.addEventListener("click", () => {
    formEndereco.style.display = "block";
    document.getElementById("endereco-visualizacao").style.display = "none";
  });

  // Cancelar edição
  btnCancelar?.addEventListener("click", () => {
    formEndereco.style.display = "none";
    document.getElementById("endereco-visualizacao").style.display = "block";
  });

  // SALVAR ENDEREÇO
  formEndereco.addEventListener("submit", async (e) => {
    e.preventDefault();

    const novoEndereco = {
      rua: document.getElementById("rua").value.trim(),
      numero: document.getElementById("numero").value.trim(),
      bairro: document.getElementById("bairro").value.trim(),
      cidade: document.getElementById("cidade").value.trim(),
      estado: document.getElementById("estado").value.trim(),
      cep: document.getElementById("cep").value.trim(),
    };
// Envia o novo endereço para o servidor
    try {
      const resposta = await fetch(`/api/clientes/${clienteLogado._id}/endereco`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(novoEndereco),
      });

      const dados = await resposta.json();

      if (dados.sucesso) {
        // Atualiza localStorage
        clienteLogado.endereco = novoEndereco;
        localStorage.setItem("clienteLogado", JSON.stringify(clienteLogado));

        // Atualiza visualização
        document.getElementById("vis-rua").textContent = novoEndereco.rua;
        document.getElementById("vis-numero").textContent = novoEndereco.numero;
        document.getElementById("vis-bairro").textContent = novoEndereco.bairro;
        document.getElementById("vis-cidade").textContent = novoEndereco.cidade;
        document.getElementById("vis-estado").textContent = novoEndereco.estado;
        document.getElementById("vis-cep").textContent = novoEndereco.cep;

        // Mostra visualização
        document.getElementById("endereco-visualizacao").style.display = "block";
        formEndereco.style.display = "none";
// Alerta de sucesso
        alert("Endereço salvo com sucesso!");
      } else {
        alert(dados.mensagem || "Erro ao salvar endereço.");
      }
// Trata erros de conexão
    } catch (err) {
      console.error("Erro:", err);
      alert("Erro de conexão.");
    }
  });

  // 5. BOTÃO DE LOGOUT
  document.getElementById("btn-logout").addEventListener("click", () => {
    localStorage.removeItem("clienteLogado");
    alert("Você saiu da conta.");
    window.location.href = "index.html";
  });

  // 6. BOTÃO ALTERAR SENHA (opcional)
  const btnMostrarSenha = document.getElementById("btn-mostrar-senha");
  const senhaContainer = document.getElementById("senha-container");

  btnMostrarSenha?.addEventListener("click", () => {
    senhaContainer.style.display = "block";
    btnMostrarSenha.style.display = "none";
  });
// Manipula o envio do formulário de alteração de senha
  document.getElementById("form-senha")?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const senhaAtual = document.getElementById("senha-atual").value;
    const novaSenha = document.getElementById("nova-senha").value;
    const confirmar = document.getElementById("confirmar-senha").value;
// Valida se as senhas coincidem
    if (novaSenha !== confirmar) {
      alert("As senhas não coincidem.");
      return;
    }
// Envia a nova senha para o servidor
    try {
      const resposta = await fetch(`/api/clientes/${clienteLogado._id}/senha`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ senhaAtual, novaSenha }),
      });
// Processa a resposta do servidor
      const dados = await resposta.json();
      alert(dados.mensagem || "Erro ao atualizar senha.");
      if (dados.sucesso) {
        senhaContainer.style.display = "none";
        btnMostrarSenha.style.display = "block";
      }
      // Trata erros de conexão
    } catch (err) {
      alert("Erro de conexão.");
    }
  });
});