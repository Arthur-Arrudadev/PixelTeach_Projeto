# Comandos CRUD para Clientes, Pedidos e Produtos

## CLIENTE

### 1. CRIAR CLIENTE
curl -X POST http://localhost:8080/api/clientes \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Ana Luiza",
    "email": "ana@teste.com",
    "senha": "123456",
    "endereco": {
      "rua": "Av. Brasil",
      "numero": "100",
      "bairro": "Centro",
      "cidade": "São Paulo",
      "estado": "SP",
      "cep": "01000-000"
    }
  }' -w "\n"

### 2. LISTAR TODOS OS CLIENTES
curl http://localhost:8080/api/clientes -w "\n"

### 3. BUSCAR CLIENTE POR ID (substitua o ID)
curl http://localhost:8080/api/clientes/507f1f77bcf86cd799439011 -w "\n"

### 4. ATUALIZAR ENDEREÇO (substitua o ID)
curl -X PUT http://localhost:8080/api/clientes/507f1f77bcf86cd799439011/endereco \
  -H "Content-Type: application/json" \
  -d '{
    "rua": "Rua Nova",
    "numero": "200",
    "bairro": "Jardim",
    "cidade": "Rio de Janeiro",
    "estado": "RJ",
    "cep": "20000-000"
  }' -w "\n"

### 5. LOGIN
curl -X POST http://localhost:8080/api/clientes/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "ana@teste.com",
    "senha": "123456"
  }' -w "\n"

### 6. DELETAR CLIENTE (substitua o ID)
curl -X DELETE http://localhost:8080/api/clientes/507f1f77bcf86cd799439011 -w "\n"

## PRODUTO

### 1. CRIAR PRODUTO
curl -X POST http://localhost:8080/api/produtos \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Mouse Gamer",
    "preco": 129.90,
    "precoOriginal": 199.90,
    "imagem": "https://images.com/mouse.jpg",
    "emOferta": true
  }' -w "\n"

### 2. LISTAR PRODUTOS
curl http://localhost:8080/api/produtos -w "\n"

### 3. BUSCAR PRODUTO POR ID
curl http://localhost:8080/api/produtos/507f191e810c19729de860ea -w "\n"

### 4. ATUALIZAR PRODUTO (substitua ID)
curl -X PUT http://localhost:8080/api/produtos/507f191e810c19729de860ea \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Mouse Gamer PRO",
    "preco": 149.90,
    "emOferta": false
  }' -w "\n"

### 5. DELETAR PRODUTO
curl -X DELETE http://localhost:8080/api/produtos/507f191e810c19729de860ea -w "\n"

## PEDIDO

### 1. CRIAR PEDIDO
curl -X POST http://localhost:8080/api/pedidos \
  -H "Content-Type: application/json" \
  -d '{
    "cliente": "Ana Luiza",
    "emailCliente": "ana@teste.com",
    "itens": [
      {
        "nome": "Mouse Gamer",
        "preco": 129.90,
        "quantidade": 1
      }
    ],
    "total": 129.90,
    "formaPagamento": "Pix",
    "enderecoEntrega": {
      "rua": "Av. Brasil",
      "numero": "100",
      "bairro": "Centro",
      "cidade": "São Paulo",
      "estado": "SP",
      "cep": "01000-000"
    }
  }' -w "\n"

### 2. LISTAR PEDIDOS
curl http://localhost:8080/api/pedidos -w "\n"

### 3. BUSCAR PEDIDO POR ID
curl http://localhost:8080/api/pedidos/507f1f77bcf86cd799439011 -w "\n"

### 4. DELETAR PEDIDO (substitua ID)
curl -X DELETE http://localhost:8080/api/pedidos/507f1f77bcf86cd799439011 -w "\n"
