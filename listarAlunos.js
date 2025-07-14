let res = document.getElementById('res');
let listarA = document.getElementById('listarA');
let listarAlunoID = document.getElementById('listarAlunoID');

listarA.addEventListener('click', (e) => {
    e.preventDefault();
    res.style.display = 'block'; 
    fetch('http://localhost:8081/aluno')
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
                res.style.display = 'block'; 
                res.innerHTML = '<p>Nenhum aluno encontrado.</p>';
            }
        })
        .catch((err) => {
            console.error('Erro ao listar alunos:', err);
            alert('Erro ao listar alunos');
            res.innerText = 'Erro ao listar alunos.';
        });
});

listarAlunoID.addEventListener('click', (e) => {
    e.preventDefault()
    let codAluno = document.getElementById('codAluno').value;

    fetch(`http://localhost:8081/aluno/${codAluno}`)
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
                res.innerHTML = `<p>Nenhum aluno encontrado com o id ${codAluno}.</p>`;
            }
        })
        .catch((err) => {
            console.error('Erro ao listar aluno:', err);
            res.innerText = `Não existe um aluno cadastrado com esse id [${codAluno}].`;
        });
});
