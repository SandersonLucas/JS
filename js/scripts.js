window.onload = function() {
  
function enviarPedido(produto, preco) {
      let nome = document.getElementById('nome').value.trim();
      let endereco = document.getElementById('endereco').value.trim();
     let dataEvento = document.getElementById('dataEvento').value;

  if (!nome || !endereco || !dataEvento) {
     alert("Preencha seu nome, endereço e a data do evento antes de continuar.");
  return;
}

      const confirmar = confirm("Deseja ser direcionado ao WhatsApp para finalizar o pedido?");
      if (confirmar) {
        let numero = "5587988664802";
        let mensagem = `Olá! Quero alugar:%0A- ${produto}: R$ ${preco.toFixed(2)}%0A%0A`;
        mensagem += `Nome: ${nome}%0A`;
        mensagem += `Endereço: ${endereco}%0A`;
       mensagem += `Data do evento: ${dataEvento}`;
        
        let link = `https://api.whatsapp.com/send?phone=${numero}&text=${mensagem}`;
        window.open(link, '_blank');
      }
    }
    
      // Quando clica na imagem do produto
function ampliarImagem(src) {
  const modal = document.getElementById('modal');
  const imgAmpliada = document.getElementById('imagem-ampliada');
  imgAmpliada.src = src;
  modal.style.display = 'flex';
}

// Quando clica fora da imagem (fecha o modal)
function fecharModal() {
  document.getElementById('modal').style.display = 'none';
    }

    function fecharModal(event) {
  if (event) event.stopPropagation();
  document.getElementById('modal').style.display = 'none';
}

  window.onload = function () {
    const hoje = new Date().toISOString().split("T")[0];
    document.getElementById("dataEvento").setAttribute("min", hoje);
  };

document.getElementById('busca-produto').addEventListener('input', function() {
  const filtro = this.value.toLowerCase();
  const produtos = document.querySelectorAll('.produtos-grid .produto');

  produtos.forEach(produto => {
    const nome = produto.querySelector('.nome-produto').textContent.toLowerCase();
    if (nome.includes(filtro)) {
      produto.style.display = 'block';
    } else {
      produto.style.display = 'none';
    }
  });
});
}
