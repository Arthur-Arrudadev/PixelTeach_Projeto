// login.js
document.addEventListener("DOMContentLoaded", function() {
  const form = document.getElementById("form-login");
  if (!form) {
    console.error("Formulário não encontrado!");
    return;
  }
// Manipula o envio do formulário de login
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value;
// Valida os campos de entrada
    if (!email || !senha) {
      alert("Preencha todos os campos.");
      return;
    }
// Envia os dados de login para o servidor
    try {
      const resposta = await fetch("/api/clientes/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, senha }),
      });
// Processa a resposta do servidor
      const dados = await resposta.json();

      if (!resposta.ok) {
        throw new Error(dados.mensagem || "Erro ao fazer login");
      }

      if (dados.sucesso) {
        localStorage.setItem("clienteLogado", JSON.stringify(dados.cliente));
        alert(dados.mensagem);
        window.location.href = "area-cliente.html";
      } else {
        alert(dados.mensagem);
      }

    } catch (erro) {
      console.error("Erro no login:", erro);
      alert(erro.message);
    }
  });
});
// Manipula o logout do cliente
document.addEventListener("DOMContentLoaded", () => {
  const btnLogout = document.getElementById("btn-logout");
  if (btnLogout) {
    btnLogout.addEventListener("click", () => {
      localStorage.removeItem("clienteLogado");
      alert("Você saiu da sua conta.");
      window.location.href = "index.html";
    });
  }
});
