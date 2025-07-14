let res = document.getElementById('res');
let apagarA = document.getElementById('apagarA');
let consultarA = document.getElementById('consultarA')
consultarA.addEventListener('click', (e) =>{
  e.preventDefault()
  let codAluno = document.getElementById('codAluno').value;
  res.style.display = 'block'; 

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
          } else {
          res.innerHTML = `<p>Nenhum aluno encontrado.</p>`;
      }
  })
  .catch((err) => {
      console.error('Erro ao listar aluno:', err);
      res.innerText = `Não existe um aluno cadastro com esse id.`;
  });
})
apagarA.addEventListener('click', (e) => {
  e.preventDefault()
    let codAluno = document.getElementById('codAluno').value;
    res.innertHTML = '';
    fetch(`http://localhost:8081/aluno/${codAluno}`, {
          method: 'DELETE'
        })
        .then(response => {
          if (response.ok) {
            res.innerText = `<p>Aluno deletado com sucesso.</p>`;
          } else {
            res.innerText = `<p>Erro ao deletar aluno.</p>`;
          }
        })
        .catch(error => console.error('Erro:', error));      
})