let res = document.getElementById('res');
let cadastrarA = document.getElementById('cadastrarA');

cadastrarA.addEventListener('click', (e) => {
  e.preventDefault();

  let nome = document.getElementById('nome').value;
  let sobrenome = document.getElementById('sobrenome').value;
  let matricula = Number(document.getElementById('matricula').value);
  let telefone = document.getElementById('telefone').value;
  let email = document.getElementById('email').value;

  const informacoesAluno = {
    nome,
    sobrenome,
    matricula,
    telefone,
    email
  };

  console.log('Enviando:', informacoesAluno);

  fetch('http://localhost:8081/aluno', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(informacoesAluno)
  })
    .then(async (resposta) => {
      if (!resposta.ok) {
        throw new Error('Erro ao cadastrar');
      }

      const dados = await resposta.json();
      console.log('Resposta do servidor:', dados);
      res.style.display = 'block'; 
      res.innerText = 'Aluno cadastrado com sucesso!';
          })
    .catch((err) => {
      console.error('Erro ao cadastrar aluno:', err);
      res.style.display = 'block'; 
      res.innerText = 'Erro ao cadastrar aluno!';
          });
});
