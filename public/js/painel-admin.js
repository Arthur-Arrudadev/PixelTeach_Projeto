// painel-admin.js
document.addEventListener("DOMContentLoaded", () => {
  // Verifica se o usuário está logado como admin
  if (!localStorage.getItem("tokenAdmin")) {
    alert("Acesso negado! Faça login como administrador.");
    window.location.href = "admin.html";
    return;
  }
  
  // Configura logout
  document.getElementById("logout-admin").addEventListener("click", (e) => {
    e.preventDefault();
    if (confirm("Deseja realmente sair do painel administrativo?")) {
      localStorage.removeItem("tokenAdmin");
      window.location.href = "admin.html";
    }
  });
});

// ========== FUNÇÃO PRINCIPAL PARA LISTAR ==========
async function listar(tipo) {
  const token = localStorage.getItem("tokenAdmin");
  const container = document.getElementById("saida-container");
  
  if (!token) {
    alert("Você não está logado!");
    window.location.href = "admin.html";
    return;
  }

  // Mostra loading
  container.innerHTML = `
    <div class="loading">
      <div style="color: #666; margin-bottom: 20px;">Carregando ${tipo}...</div>
      <div class="spinner"></div>
    </div>
  `;

  const baseURL = window.location.origin;
  const rotas = {
    clientes: `${baseURL}/api/clientes`,
    produtos: `${baseURL}/api/produtos`,
    pedidos:  `${baseURL}/api/pedidos`
  };

  try {
    const resp = await fetch(rotas[tipo], {
      headers: { 
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    });

    const resultado = await resp.json();
    console.log("Resultado da API:", resultado);

    // EXTRAI OS DADOS CORRETAMENTE
    let dadosArray;
    
    if (resultado.success && resultado[tipo]) {
      // Formato: {success: true, clientes: [...]}
      dadosArray = resultado[tipo];
    } else if (Array.isArray(resultado)) {
      // Formato: [...]
      dadosArray = resultado;
    } else if (resultado.data) {
      // Formato: {data: [...]}
      dadosArray = resultado.data;
    } else {
      dadosArray = [];
    }

    if (!dadosArray || dadosArray.length === 0) {
      container.innerHTML = `
        <div style="text-align:center;padding:40px;color:#666;">
          <h3>📭 Nenhum ${tipo.slice(0, -1)} encontrado</h3>
          <p>Não há registros no sistema.</p>
        </div>
      `;
      return;
    }

    // Renderiza a tabela
    container.innerHTML = criarTabelaHTML(dadosArray, tipo);

  } catch (erro) {
    console.error("Erro:", erro);
    container.innerHTML = `
      <div class="mensagem-erro">
        <h3>❌ Erro ao carregar dados</h3>
        <p>${erro.message}</p>
        <button onclick="testarAPI('${tipo}')" style="margin-top: 15px; padding: 8px 16px; background: #ff9800; color: white; border: none; border-radius: 5px; cursor: pointer;">
          Testar API manualmente
        </button>
      </div>
    `;
  }
}

// ========== CRIAR TABELA HTML ==========
function criarTabelaHTML(dados, tipo) {
  if (!dados || dados.length === 0) return "<p>Sem dados</p>";
  
  const primeiro = dados[0];
  const colunas = Object.keys(primeiro).filter(c => 
    !['senha', '__v', 'password', 'token', '_id', 'descricao', 'imagem'].includes(c)
  );
  
  let html = `
    <div>
      <div class="form-header">
        <h3>
          ${tipo === 'clientes' ? '👥 Clientes' : tipo === 'produtos' ? '📦 Produtos' : '📋 Pedidos'}
          <span style="font-size:14px; color:#7f8c8d;">(${dados.length} registros)</span>
        </h3>
        <button onclick="mostrarFormCriar('${tipo}')" class="btn-salvar" style="display:flex; align-items:center; gap:8px;">
          ➕ Novo ${tipo.slice(0, -1)}
        </button>
      </div>
      
      <table class="tabela-admin">
        <thead>
          <tr>
            <th style="width:50px;">#</th>
  `;
  
  // Cabeçalhos
  colunas.forEach(col => {
    const nome = col.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    html += `<th>${nome}</th>`;
  });
  
  html += `<th class="acoes-col">AÇÕES</th>`;
  html += `</tr></thead><tbody>`;
  
  // Linhas
  dados.forEach((item, idx) => {
    const id = item._id || item.id;
    
    html += `<tr id="row-${id}">`;
    html += `<td style="color:#666;">${idx + 1}</td>`;
    
    colunas.forEach(col => {
      let valor = item[col];
      
      if (valor === null || valor === undefined) {
        valor = '<span style="color:#bbb;">—</span>';
      } else if (typeof valor === 'object') {
        valor = `<span title="${JSON.stringify(valor)}" style="cursor:help; color:#666; font-size:12px;">{...}</span>`;
      } else if (typeof valor === 'boolean') {
        valor = valor ? '✅' : '❌';
      } else if (col.includes('preco') || col.includes('valor')) {
        valor = '<strong>R$ ' + parseFloat(valor).toFixed(2).replace('.', ',') + '</strong>';
      } else if (col.includes('email')) {
        valor = `<a href="mailto:${valor}" style="color:#3498db;">${valor}</a>`;
      } else if (col === 'nome') {
        valor = `<strong>${valor}</strong>`;
      }
      
      html += `<td>${valor}</td>`;
    });
    
    // Coluna de Ações
    html += `
      <td class="acoes-col">
        <div class="acoes-botoes">
          <button onclick="editarRegistro('${tipo}', '${id}')" class="btn-editar">
            ✏️ Editar
          </button>
          <button onclick="excluirRegistro('${tipo}', '${id}', '${item.nome || item.email || item._id}')" class="btn-excluir">
            🗑️ Excluir
          </button>
        </div>
      </td>
    `;
    
    html += `</tr>`;
  });
  
  html += `</tbody></table></div>`;
  
  return html;
}

// ========== FUNÇÕES DE CRUD ==========

// FORMULÁRIO PARA CRIAR NOVO REGISTRO
function mostrarFormCriar(tipo) {
  const container = document.getElementById("saida-container");
  
  const campos = {
    clientes: [
      { name: 'nome', type: 'text', label: 'Nome completo', required: true },
      { name: 'email', type: 'email', label: 'E-mail', required: true },
      { name: 'senha', type: 'password', label: 'Senha', required: true },
      { name: 'telefone', type: 'text', label: 'Telefone' },
      { name: 'endereco.rua', type: 'text', label: 'Rua' },
      { name: 'endereco.numero', type: 'text', label: 'Número' },
      { name: 'endereco.cidade', type: 'text', label: 'Cidade' },
      { name: 'endereco.estado', type: 'text', label: 'Estado', maxlength: 2 }
    ],
    produtos: [
      { name: 'nome', type: 'text', label: 'Nome do produto', required: true },
      { name: 'descricao', type: 'textarea', label: 'Descrição' },
      { name: 'preco', type: 'number', label: 'Preço atual (R$)', step: '0.01', required: true },
      { name: 'precoOriginal', type: 'number', label: 'Preço original (R$)', step: '0.01' },
      { name: 'emOferta', type: 'checkbox', label: 'Produto em oferta?' },
      { name: 'estoque', type: 'number', label: 'Quantidade em estoque', min: 0 }, // Mudei de 'quantidade' pra 'estoque' pra bater com o model
      { name: 'categoria', type: 'text', label: 'Categoria' },
      { name: 'imagem', type: 'text', label: 'Caminho da imagem' },
      { name: 'ativo', type: 'checkbox', label: 'Produto ativo? (visível no site)' } // ← NOVO CHECKBOX!
    ],
    pedidos: [
      { name: 'clienteId', type: 'text', label: 'ID do Cliente', required: true },
      { name: 'produtos', type: 'textarea', label: 'Produtos (JSON)', placeholder: '[{"produtoId": "...", "quantidade": 1}]' },
      { name: 'total', type: 'number', label: 'Valor total', step: '0.01' },
      { name: 'status', type: 'select', label: 'Status', options: ['pendente', 'pago', 'enviado', 'entregue', 'cancelado'] }
    ]
  };
  
  let formHTML = `
    <div class="form-admin">
      <div class="form-header">
        <h3>➕ Criar novo ${tipo.slice(0, -1)}</h3>
        <button onclick="listar('${tipo}')" class="btn-cancelar">
          ↩️ Voltar para lista
        </button>
      </div>
      
      <form id="form-criar" onsubmit="criarRegistro(event, '${tipo}')">
        <div class="form-grid">
  `;
  
  campos[tipo].forEach(campo => {
    if (campo.type === 'textarea') {
      formHTML += `
        <div class="form-group">
          <label>${campo.label}</label>
          <textarea 
            name="${campo.name}" 
            ${campo.required ? 'required' : ''}
            ${campo.placeholder ? `placeholder="${campo.placeholder}"` : ''}
          ></textarea>
        </div>
      `;
    } else if (campo.type === 'select') {
      formHTML += `
        <div class="form-group">
          <label>${campo.label}</label>
          <select name="${campo.name}" ${campo.required ? 'required' : ''}>
            ${campo.options.map(opt => `<option value="${opt}">${opt.toUpperCase()}</option>`).join('')}
          </select>
        </div>
      `;
    } else {
      formHTML += `
        <div class="form-group">
          <label>${campo.label}</label>
          <input 
            type="${campo.type}" 
            name="${campo.name}" 
            ${campo.required ? 'required' : ''}
            ${campo.step ? `step="${campo.step}"` : ''}
            ${campo.min !== undefined ? `min="${campo.min}"` : ''}
            ${campo.maxlength ? `maxlength="${campo.maxlength}"` : ''}
            ${campo.placeholder ? `placeholder="${campo.placeholder}"` : ''}
          >
        </div>
      `;
    }
  });
  
  formHTML += `
        </div>
        <div class="form-botoes">
          <button type="submit" class="btn-salvar" style="display:flex; align-items:center; gap:8px;">
            💾 Salvar ${tipo.slice(0, -1)}
          </button>
          <button type="button" onclick="listar('${tipo}')" class="btn-cancelar">
            Cancelar
          </button>
        </div>
      </form>
    </div>
  `;
  
  container.innerHTML = formHTML;
}

// CRIAR REGISTRO
async function criarRegistro(event, tipo) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);
  const data = {};

