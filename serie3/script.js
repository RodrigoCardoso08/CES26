$(document).ready(function() {
    let selectedElement = null;
  
    // 1) Selecionar elemento com o mouse
    $('#root').on('click', 'div', function(event) {
      event.stopPropagation(); // Para evitar a propagação do evento para elementos pais
  
      if (selectedElement) {
        $(selectedElement).removeClass('selected');
      }
  
      selectedElement = this;
      $(selectedElement).addClass('selected');
    });
  
    // 2) Remover elemento selecionado
    $('#remove').click(function() {
      if (selectedElement) {
        $(selectedElement).remove();
        selectedElement = null;
      }
    });
  
    // 3) Adicionar um novo filho ao elemento selecionado
    $('#add').click(function() {
      if (selectedElement) {
        $(selectedElement).append('<div>Novo Elemento</div>');
      }
    });
  
    // 4) Mudar propriedades do elemento selecionado (exemplo: cor de fundo)
    $('#change').click(function() {
      if (selectedElement) {
        const newColor = prompt('Digite a nova cor de fundo:', 'blue');
        $(selectedElement).css('background-color', newColor);
      }
    });
  });
  