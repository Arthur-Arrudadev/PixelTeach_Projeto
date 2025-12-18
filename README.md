# PixelTech Projeto 🖥️🚀

## 📌 Visão Geral

O **PixelTech Projeto** é um sistema web completo (frontend + backend) desenvolvido em **Node.js** seguindo a arquitetura **MVC**, com persistência em banco de dados **MongoDB Atlas**, autenticação de usuários, integração com serviços externos e um ciclo de **CI/CD automatizado com GitHub Actions**.
O projeto foi desenvolvido como trabalho acadêmico, respeitando todos os requisitos propostos, incluindo implantação em **AWS EC2**.

---

## 🎯 Objetivo do Sistema

Permitir que usuários realizem operações de **CRUD** (Create, Read, Update e Delete) em múltiplas entidades, simulando o funcionamento de uma loja virtual com regras de negócio bem definidas.

---

## 🧱 Arquitetura

O projeto utiliza o padrão **MVC (Model–View–Controller)** para organização e escalabilidade.

```
PixelTeach_Projeto/
│
├── controllers/      # Lógica das rotas e regras de negócio
├── middlewares/      # Autenticação, validações e segurança
├── models/           # Modelos do MongoDB (Mongoose)
├── routes/           # Definição das rotas da API
├── public/           # Frontend (HTML, CSS, JS, imagens)
├── __tests__/        # Testes automatizados básicos
├── .github/workflows # Pipeline CI/CD (GitHub Actions)
├── .env              # Variáveis de ambiente (não versionado)
├── index.js          # Arquivo principal do servidor
├── package.json
└── README.md
```

---

## 🧩 Entidades do Sistema

O sistema trabalha com **quatro entidades principais**, todas representadas por modelos próprios no banco de dados:

- **Clientes** – usuários finais da aplicação
- **Produtos** – itens disponíveis para compra
- **Pedidos** – registros de transações e regras de negócio
- **Administradores** – responsáveis pela gestão e controle do sistema

Todas possuem operações de **CRUD**.

---

## 🔐 Autenticação e Segurança

* Autenticação baseada em **JWT (JSON Web Token)**
* Middleware de proteção de rotas
* Variáveis sensíveis protegidas via **dotenv (.env)**

---

## 🗄️ Banco de Dados

* **MongoDB Atlas**
* ODM: **Mongoose**
* Conexão via string segura armazenada em variável de ambiente

---

## ✅ Integrações

* Telegram Bot API (Envio automático de mensagens e notificações)

---

## ⚙️ Tecnologias Utilizadas

### Backend

* Node.js
* Express
* Mongoose
* JWT
* Dotenv
* Axios
* Cors

### Frontend

* HTML5
* CSS3
* JavaScript

### DevOps / Infraestrutura

* Git & GitHub
* GitHub Actions (CI/CD)
* AWS EC2 (Ubuntu 22.04)

### Testes

* Jest
* Supertest

---

## 🔁 CI/CD

O projeto possui um pipeline de **Integração Contínua** configurado com **GitHub Actions**, que é executado automaticamente em:

* Push para a branch `main`
* Pull Requests para `main`

### Pipeline Básico

* Checkout do repositório
* Configuração do Node.js
* Instalação das dependências
* Execução de verificações básicas

Status visível diretamente no repositório (✔️ verde).

---

## ☁️ Implantação na AWS

* Serviço: **Amazon EC2**
* Sistema Operacional: Ubuntu 22.04 LTS
* Execução manual do backend via Node.js
* Acesso público configurado via Security Groups

### Execução no servidor

```bash
npm install
npm start
```

---

## 🧪 Testes Automatizados

Foram implementados testes básicos para validação inicial da API, utilizando:

* **Jest**
* **Supertest**

Os testes garantem que o servidor responde corretamente e que as rotas principais estão acessíveis.

---

## 📦 Requisitos Atendidos

* ✅ Arquitetura MVC
* ✅ CRUD completo
* ✅ Três ou mais entidades
* ✅ Microsserviço/Publish-Subscribe/Serveless
* ✅ Uso de banco de dados
* ✅ Histórico completo de commits
* ✅ Autenticação
* ✅ Estratégia de cache
* ✅ Regras de negócio
* ✅ CI/CD com GitHub Actions
* ✅ Implantação em EC2

---

## 👩‍💻 Autoria

Projeto desenvolvido para fins acadêmicos, para disciplina de Desenvolvimento Web 2 do IPFE campus Paulista.

