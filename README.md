# PixelTeach_Projeto
projeto para web2

# Loja PixelTech - Backend

Este README descreve como configurar, executar e testar o backend desta aplicação, incluindo o bot do Telegram e a proteção por `API_SECRET`.

Pré-requisitos
- Node.js 18+ versao  (ou compatível com as dependências do projeto)
- npm
- Conta e bot no Telegram (token)
- MongoDB Atlas (ou uma instância Mongo acessível)

Arquivos importantes
- `.env` - variáveis sensíveis (NÃO comitar no repositório)
- `index.js` - ponto de entrada do servidor
- `services/telegramBot.js` - inicializa o bot (webhook ou polling)
- `middleware/apiSecret.js` - middleware para proteger rotas via `API_SECRET`
- `routes/telegramRoutes.js` - endpoint `/telegram/webhook` (opcional em polling)

Instalação
1. Abra um terminal na pasta do backend:
```powershell
cd 'C:\Users\arthu\OneDrive\Documentos\GitHub\PixelTech-Projeto\Versão_9.7.2\loja-pixeltech-backend'
```
2. Instale dependências:
```powershell
npm install
```

Configurar variáveis de ambiente
Crie um arquivo `.env` (baseie-se em `.env.example`) com as variáveis necessárias:

- `MONGO_URI` - string de conexão com MongoDB Atlas
- `TELEGRAM_BOT_TOKEN` - token do bot (obtido via BotFather)
- `BOT_WEBHOOK_URL` - URL pública para webhook (ex.: https://seu-dominio.com)
- `PORT` - porta do servidor (ex.: 3000)
- `API_SECRET` - chave secreta usada pelo middleware para rotas protegidas
- `TELEGRAM_USE_POLLING` - `true` para forçar polling (útil em dev local sem HTTPS)
- `NODE_ENV` - `production` em produção

Exemplo rápido (NÃO comitar este arquivo):
```
MONGO_URI=mongodb+srv://usuario:senha@cluster0.xxxxx.mongodb.net/meubancodedados
TELEGRAM_BOT_TOKEN=123456:ABC-DEF
BOT_WEBHOOK_URL=https://seu-dominio.com
PORT=3000
API_SECRET=minha_chave_secreta_123
TELEGRAM_USE_POLLING=true
NODE_ENV=development
```

Rodando o servidor
```powershell
npm start
```

Logs esperados
- Conexão com Mongo: "🟢 Conectado ao MongoDB Atlas"
- Se em polling: "⚪ Telegram bot iniciado em modo polling (desenvolvimento)."
- Se em webhook (produção com HTTPS): "✅ Telegram webhook definido em https://.../telegram/webhook"

Testes básicos

1) Rota protegida por `API_SECRET`:
```powershell
Invoke-RestMethod -Uri 'http://localhost:3000/api/secure-example' -Headers @{ 'x-api-key' = 'minha_chave_secreta_123' } -Method Get
```
Deve retornar: { ok: true, message: 'Acesso autorizado via API_SECRET' }

2) Testar bot (modo polling)
- Abra o Telegram e envie mensagens ao bot (use o username do bot). Teste `/start`, `/help` e texto livre.

3) Testar webhook (modo produção)
- Configure `BOT_WEBHOOK_URL` com uma URL pública HTTPS (ou use ngrok durante o dev). Reinicie o servidor.
- O endpoint de webhook é: `POST /telegram/webhook` — o Telegram enviará updates para `https://<BOT_WEBHOOK_URL>/telegram/webhook`.

Simular um update manualmente (útil para debugging):
```powershell
$update = @{ update_id = 123456; message = @{ message_id = 1; from = @{ id = 111111; is_bot = $false; first_name = 'Teste' }; chat = @{ id = 111111; type = 'private' }; text = '/start' } }
Invoke-RestMethod -Uri 'http://localhost:3000/telegram/webhook' -Method Post -Body ($update | ConvertTo-Json -Depth 5) -ContentType 'application/json'
```

Segurança
- Nunca comite o arquivo `.env` com tokens e senhas.
- Em produção, use webhook com HTTPS e `NODE_ENV=production`.
- Proteja rotas sensíveis com o `API_SECRET` (o middleware aceita `x-api-key`, `Authorization: Bearer <key>` ou `?api_key=`).

Manutenção e vulnerabilidades
- Após instalar dependências, verifique vulnerabilidades:
```powershell
npm audit
npm audit fix
```
Use `npm audit fix --force` com cautela (pode causar breaking changes).

Próximos passos sugeridos
- Implementar testes automatizados para o middleware `apiSecret`.
- Adicionar rota administrativa para (re)definir webhook dinamicamente (opcional).

----
Arquivo gerado automaticamente pelo assistente. Se quiser, posso ajustar exemplos, adicionar comandos para Docker, ou criar arquivos de teste.

Como testar via HTTPS em localhost (opções)

1) Usando mkcert (gera certificados locais confiáveis):
- Instale mkcert (https://github.com/FiloSottile/mkcert)
- Crie certificados para localhost:
```powershell
mkcert -install
mkcert localhost 127.0.0.1 ::1
```
Isso gera dois arquivos: `localhost+2-key.pem` e `localhost+2.pem` (nomes podem variar).

No seu `.env`, configure:
```
HTTPS=true
HTTPS_KEY_FILE=C:\caminho\para\localhost+2-key.pem
HTTPS_CERT_FILE=C:\caminho\para\localhost+2.pem
PORT=3000
```
Reinicie o servidor (`npm start`). Acesse em `https://localhost:3000`.

2) Usando ngrok (recomendado para webhook do Telegram):
- Execute `ngrok http 3000` e pegue a URL HTTPS fornecida (ex.: `https://abcd1234.ngrok.io`).
- Configure `BOT_WEBHOOK_URL` no `.env` com essa URL e chame a rota administrativa para alternar para webhook, ou reinicie com `NODE_ENV=production`.

Alternar modo do bot via rota administrativa
- Para alternar em runtime entre polling e webhook (requer `API_SECRET`):
	- Polling:
		```powershell
		Invoke-RestMethod -Uri 'http://localhost:3000/admin/switch-mode' -Method Post -Body (@{ mode='polling' } | ConvertTo-Json) -ContentType 'application/json' -Headers @{ 'x-api-key' = 'minha_chave_secreta_123' }
		```
	- Webhook:
		```powershell
		Invoke-RestMethod -Uri 'http://localhost:3000/admin/switch-mode' -Method Post -Body (@{ mode='webhook'; webhookUrl='https://abcd1234.ngrok.io' } | ConvertTo-Json) -ContentType 'application/json' -Headers @{ 'x-api-key' = 'minha_chave_secreta_123' }
		```

Executando testes (Jest)
- Instale dependências (inclui devDependencies):
```powershell
npm install
```
- Rode os testes:
```powershell
npm test
```

