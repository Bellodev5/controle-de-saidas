let res = document.getElementById('res');
let cadastrarP = document.getElementById('cadastrarP');

cadastrarP.addEventListener('click', (e) => {
  e.preventDefault();
  res.style.display = 'block'; 

  let nome = document.getElementById('nome').value;
  let sobrenome = document.getElementById('sobrenome').value;
  let matricula = Number(document.getElementById('matricula').value);
  let telefone = document.getElementById('telefone').value;
  let email = document.getElementById('email').value;

  const informacoesProfessor = {
    nome,
    sobrenome,
    matricula,
    telefone,
    email
  };

  console.log('Enviando:', informacoesProfessor);

  fetch('http://localhost:8081/professor', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(informacoesProfessor)
  })
    .then(async (resposta) => {
      if (!resposta.ok) {
        throw new Error('Erro ao cadastrar');
      }

      const dados = await resposta.json();
      console.log('Resposta do servidor:', dados);
      res.innerText = 'Professor cadastrado com sucesso!';
          })
    .catch((err) => {
      console.error('Erro ao cadastrar professor:', err);
      res.innerText = 'Erro ao cadastrar professor!';
          });
});
