document.addEventListener('DOMContentLoaded', () => {
    const filaSaidas = document.getElementById('filaSaidas');

    fetch('http://localhost:8081/saida')
      .then(res => {
        if (!res.ok) throw new Error('Erro ao buscar saídas');
        return res.json();
      })
      .then(saidas => {
        const pendentes = saidas.filter(s => s.status.toLowerCase() === 'pendente');
  
        if (pendentes.length === 0) {
          filaSaidas.innerHTML = '<p>Nenhuma saída pendente.</p>';
          return;
        }
  
        filaSaidas.innerHTML = '';
        pendentes.forEach(saida => {
          const div = document.createElement('div');
          div.classList.add('item-fila');
  
          div.innerHTML = `
            <p><strong>Aluno:</strong> ${saida.nomeAluno}</p>
            <p><strong>Local Destino:</strong> ${saida.localDestino}</p>
            <p><strong>Motivo:</strong> ${saida.motivo}</p>
            <hr>
          `;
  
          filaSaidas.appendChild(div);
        });
      })
      .catch(err => {
        console.error(err);
        filaSaidas.innerHTML = '<p>Erro ao carregar fila.</p>';
      });
  });
  