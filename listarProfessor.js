let res = document.getElementById('res');
let listarP = document.getElementById('listarP');
let listarProfessorID = document.getElementById('listarProfessorID');

listarP.addEventListener('click', (e) => {
    e.preventDefault();
    res.style.display = 'block'; 
    fetch('http://localhost:8081/professor')
        .then(res => res.json())
        .then(dados => {
            console.log(dados);
            res.innerHTML = ''; 

            if (dados.length > 0) {
                dados.forEach(dados => {
                    res.innerHTML += `<p>Nome: ${dados.nome}</p><br>`;
                    res.innerHTML += `<p>Sobrenome: ${dados.sobrenome}</p><br>`;
                    res.innerHTML += `<p>Matricula: ${dados.matricula}</p><br>`;
                    res.innerHTML += `<p>Telefone: ${dados.telefone}</p><br>`;
                    res.innerHTML += `<p>Email: ${dados.email}</p><br><hr>`;
                });
            } else {
                res.innerHTML = '<p>Nenhum professor encontrado.</p>';
            }
        })
        .catch((err) => {
            console.error('Erro ao listar professores:', err);
            alert('Erro ao listar professores');
            res.innerText = 'Erro ao listar professores.';
        });
});

listarProfessorID.addEventListener('click', (e) => {
    e.preventDefault()
    res.style.display = 'block'; 

    let codProfessor = document.getElementById('codProfessor').value;

    fetch(`http://localhost:8081/professor/${codProfessor}`)
        .then(res => res.json())
        .then(dados => {
            console.log(dados);
            res.innerHTML = ''; 

            if (dados && dados.nome) {
                res.innerHTML += `<p>Nome: ${dados.nome}</p><br>`;
                res.innerHTML += `<p>Sobrenome: ${dados.sobrenome}</p><br>`;
                res.innerHTML += `<p>Matricula: ${dados.matricula}</p><br>`;
                res.innerHTML += `<p>Email: ${dados.email}</p><br>`;
                res.innerHTML += `<p>Telefone: ${dados.telefone}</p><br><hr>`;
            } else {
                res.innerHTML = `<p>Nenhum professor encontrado com o id digitado [ ${codProfessor}  ].</p>`;
            }
        })
        .catch((err) => {
            console.error('Erro ao listar professor:', err);
            res.innerText = `Não existe um professor cadastrado com esse id [${codProfessor}].`;
        });
});
