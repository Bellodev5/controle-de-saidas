let res = document.getElementById('res');
let listarSaida = document.getElementById('listarSaida');
let listarSaidasID = document.getElementById('listarSaidasID');

listarSaida.addEventListener('click', (e) => {
    e.preventDefault();
    res.style.display = 'block'; 
    fetch('http://localhost:8081/saida')
        .then(response => response.json())
        .then(dados => {
            console.log(dados);
            res.innerHTML = ''; 

            if (dados.length > 0) {
                dados.forEach(dados => {
                    res.innerHTML += `<p>Aluno: ${dados.nomeAluno}</p><br>`;
                    res.innerHTML += `<p>Professor: ${dados.nomeProfessor}</p><br>`;
                    res.innerHTML += `<p>Destino: ${dados.localDestino}</p><br>`;
                    res.innerHTML += `<p>Data Solicitação: ${dados.dataSolicitacao}</p><br>`;
                    res.innerHTML += `<p>Hora Saída: ${dados.horaSaida}</p><br>`;
                    res.innerHTML += `<p>Hora retorno: ${dados.horaRetorno}</p><br>`;
                    res.innerHTML += `<p>Motivo: ${dados.motivo}</p><br><hr>`;
                });
            } else {
                res.innerHTML = '<p>Nenhuma saída encontrada.</p>';
            }
        })
        .catch((err) => {
            console.error('Erro ao listar saídas:', err);
            res.innerText = 'Erro ao listar saídas.';
        });
});

listarSaidasID.addEventListener('click', (e) => {
    e.preventDefault();
    res.style.display = 'block'; 

    let codSaida = document.getElementById('codSaida').value;

    fetch(`http://localhost:8081/saida/${codSaida}`)
        .then(response => response.json())
        .then(dados => {
            console.log(dados);
            res.innerHTML = ''; 

            if (dados && dados.codSaida) {
                res.innerHTML += `<p>Aluno: ${dados.nomeAluno}</p><br>`;
                res.innerHTML += `<p>Professor: ${dados.nomeProfessor}</p><br>`;
                res.innerHTML += `<p>Destino: ${dados.localDestino}</p><br>`;
                res.innerHTML += `<p>Data Solicitação: ${dados.dataSolicitacao}</p><br>`;
                res.innerHTML += `<p>Hora Saída: ${dados.horaSaida}</p><br>`;
                res.innerHTML += `<p>Hora retorno: ${dados.horaRetorno}</p><br>`;
                res.innerHTML += `<p>Motivo: ${dados.motivo}</p><br><hr>`;
            } else {
                res.innerHTML = `<p>Nenhuma saída encontrada com o ID ${codSaida}.</p>`;
            }
        })
        .catch((err) => {
            console.error('Erro ao listar saída:', err);
            res.innerText = `Não existe uma saída cadastrada com esse ID [${codSaida}].`;
        });
});
