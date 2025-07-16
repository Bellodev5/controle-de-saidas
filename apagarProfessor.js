let res = document.getElementById('res');
let apagarP = document.getElementById('apagarP');
let consultarP = document.getElementById('consultarP')
consultarP.addEventListener('click', (e) =>{
  e.preventDefault()
  let codProfessor = document.getElementById('codProfessor').value;
  
  fetch(`http://localhost:8081/professor/${codProfessor}`)
  .then(res => {
      return res.json();
  })
  .then(dados => {
      console.log(dados);
    res.style.display = 'block';
  
      if (dados && dados.codProfessor) {
          document.getElementById('nome').value = dados.nome;
          document.getElementById('sobrenome').value = dados.sobrenome;
          document.getElementById('matricula').value = dados.matricula;    
          } else {
          res.innerHTML = `<p>Nenhum professor encontrado.</p>`;
      }
  })
  .catch((err) => {
      console.error('Erro ao listar professor:', err);
      res.innerText = `Não existe um professor cadastro com esse id.`;
  });
})
apagarP.addEventListener('click', (e) => {
  e.preventDefault()
    let codProfessor = document.getElementById('codProfessor').value;
    res.style.display = 'block';
    fetch(`http://localhost:8081/professor/${codProfessor}`, {
          method: 'DELETE'
        })
        .then(response => {
          if (response.ok) {
            res.innerHTML += `<p>Professor deletado.</p>`;
          } else {
            res.innerHTML += `<p>Erro ao deletar professor.</p>`;
          }
        })
        .catch(error => console.error('Erro:', error));      
})