// Campos booleanos: se não vier no form, força false
data.emOferta = false;
data.ativo = false;

// Preenche os que vieram
for (let [key, value] of formData.entries()) {
  if (key.includes('.')) {
    // nested (ex: endereco.rua)
    const parts = key.split('.');
    let current = data;
    for (let i = 0; i < parts.length - 1; i++) {
      if (!current[parts[i]]) current[parts[i]] = {};
      current = current[parts[i]];
    }
    current[parts[parts.length - 1]] = value.trim();
  } else {
    // campos normais
    if (value === 'on') {
      data[key] = true; // checkbox marcado
    } else {
      data[key] = value.trim();
    }
  }
}

// Garante que os booleans existam (caso desmarcado)
if (formData.has('emOferta')) data.emOferta = true;
if (formData.has('ativo')) data.ativo = true;
  
  const token = localStorage.getItem("tokenAdmin");
  const baseURL = window.location.origin;
  
  // Define a rota correta baseada no tipo
  let rota;
  if (tipo === 'clientes') {
    rota = `${baseURL}/api/clientes/admin/criar`; // Rota especial para admin
  } else {
    rota = `${baseURL}/api/${tipo}`;
  }
  
  console.log('Enviando para:', rota);
  console.log('Dados:', data);
  
  try {
    const resposta = await fetch(rota, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    
    const resultado = await resposta.json();
    console.log('Resposta:', resultado);
    
    if (resposta.ok) {
      alert(`✅ ${tipo.slice(0, -1)} criado com sucesso!`);
      listar(tipo); // Recarrega a lista
    } else {
      alert(`❌ Erro: ${resultado.mensagem || resultado.message || resultado.error || 'Erro desconhecido'}`);
    }
  } catch (erro) {
    console.error('Erro:', erro);
    alert('❌ Erro de conexão com o servidor');
  }
}

