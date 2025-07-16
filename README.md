# 📌 [Controle de Saídas](https://controle-de-saidas-sigma.vercel.app/)

Sistema web para gerenciar solicitações de saída de alunos em ambiente escolar. Desenvolvido com foco em organização, supervisão e agilidade entre alunos, professores e responsáveis pela liberação.

---

## ⚙️ Funcionalidades
- Cadastro de professores, alunos e saidas
- Listagem de saídas cadastradas
- Atualização de status da saída (`pendente`, `aceita`, `recusada`)
- Associação de aluno e professor por nome
- Ordenação das saídas da mais recente para a mais antiga (baseado no `codSaida`)

---

## 💡 Tecnologias Utilizadas

- **Frontend:** HTML, CSS e JavaScript
- **Backend:** Java (Spring Boot)
- **Banco de Dados:** API REST conectada ao banco (detalhes no repositório backend)
- **Versionamento:** Git

---

## 🧠 Novo conhecimento técnico: Uso de `Promise.all()` -> array de promessas

Uma parte interessante do projeto é a atualização de status das saídas, onde é necessário obter os IDs do aluno e do professor **ao mesmo tempo** antes de fazer o PUT.
Usei o método `Promise.all()` com um **array de promessas**:

```javascript
Promise.all([
  buscarIdAluno(saida.nomeAluno),        // ← retorna uma promessa com o ID do aluno
  buscarIdProfessor(saida.nomeProfessor) // ← retorna uma promessa com o ID do professor
])
.then(([aluno_cod, professor_cod]) => {
  // ambos os IDs estão prontos aqui
  // agora podemos enviar a atualização para o servidor
});
Esse array é passado para Promise.all(), que:
Espera as duas promessas terminarem,
E retorna os dois resultados juntos, em um array: [aluno_cod, professor_cod]
Foi necessário fazer isso pois no front-end, o que tem inicialmente é apenas o nome completo de alunos ou professor (ex: "Guilherme Bello"), e não os códigos numéricos.
