const tabela = document.getElementById('tabelaSaidas');
const res = document.getElementById('res');
let saidasMapeadas = {};

function buscarIdAluno(nomeCompleto) {
  return fetch('http://localhost:8081/aluno')
    .then(res => res.json())
    .then(lista => {
      const aluno = lista.find(a => `${a.nome} ${a.sobrenome}` === nomeCompleto);
      if (!aluno) throw new Error('Aluno não encontrado');
      return aluno.codAluno;
    });
}

function buscarIdProfessor(nomeCompleto) {
  return fetch('http://localhost:8081/professor')
    .then(res => res.json())
    .then(lista => {
      const prof = lista.find(p => `${p.nome} ${p.sobrenome}` === nomeCompleto);
      if (!prof) throw new Error('Professor não encontrado');
      return prof.codProfessor;
    });
}

function carregarSaidas() {
  fetch('http://localhost:8081/saida')
    .then(response => {
      if (!response.ok) throw new Error('Erro ao buscar saídas');
      return response.json();
    })
    .then(saidas => {
      tabela.innerHTML = '';
      saidasMapeadas = {};

      saidas.forEach(saida => {
        saidasMapeadas[saida.codSaida] = saida;

        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${saida.codSaida}</td>
          <td>${saida.nomeAluno}</td>
          <td>${saida.motivo}</td>
          <td>${saida.localDestino}</td>
          <td>${saida.status}</td>
          <td>
            <button onclick="atualizarStatus(${saida.codSaida}, 'ACEITA')">Aceitar</button>
            <button onclick="atualizarStatus(${saida.codSaida}, 'RECUSADA')">Recusar</button>
          </td>
        `;
        tabela.appendChild(tr);
      });
    })
    .catch(error => {
      res.style.color = 'red';
      res.innerText = `Erro: ${error.message}`;
    });
}

function atualizarStatus(id, novoStatus) {
  const saida = saidasMapeadas[id];

  if (!saida) {
    res.style.color = 'red';
    res.innerText = 'Erro: Saída não encontrada.';
    return;
  }

  Promise.all([
    buscarIdAluno(saida.nomeAluno),
    buscarIdProfessor(saida.nomeProfessor)
  ])
  .then(([aluno_cod, professor_cod]) => {
    const saidaAtualizada = {
      aluno_cod,
      professor_cod,
      motivo: saida.motivo,
      localDestino: saida.localDestino,
      status: novoStatus,
      dataSolicitacao: saida.dataSolicitacao,
      horaSaida: saida.horaSaida,
      horaRetorno: saida.horaRetorno,
      nomeAluno: saida.nomeAluno,
      nomeProfessor: saida.nomeProfessor
    };

    return fetch(`http://localhost:8081/saida/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(saidaAtualizada)
    });
  })
  .then(response => {
    if (!response.ok) throw new Error('Falha ao atualizar status');
    res.style.color = 'green';
    res.innerText = `Saída ${id} atualizada para ${novoStatus}`;
    carregarSaidas();
  })
  .catch(error => {
    res.style.color = 'red';
    res.innerText = `Erro: ${error.message}`;
  });
}

carregarSaidas();
