# 🛒 Loja PixelTech - Backend + Frontend

**Ana Luiza Leão & Arthur Arruda**

📦 Projeto desenvolvido inicialmente como parte da disciplina **Desenvolvimento Web I** (2025.1), **Banco de Dados II** (2025.1) e posteriormente escalado como nota da 1ª unidade da disciplina **Desenvolvimento Web 2** no **IFPE - Campus Paulista** com **MVC + CRUD + Microsserviço (Telegram Bot)**.  

---

## 📌 Sobre o Projeto

**PixelTech** é uma loja virtual de produtos eletrônicos construída com foco em **usabilidade**, **design responsivo** e **funcionalidades completas** de um e-commerce, agora com **backend integrado** e **persistência em banco de dados**.

Nesta versão evoluída, a loja simula o fluxo real de um sistema de vendas online, com **cadastro de usuários**, **login**, **armazenamento de endereços**, **pedidos salvos em banco de dados**, outras interações dinâmicas com **MongoDB Atlas** e também **serviço de mensagem pelo telegram**.

---

## ✅ Requisitos Atendidos (100%)

| Requisito | Status | Prova |
|------------|:--------:|-------|
| **(i) Backend CRUD** | ✅ | Clientes, Produtos e Pedidos (**MongoDB Atlas**) |
| **(ii) Componente Avançado** | ✅ | Sistema de Notificações via **Telegram Bot** usando Axios |
| **(iii) GitHub** | ✅ | Histórico de commits, README e versionamento completo |
| **(iv) Deploy AWS** | ✅ | Implantado no **AWS Cloud9** (online com HTTPS) |

---

## 🌐 Deploy

- **Plataforma**: AWS Cloud9  
- **URL de Acesso**:
  🔗 [https://b5782c327b21482d8da5c7dd262823f6.vfs.cloud9.us-east-1.amazonaws.com:8080](https://b5782c327b21482d8da5c7dd262823f6.vfs.cloud9.us-east-1.amazonaws.com:8080)
- **Node.js**: `v18.20.8`  
- **Frontend**: Pasta `public/` com HTML, CSS e JS  

---

## ⚙️ Funcionalidades

- ✅ Catálogo com lista de produtos (nome, imagem, preço, botão de compra)
- 🔍 Filtros por **preço**, **categoria**, **ofertas** e **barra de busca**
- 🛍️ Carrinho de compras com contador, ajuste de quantidade e cálculo de total
- 💳 Página de finalização com **simulação de pagamento** e **registro de pedido**
- 👤 Cadastro, login e logout de clientes com dados persistidos no banco
- 📦 Formulário de endereço dinâmico com visualização e edição
- 🔐 Alteração de senha com validação segura
- 💾 Armazenamento de dados no **MongoDB Atlas**
- 🌐 Integração front-end e back-end com **fetch API**
- 🤖 Envio de mensagem automática ao receber um novo pedido

---

## 🧩 Estrutura do Projeto

PixelTech/
├── controllers/
│ ├── ClienteController.js
│ ├── PedidoController.js
│ └── ProdutoController.js
├── models/
│ ├── Cliente.js
│ ├── Pedido.js
│ └── Produto.js
├── routes/
│ ├── clienteRoutes.js
│ ├── pedidoRoutes.js
│ └── produtoRoutes.js
├── public/
│ ├── css/
│ │ └── estilo.css
│ ├── js/
│ │ ├── login.js
│ │ ├── area-cliente.js
│ │ └── finalizar.js
│ └── *.html
├── .env
├── index.js
└── package.json

---

## 🚀 Como Rodar Localmente

### 1. Clone o repositório
git clone https://github.com/Arthur-Arrudadev/PixelTeach_Projeto.git
cd PixelTeach_Projeto

### 2. Instale as dependências
npm install

### 3. Configure o .env
cp .env.example .env
#### Edite com seu MONGO_URI e TELEGRAM_TOKEN

### 4. Rode o servidor
node index.js

## 🧠 Tecnologias Utilizadas

### 🔧 Front-end
- **HTML5**
- **CSS3**
- **JavaScript ES6+**
- **Fetch API**
- **localStorage**

### 🛠️ Back-end
- **Node.js**
- **Express.js**
- **MongoDB Atlas**
- **Mongoose**
- **dotenv**
- **Cors**
- **Axios**

## 👩‍💻 Autores

- Ana Luiza Leão	@AninhaLeao-B
- Arthur Arruda	@Arthur-Arrudadev

## 📚 Licença

Este projeto é acadêmico e **não deve ser utilizado em ambiente de produção real**.

---

## 💖 Agradecimentos

Agradecemos aos professores responsável pela disciplina e ao IFPE – Campus Paulista pelo apoio e oportunidade de desenvolver este projeto prático e desafiador.
