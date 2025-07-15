let res = document.getElementById('res');
let apagarA = document.getElementById('apagarA');
let consultarA = document.getElementById('consultarA')
consultarA.addEventListener('click', (e) =>{
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
          document.getElementById('nome').value = dados.nome
          document.getElementById('sobrenome').value = dados.sobrenome
          document.getElementById('matricula').value = dados.matricula  
          } else {
          res.innerHTML = `Nenhum aluno encontrado.`
      }
  })
  .catch((err) => {
      console.error('Erro ao listar aluno:', err);
      res.innerText = `Não existe um aluno cadastro com esse id.`
  });
})
apagarA.addEventListener('click', (e) => {
  e.preventDefault()
    let codAluno = document.getElementById('codAluno').value;
    res.style.display = 'block'; 
    fetch(`http://localhost:8081/aluno/${codAluno}`, {
          method: 'DELETE'
        })
        .then(response => {
          if (response.ok) {
            res.innerText = `Aluno deletado com sucesso.`;
          } else {
            res.innerText = `Erro ao deletar aluno.`;
          }
        })
        .catch(error => console.error('Erro:', error));      
})