// EDITAR REGISTRO
async function editarRegistro(tipo, id) {
  const token = localStorage.getItem("tokenAdmin");
  const baseURL = window.location.origin;
  
  try {
    // Busca os dados atuais
    const resposta = await fetch(`${baseURL}/api/${tipo}/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (!resposta.ok) {
      throw new Error('Erro ao buscar dados');
    }
    
    const resultado = await resposta.json();
    const registro = resultado.cliente || resultado.produto || resultado.pedido || resultado;
    
    // Mostra formulário de edição
    mostrarFormEditar(tipo, id, registro);
    
  } catch (erro) {
    console.error('Erro:', erro);
    alert('❌ Erro ao buscar dados para edição');
  }
}

function mostrarFormEditar(tipo, id, registro) {
  const container = document.getElementById("saida-container");
  
  const campos = {
    clientes: [
      { name: 'nome', type: 'text', label: 'Nome completo', required: true },
      { name: 'email', type: 'email', label: 'E-mail', required: true },
      { name: 'telefone', type: 'text', label: 'Telefone' },
      { name: 'role', type: 'select', label: 'Tipo de usuário', options: ['cliente', 'admin'] },
      { name: 'endereco.rua', type: 'text', label: 'Rua' },
      { name: 'endereco.numero', type: 'text', label: 'Número' },
      { name: 'endereco.cidade', type: 'text', label: 'Cidade' },
      { name: 'endereco.estado', type: 'text', label: 'Estado', maxlength: 2 }
    ],
    produtos: [
      { name: 'nome', type: 'text', label: 'Nome do produto', required: true },
      { name: 'descricao', type: 'textarea', label: 'Descrição' },
      { name: 'preco', type: 'number', label: 'Preço atual (R$)', step: '0.01', required: true },
      { name: 'precoOriginal', type: 'number', label: 'Preço original (R$)', step: '0.01' },
      { name: 'emOferta', type: 'checkbox', label: 'Produto em oferta?' },
      { name: 'estoque', type: 'number', label: 'Quantidade em estoque', min: 0 }, // Mudei de 'quantidade' pra 'estoque' pra bater com o model
      { name: 'categoria', type: 'text', label: 'Categoria' },
      { name: 'imagem', type: 'text', label: 'Caminho da imagem' },
      { name: 'ativo', type: 'checkbox', label: 'Produto ativo? (visível no site)' } // ← NOVO CHECKBOX!
    ]
  };
  
  // Função para obter valor nested (ex: endereco.rua)
  function getNestedValue(obj, path) {
    return path.split('.').reduce((current, key) => {
      return current && current[key] !== undefined ? current[key] : '';
    }, obj);
  }
  
  let formHTML = `
    <div class="form-admin">
      <div class="form-header">
        <h3>✏️ Editar ${tipo.slice(0, -1)}</h3>
        <button onclick="listar('${tipo}')" class="btn-cancelar">
          ↩️ Voltar para lista
        </button>
      </div>
      
      <form id="form-editar" onsubmit="salvarEdicao(event, '${tipo}', '${id}')">
        <div class="form-grid">
  `;
  
  if (!campos[tipo]) {
    formHTML += `<p>Edição para ${tipo} ainda não implementada</p>`;
  } else {
    campos[tipo].forEach(campo => {
      let valorAtual = getNestedValue(registro, campo.name) || '';
      
      if (campo.type === 'textarea') {
        formHTML += `
          <div class="form-group">
            <label>${campo.label}</label>
            <textarea name="${campo.name}" ${campo.required ? 'required' : ''}>${valorAtual}</textarea>
          </div>
        `;
      } else if (campo.type === 'select') {
        formHTML += `
          <div class="form-group">
            <label>${campo.label}</label>
            <select name="${campo.name}" ${campo.required ? 'required' : ''}>
              ${campo.options.map(opt => `
                <option value="${opt}" ${valorAtual === opt ? 'selected' : ''}>
                  ${opt.toUpperCase()}
                </option>
              `).join('')}
            </select>
          </div>
        `;
      } else if (campo.type === 'checkbox') {
        formHTML += `
          <div class="form-group">
            <label>${campo.label}</label>
            <input 
              type="checkbox" 
              name="${campo.name}"
              ${valorAtual ? 'checked' : ''}
            >
          </div>
        `;
      } else {
        formHTML += `
          <div class="form-group">
            <label>${campo.label}</label>
            <input 
              type="${campo.type}" 
              name="${campo.name}"
              value="${valorAtual}"
              ${campo.required ? 'required' : ''}
              ${campo.step ? `step="${campo.step}"` : ''}
              ${campo.min !== undefined ? `min="${campo.min}"` : ''}
              ${campo.maxlength ? `maxlength="${campo.maxlength}"` : ''}
            >
          </div>
        `;
      }
    });
  }
  
  formHTML += `
        </div>
        <div class="form-botoes">
          <button type="submit" class="btn-salvar" style="display:flex; align-items:center; gap:8px;">
            💾 Salvar alterações
          </button>
          <button type="button" onclick="listar('${tipo}')" class="btn-cancelar">
            Cancelar
          </button>
        </div>
      </form>
    </div>
  `;
  
  container.innerHTML = formHTML;
}

async function salvarEdicao(event, tipo, id) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);
  const data = {};

// Campos booleanos: se não vier no form, força false
data.emOferta = false;
data.ativo = false;

// Preenche os que vieram
for (let [key, value] of formData.entries()) {
  if (key.includes('.')) {
    // nested (ex: endereco.rua)
    const parts = key.split('.');
    let current = data;
    for (let i = 0; i < parts.length - 1; i++) {
      if (!current[parts[i]]) current[parts[i]] = {};
      current = current[parts[i]];
    }
    current[parts[parts.length - 1]] = value.trim();
  } else {
    // campos normais
    if (value === 'on') {
      data[key] = true; // checkbox marcado
    } else {
      data[key] = value.trim();
    }
  }
}

// Garante que os booleans existam (caso desmarcado)
if (formData.has('emOferta')) data.emOferta = true;
if (formData.has('ativo')) data.ativo = true;

  const token = localStorage.getItem("tokenAdmin");
  const baseURL = window.location.origin;

  // ROTA PADRÃO CORRETA (ajuste conforme seu backend)
  // A maioria dos projetos usa PUT em /api/tipo/:id
  const rota = `${baseURL}/api/${tipo}/${id}`;

  console.log("Salvando edição em:", rota);
  console.log("Dados enviados:", data);

  try {
    const resposta = await fetch(rota, {
      method: 'PUT', // ou 'PATCH' se seu backend usar partial update
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    let resultado;
    try {
      resultado = await resposta.json();
    } catch {
      resultado = {}; // se não for JSON
    }

    console.log("Status:", resposta.status);
    console.log("Resposta completa:", resultado);

    if (resposta.ok || resposta.status === 200 || resposta.status === 201) {
      alert(`✅ ${tipo.slice(0, -1)} atualizado com sucesso!`);
      listar(tipo); // volta pra lista atualizada
    } else {
      // Tratamento seguro de erro
      const mensagemErro = 
        resultado?.mensagem ||
        resultado?.message ||
        resultado?.error ||
        resultado?.erro ||
        `HTTP ${resposta.status} - ${resposta.statusText}`;

      alert(`❌ Erro ao salvar: ${mensagemErro}`);
    }

  } catch (erro) {
    console.error("Erro de rede:", erro);
    alert(`❌ Erro de conexão: ${erro.message || 'Falha ao conectar com o servidor'}`);
  }
}

// EXCLUIR REGISTRO
async function excluirRegistro(tipo, id, nome) {
  if (!confirm(`Tem certeza que deseja excluir "${nome}"?\nEsta ação não pode ser desfeita!`)) {
    return;
  }
  
  const token = localStorage.getItem("tokenAdmin");
  const baseURL = window.location.origin;
  
  try {
    const resposta = await fetch(`${baseURL}/api/${tipo}/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    const resultado = await resposta.json();
    console.log('Resposta da exclusão:', resultado);
    
    if (resposta.ok) {
      // Efeito visual de remoção
      const linha = document.getElementById(`row-${id}`);
      if (linha) {
        linha.style.transition = 'all 0.3s';
        linha.style.opacity = '0';
        linha.style.transform = 'translateX(-20px)';
        setTimeout(() => {
          linha.remove();
          // Atualiza contador
          const titulo = document.querySelector('h3 span');
          if (titulo) {
            const atual = parseInt(titulo.textContent.match(/\((\d+)/)[1]);
            titulo.textContent = `(${atual - 1} registros)`;
          }
        }, 300);
      } else {
        listar(tipo); // Recarrega se não encontrou a linha
      }
      
      setTimeout(() => {
        alert(`✅ ${tipo.slice(0, -1)} excluído com sucesso!`);
      }, 350);
    } else {
      alert(`❌ Erro: ${resultado.mensagem || resultado.message || resultado.error || 'Erro ao excluir'}`);
    }
  } catch (erro) {
    console.error('Erro:', erro);
    alert('❌ Erro de conexão com o servidor');
  }
}

// FUNÇÃO PARA TESTAR API (debug)
function testarAPI(tipo) {
  const token = localStorage.getItem("tokenAdmin");
  const baseURL = window.location.origin;
  const url = `${baseURL}/api/${tipo}`;
  
  console.log("Testando API:", url);
  
  fetch(url, {
    headers: { 
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  })
  .then(r => {
    console.log("Status:", r.status);
    console.log("Headers:", r.headers);
    return r.json();
  })
  .then(data => {
    console.log("Dados da API:", data);
    alert(`API Response:\nStatus: OK\nData type: ${typeof data}\n\nVerifique console (F12) para detalhes.`);
  })
  .catch(err => {
    console.error("Erro no teste:", err);
    alert(`Erro: ${err.message}`);
  });
}