let res = document.getElementById('res');
let apagarS = document.getElementById('apagarS');
let consultarS = document.getElementById('consultarS')
consultarS.addEventListener('click', (e) =>{
  e.preventDefault()
  let codSaida = document.getElementById('codSaida').value;
  
  fetch(`http://localhost:8081/saida/${codSaida}`)
  .then(res => {
      return res.json();
  })
  .then(dados => {
      console.log(dados);
      res.innerHTML = ''; 
  
      if (dados && dados.codSaida) {
          document.getElementById('nome').value = dados.nome;
          document.getElementById('motivo').value = dados.motivo;
          document.getElementById('local').value = dados.local;    
          } else {
          res.innerHTML = `<p>Nenhuma saida encontrada.</p>`;
      }
  })
  .catch((err) => {
      console.error('Erro ao listar saidas:', err);
      res.innerText = `Não existe uma saida cadastrada com esse id.`;
  });
})
apagarS.addEventListener('click', (e) => {
  e.preventDefault()
    let codSaida = document.getElementById('codSaida').value;
    res.innertHTML = '';
    res.style.display = 'block';

    fetch(`http://localhost:8081/saida/${codSaida}`, {
          method: 'DELETE'
        })
        .then(response => {
          if (response.ok) {
            res.innerHTML += `<p>Saída deletada com sucesso.</p>`;
          } else {
            res.innerHTML += `<p>Erro ao deletar saída'.</p>`;
          }
        })
        .catch(error => console.error('Erro:', error));      
})