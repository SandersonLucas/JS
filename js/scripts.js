window.onload = function () {
  // Define data mínima para o evento
  const hoje = new Date().toISOString().split("T")[0];
  document.getElementById("dataEvento").setAttribute("min", hoje);

  // Campo de busca
  document.getElementById('busca-produto').addEventListener('input', function () {
    const filtro = this.value.toLowerCase();
    const produtos = document.querySelectorAll('.produtos-grid .produto');

    produtos.forEach(produto => {
      const nome = produto.querySelector('.nome-produto').textContent.toLowerCase();
      produto.style.display = nome.includes(filtro) ? 'block' : 'none';
    });
  });

  // Carrega produtos
  fetch('produtos.json')
    .then(response => response.json())
    .then(produtos => {
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
        `;

        // Botão "Alugar" com evento
        const botao = document.createElement('button');
        botao.innerHTML = '<i class="fa-solid fa-bag-shopping"></i> Alugar';
       botao.addEventListener('click', () => {
       const url = `pedido.html?produto=${encodeURIComponent(produto.nome)}&preco=${encodeURIComponent(produto.preco)}`;
       window.open(url, '_blank');
       });


        div.appendChild(botao);
        container.appendChild(div);
      });
    })
    .catch(error => console.error('Erro ao carregar produtos:', error));
};

  const htmlResumo = `
    <html>
      <head>
        <title>Resumo do Pedido - JS Eventos</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; background: #f0f4f8; color: #333; }
          h1 { color: #27ae60; }
          .resumo { background: #fff; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1); }
          p { font-size: 18px; line-height: 1.4; }
          .botao-whatsapp {
            display: inline-block;
            margin-top: 20px;
            background-color: #25d366;
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            text-decoration: none;
            font-weight: bold;
            font-size: 16px;
          }
        </style>
      </head>
      <body>
        <h1>Resumo do Pedido</h1>
        <div class="resumo">
          <p><strong>Produto:</strong> ${produto}</p>
          <p><strong>Preço:</strong> R$ ${preco.toFixed(2)}</p>
          <p><strong>Nome:</strong> ${nome}</p>
          <p><strong>Endereço:</strong> ${endereco}</p>
          <p><strong>Data do Evento:</strong> ${dataEvento}</p>

          <a 
            href="https://api.whatsapp.com/send?phone=5587988664802&text=Olá! Quero alugar:%0A- ${encodeURIComponent(produto)}: R$ ${preco.toFixed(2)}%0A%0ANome: ${encodeURIComponent(nome)}%0AEndereço: ${encodeURIComponent(endereco)}%0AData do evento: ${encodeURIComponent(dataEvento)}" 
            target="_blank" 
            class="botao-whatsapp"
          >
            Finalizar pedido no WhatsApp
          </a>
        </div>
      </body>
    </html>
  `;

  const novaJanela = window.open('', '_blank');
  if (!novaJanela) {
    alert('Pop-up bloqueado! Por favor, permita pop-ups para este site.');
    return;
  }
  novaJanela.document.write(htmlResumo);
  novaJanela.document.close();
}

// Funções para modal de imagem (sem alteração)
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
