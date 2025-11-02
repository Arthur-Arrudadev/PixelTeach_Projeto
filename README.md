# Loja PixelTech - Backend + Frontend (Entrega Final)

**Ana Luiza & Arthur**  
*"Nunca subestime um `localStorage`, um `fetch` ou um `app.use` na ordem errada."*

---

## Requisitos Atendidos (100%)

| Requisito | Status | Prova |
|---------|--------|-------|
| **(i) Backend CRUD** | CONCLUÍDO | Clientes, Produtos, Pedidos (MongoDB Atlas) |
| **(ii) Componente Avançado** | CONCLUÍDO | Notificação via **Telegram Bot** |
| **(iii) GitHub** | CONCLUÍDO | 20+ commits, versions, README |
| **(iv) Deploy AWS** | CONCLUÍDO | Cloud9 online com HTTPS |

---

## Deploy (Online 24/7)

- **Plataforma**: AWS Cloud9
- **URL**:  
  [https://b5782c327b21482d8da5c7dd262823f6.vfs.cloud9.us-east-1.amazonaws.com:8080](https://b5782c327b21482d8da5c7dd262823f6.vfs.cloud9.us-east-1.amazonaws.com:8080)
- **Node.js**: `v18.20.8`
- **Frontend**: Pasta `public/` com HTML, CSS, JS
- **Status**: **ONLINE** com login, cadastro, pedidos, endereço e Telegram

---

## Funcionalidades

| Funcionalidade | Descrição |
|---------------|---------|
| **Cadastro de Cliente** | `POST /api/clientes` |
| **Login** | `POST /api/clientes/login` → salva no `localStorage` |
| **Atualizar Endereço** | `PUT /api/clientes/:id/endereco` → aparece na tela |
| **Atualizar Senha** | `PUT /api/clientes/:id/senha` |
| **Catálogo de Produtos** | `GET /api/produtos` → ofertas destacadas |
| **Carrinho + Pedido** | `POST /api/pedidos` |
| **Telegram Bot** | Envia mensagem ao novo pedido |
| **Área do Cliente** | Mostra nome, email, endereço, logout |

---

## Estrutura do Projeto
loja-pixeltech-backend/
├── controllers/
│   ├── ClienteController.js
│   ├── PedidoController.js
│   └── ProdutoController.js
├── models/
│   ├── Cliente.js
│   ├── Pedido.js
│   └── Produto.js
├── routes/
│   ├── clienteRoutes.js
│   ├── pedidoRoutes.js
│   └── produtoRoutes.js
├── public/
│   ├── css/estilo.css
│   ├── js/
│   │   ├── login.js
│   │   ├── area-cliente.js
│   │   └── finalizar.js
│   └── *.html
├── .env
├── index.js
└── package.json


---

## Como Rodar Localmente

```bash
# 1. Clone o repositório
git clone https://github.com/seu-usuario/loja-pixeltech-backend.git
cd loja-pixeltech-backend

# 2. Instale as dependências
npm install

# 3. Configure o .env
cp .env.example .env
# Edite com seu MONGO_URI e TELEGRAM_TOKEN

# 4. Rode o servidor
node index.js

## Tecnologias

Backend: Node.js, Express, MongoDB (Atlas)
Frontend: HTML, CSS, JavaScript (Vanilla)
Deploy: AWS Cloud9
Notificação: Telegram Bot API
