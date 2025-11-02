document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-cadastro");

  form.addEventListener("submit", function (event) {
    event.preventDefault(); // evita recarregar a página

    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value;
    const confirma = document.getElementById("confirma").value;

    if (!nome || !email || !senha || !confirma) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    if (senha !== confirma) {
      alert("As senhas não coincidem.");
      return;
    }

    const dadosCadastro = {
      nome,
      email,
      senha
    };

    // Enviar para o servidor (MongoDB)
    fetch("http://localhost:3000/api/clientes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(dadosCadastro)
    })
    .then(res => res.json())
    .then(data => {
      console.log("Resposta do servidor:", data);
      alert("Cadastro realizado com sucesso!");

      form.reset();
    })
    .catch(error => {
      console.error("Erro ao salvar cadastro:", error);
      alert("Erro ao cadastrar. Tente novamente.");
    });
  });
});
