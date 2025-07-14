let res = document.getElementById('res');
let atualizarS = document.getElementById('atualizarS');
let consultarID = document.getElementById('consultarID');

document.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault();
});

document.getElementById('aluno_id').addEventListener('blur', function() {
    let id = this.value;

    res.style.display = 'block'; 

    fetch(`http://localhost:8081/aluno/${id}`)
    .then(res => {
        if (!res.ok) throw new Error('Aluno não encontrado');
        return res.json();
    })
    .then(aluno => {
        document.getElementById('nomeAluno').value = aluno.nome + ' ' + aluno.sobrenome;
    })
    .catch(() => {
        document.getElementById('nomeAluno').value = 'Aluno não encontrado';
    });
});

document.getElementById('professor_id').addEventListener('blur', function() {
    let id = this.value;
    if (!id) return;

    fetch(`http://localhost:8081/professor/${id}`)
    .then(res => {
        if (!res.ok) throw new Error('Professor não encontrado');
        return res.json();
    })
    .then(professor => {
        document.getElementById('nomeProfessor').value = professor.nome + ' ' + professor.sobrenome;
    })
    .catch(() => {
        document.getElementById('nomeProfessor').value = 'Professor não encontrado';
    });
});

consultarID.addEventListener('click', function(e) {
    e.preventDefault();
    let saidaId = document.getElementById('codSaida').value;

    fetch(`http://localhost:8081/saida/${saidaId}`)
    .then(res => {
        if (!res.ok) throw new Error('Saída não encontrada');
        return res.json();
    })
    .then(saida => {
        document.getElementById('aluno_id').value = saida.aluno_id || '';
        document.getElementById('professor_id').value = saida.professor_id || '';
        document.getElementById('nomeAluno').value = saida.nomeAluno || '';
        document.getElementById('nomeProfessor').value = saida.nomeProfessor || '';
        document.getElementById('motivo').value = saida.motivo || '';
        document.getElementById('localDestino').value = saida.localDestino || '';
        if (document.getElementById('status')) {
            document.getElementById('status').value = saida.status || '';
        }
        document.getElementById('dataSolicitacao').value = saida.dataSolicitacao || '';
        document.getElementById('horaSaida').value = saida.horaSaida || '';
        document.getElementById('horaRetorno').value = saida.horaRetorno || '';

        res.innerText = 'Dados carregados com sucesso!';
    })
    .catch(() => {
        res.innerText = 'Erro ao carregar saída!';
    });
});

atualizarS.addEventListener('click', function(e) {
    e.preventDefault();

    let codSaida = document.getElementById('codSaida').value;
    let dados = {
        
        nomeAluno: document.getElementById('nomeAluno').value,
        nomeProfessor: document.getElementById('nomeProfessor').value,
        motivo: document.getElementById('motivo').value,
        localDestino: document.getElementById('localDestino').value,
        status: document.getElementById('status') ? document.getElementById('status').value : 'PENDENTE',
        dataSolicitacao: document.getElementById('dataSolicitacao').value,
        horaSaida: document.getElementById('horaSaida').value,
        horaRetorno: document.getElementById('horaRetorno').value
    };

    fetch(`http://localhost:8081/saida/${codSaida}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)
    })
    .then(res => {
        if (!res.ok) throw new Error('Erro ao atualizar saída');
        return res.json();
    })
    .then(() => {
        res.innerText = 'Saída atualizada com sucesso!';
    })
    .catch(() => {
        res.innerText = 'Erro ao atualizar saída!';
    });
});
