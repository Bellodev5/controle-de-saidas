let res = document.getElementById('res');
let cadastrarSaida = document.getElementById('cadastrarSaida');

let aluno_id = document.getElementById('aluno_id');
let professor_id = document.getElementById('professor_id');
let nomeAluno = document.getElementById('nomeAluno');
let nomeProfessor = document.getElementById('nomeProfessor');
let motivo = document.getElementById('motivo');
let localDestino = document.getElementById('localDestino');
document.addEventListener('DOMContentLoaded', function() {
  const container = document.getElementById('listaProfessores');

  fetch('http://localhost:8081/professor')
    .then(res => {
      if (!res.ok) throw new Error('Erro ao carregar professores');
      return res.json();
    })
    .then(professores => {
      if (professores.length === 0) {
        container.textContent = 'Nenhum professor cadastrado.';
        return;
      }

      container.innerHTML = '';

      professores.forEach(prof => {
        const p = document.createElement('p');
        p.textContent = `ID: ${prof.codProfessor} - Nome: ${prof.nome} ${prof.sobrenome}`;
        container.appendChild(p);
      });
    })
    .catch(err => {
      container.textContent = 'Erro ao carregar professores.';
      console.error(err);
    });
});

aluno_id.addEventListener('blur', () => {
  let id = aluno_id.value;

  fetch(`http://localhost:8081/aluno/${id}`)
    .then(res => {
      if (!res.ok) throw new Error('Aluno não encontrado');
      return res.json();
    })
    .then(aluno => {
      nomeAluno.value = aluno.nome + ' ' + aluno.sobrenome;
      nomeAluno.classList.remove('input-invalido');
      nomeAluno.classList.add('input-valido');
    })
    .catch(err => {
      console.error(err);
      nomeAluno.value = 'Aluno não encontrado';
      nomeAluno.classList.remove('input-valido');
      nomeAluno.classList.add('input-invalido');
    });
});





professor_id.addEventListener('blur', () => {
  let id = professor_id.value;

  fetch(`http://localhost:8081/professor/${id}`)
    .then(res => {
      if (!res.ok) throw new Error('Professor não encontrado');
      return res.json();
    })
    .then(professor => {
      nomeProfessor.value = professor.nome + ' ' + professor.sobrenome;
      nomeProfessor.classList.remove('input-invalido');
      nomeProfessor.classList.add('input-valido');
    })
    .catch(err => {
      console.error(err);
      nomeProfessor.value = 'Professor não encontrado';
      nomeProfessor.classList.remove('input-valido');
      nomeProfessor.classList.add('input-invalido');
    });
});

cadastrarSaida.addEventListener('click', (e) => {
  e.preventDefault();

  res.style.display = 'block';

  const status = 'pendente';

  if (
    nomeAluno.value === 'Aluno não encontrado' ||
    nomeProfessor.value === 'Professor não encontrado'
  ) {
    res.innerText = 'Erro: Verifique os códigos informados. Aluno ou professor não encontrado.';
    return;
  }
  const valores = {
    motivo: motivo.value,
    localDestino: localDestino.value,
    status: status,
    aluno_cod: aluno_id.value,
    professor_cod: professor_id.value,
    nomeAluno: nomeAluno.value,
    nomeProfessor: nomeProfessor.value,
    dataSolicitacao: document.getElementById('dataSolicitacao').value,
    horaSaida: document.getElementById('horaSaida').value,
    horaRetorno:document.getElementById('dataSolicitacao').value
  };
  

  console.log('--------------');
  console.log(valores);
  console.log('--------------');

  fetch('http://localhost:8081/saida', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(valores)
  })
    .then(resp => {
      if (!resp.ok) throw new Error(`Erro HTTP! Status: ${resp.status}`);
      return resp.json();
    })
    .then(dados => {
      console.log(dados);
      res.innerText = 'Saída cadastrada com sucesso!';
    })
    .catch((err) => {
      console.error(err);
      res.innerText = 'Erro ao gravar a saída. Tente novamente.';
    });
});
