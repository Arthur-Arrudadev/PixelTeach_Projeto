// cadastro.js
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-cadastro");

  form.addEventListener("submit", function (event) {
    event.preventDefault(); // evita recarregar a página

    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value;
    const confirma = document.getElementById("confirma").value;
// Valida os campos de entrada
    if (!nome || !email || !senha || !confirma) {
      alert("Por favor, preencha todos os campos.");
      return;
    }
 // Valida se as senhas coincidem
    if (senha !== confirma) {
      alert("As senhas não coincidem.");
      return;
    }
// Prepara os dados para envio
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
    //recebe a resposta do servidor
    .then(res => res.json())
    .then(data => {
      console.log("Resposta do servidor:", data);
      alert("Cadastro realizado com sucesso!");

      form.reset();
    })
    //trata erros de rede ou servidor
    .catch(error => {
      console.error("Erro ao salvar cadastro:", error);
      alert("Erro ao cadastrar. Tente novamente.");
    });
  });
});
