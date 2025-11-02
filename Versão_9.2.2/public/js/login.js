document.addEventListener("DOMContentLoaded", function() {
  const form = document.getElementById("form-login");

    if (!form) {
    console.error("Formulário não encontrado!");
    return;
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value;

    if (!email || !senha) {
      alert("Preencha todos os campos.");
      return;
    }

    try {
  const resposta = await fetch("http://localhost:3000/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, senha }),
  });

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

  // Salva cliente logado e redireciona
  localStorage.setItem("clienteLogado", JSON.stringify(dados.cliente));
  alert(dados.mensagem); // Usa a mensagem do servidor
  window.location.href = "area-cliente.html";

} catch (erro) {
  console.error("Erro no login:", erro);
  alert(erro.message); // Mostra a mensagem de erro específica
}
  });
});

//

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

