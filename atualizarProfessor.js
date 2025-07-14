let atualizarP = document.getElementById('atualizarP')
let consultarID = document.getElementById('consultarID')

consultarID.addEventListener('click', (e) =>{
    e.preventDefault()
    let codProfessor = document.getElementById('codProfessor').value;
    
    fetch(`http://localhost:8081/professor/${codProfessor}`)
    .then(res => {
        return res.json();
    })
    .then(dados => {
        console.log(dados);
        res.innerHTML = ''; 
    
        if (dados && dados.codProfessor) {
            document.getElementById('nome').value = dados.nome;
            document.getElementById('sobrenome').value = dados.sobrenome;
            document.getElementById('matricula').value = dados.matricula;
            document.getElementById('email').value = dados.email;
            document.getElementById('telefone').value = dados.telefone;
           
        } else {
            res.innerHTML = `<p>Nenhum professor encontrado com o id ${codProfessor}.</p>`;
        }
    })
    .catch((err) => {
        console.error('Erro ao listar professor:', err);
        res.innerText = `Não existe um professor cadastrado com esse id [${codProfessor}].`;
    });
})
atualizarP.addEventListener('click', (e) => {
    e.preventDefault();

    res.style.display = 'block';

    let codProfessor = document.getElementById('codProfessor').value;

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

    fetch(`http://localhost:8081/professor/${codProfessor}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dadosAtualizados)
    })
    .then(res => {
        if (!res.ok) {
            throw new Error('Erro ao atualizar professor');
        }
        return res.json();
    })
    .then(data => {
        console.log('Professor atualizado com sucesso:', data);
        res.innerText = 'Professor atualizado com sucesso!';
       
    })
    .catch((err) => {
        console.error('Erro ao atualizar professor:', err);
        res.innerText = 'Erro ao atualizar professor.';
        
    });
});
