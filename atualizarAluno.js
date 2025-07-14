let atualizarA = document.getElementById('atualizarA')
let consultarID = document.getElementById('consultarID')

consultarID.addEventListener('click', (e) =>{
    e.preventDefault()
    let codAluno = document.getElementById('codAluno').value;
    
    fetch(`http://localhost:8081/aluno/${codAluno}`)
    .then(res => {
        return res.json();
    })
    .then(dados => {
        console.log(dados);
        res.innerHTML = ''; 
    
        if (dados && dados.codAluno) {
            document.getElementById('nome').value = dados.nome;
            document.getElementById('sobrenome').value = dados.sobrenome;
            document.getElementById('matricula').value = dados.matricula;
            document.getElementById('email').value = dados.email;
            document.getElementById('telefone').value = dados.telefone;
           
        } else {
            res.innerHTML = `<p>Nenhum aluno encontrado com o id ${id}.</p>`;
        }
    })
    .catch((err) => {
        console.error('Erro ao listar aluno:', err);
        res.innerText = `Não existe um aluno cadastro com esse id [${id}].`;
    });
})
atualizarA.addEventListener('click', (e) => {
    e.preventDefault();

    res.style.display = 'block';

    let codAluno = document.getElementById('codAluno').value;

    let nome = document.getElementById('nome').value;
    let sobrenome = document.getElementById('sobrenome').value;
    let matricula = document.getElementById('matricula').value;
    let email = document.getElementById('email').value;
    let telefone = document.getElementById('telefone').value;

    const dadosAtualizados = {
        nome,
        sobrenome,
        matricula,
        email,
        telefone
    };

    fetch(`http://localhost:8081/aluno/${codAluno}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dadosAtualizados)
    })
    .then(res => {
        if (!res.ok) {
            throw new Error('Erro ao atualizar aluno');
        }
        return res.json();
    })
    .then(data => {
        console.log('Aluno atualizado com sucesso:', data);
        res.innerText = 'Aluno atualizado com sucesso!';
       
    })
    .catch((err) => {
        console.error('Erro ao atualizar aluno:', err);
        res.innerText = 'Erro ao atualizar aluno.';
        
    });
});
