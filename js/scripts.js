window.onload = function () {
  // Define data mínima para o evento
  const hoje = new Date().toISOString().split("T")[0];
  document.getElementById("dataEvento").setAttribute("min", hoje);

  // Campo de busca
  document.getElementById('busca-produto').addEventListener('input', function() {
    const filtro = this.value.toLowerCase();
    const produtos = document.querySelectorAll('.produtos-grid .produto');

    produtos.forEach(produto => {
      const nome = produto.querySelector('.nome-produto').textContent.toLowerCase();
      produto.style.display = nome.includes(filtro) ? 'block' : 'none';
    });
  });

  // Função para carregar produtos do JSON
  fetch('produtos.json')
    .then(response => response.json())
    .then(produtos => {
        // ✅ Ordena os produtos por nome em ordem alfabética
      produtos.sort((a, b) => a.nome.localeCompare(b.nome));
      
      const container = document.querySelector('.produtos-grid');
      container.innerHTML = '';

      produtos.forEach(produto => {
        const div = document.createElement('div');
        div.classList.add('produto');
        div.innerHTML = `
          <img src="${produto.imagem}" alt="${produto.nome}" onclick="ampliarImagem('${produto.imagem}')">
          <p class="nome-produto">${produto.nome}</p>
          <p class="preco-produto">R$ ${produto.preco.toFixed(2)}</p>
          <button onclick="enviarPedido('${produto.nome}', ${produto.preco})">
            <i class="fa-solid fa-bag-shopping"></i> Alugar
          </button>
        `;
        container.appendChild(div);
      });
    })
    .catch(error => console.error('Erro ao carregar produtos:', error));
};

// Demais funções fora do onload (correto)
function enviarPedido(produto, preco) {
  const nome = document.getElementById('nome').value.trim();
  const endereco = document.getElementById('endereco').value.trim();
  const dataEvento = document.getElementById('dataEvento').value;

  if (!nome || !endereco || !dataEvento) {
    alert("Preencha seu nome, endereço e a data do evento antes de continuar.");
    return;
  }

  const confirmar = confirm("Deseja ser direcionado ao WhatsApp para finalizar o pedido?");
  if (confirmar) {
    const numero = "5587988664802";
    let mensagem = `Olá! Quero alugar:%0A- ${produto}: R$ ${preco.toFixed(2)}%0A%0A`;
    mensagem += `Nome: ${nome}%0AEndereço: ${endereco}%0AData do evento: ${dataEvento}`;
    window.open(`https://api.whatsapp.com/send?phone=${numero}&text=${mensagem}`, '_blank');
  }
}

function ampliarImagem(src) {
  const modal = document.getElementById('modal');
  const imgAmpliada = document.getElementById('imagem-ampliada');
  imgAmpliada.src = src;
  modal.style.display = 'flex';
}

function fecharModal(event) {
  if (event) event.stopPropagation();
  document.getElementById('modal').style.display = 'none';
}
