document.addEventListener("DOMContentLoaded", () => {
  const accordionHeaders = document.querySelectorAll(".accordion-header");

  // Inicializa o estado do acordeão na carga da página
  const initializeAccordion = () => {
    document.querySelectorAll(".accordion-item").forEach((item) => {
      item.classList.remove("active"); // Garante que nenhum item esteja ativo inicialmente
      const content = item.querySelector(".accordion-content");
      if (content) content.style.maxHeight = null; // Garante que o conteúdo começa recolhido
    });
  };

  // Inicializa o acordeão ao carregar a página
  initializeAccordion();

  // Adiciona eventos de clique aos cabeçalhos do acordeão
  accordionHeaders.forEach((header) => {
    header.addEventListener("click", () => {
      const accordionItem = header.parentElement;
      const accordionContent = accordionItem.querySelector(".accordion-content");

      // Verifica se o item está ativo
      const isActive = accordionItem.classList.contains("active");

      // Fecha todos os itens
      document.querySelectorAll(".accordion-item").forEach((item) => {
        item.classList.remove("active");
        const content = item.querySelector(".accordion-content");
        if (content) content.style.maxHeight = null; // Recolhe
      });

      // Se o item clicado não estava ativo, expande-o
      if (!isActive) {
        accordionItem.classList.add("active");
        if (accordionContent) {
          accordionContent.style.maxHeight = accordionContent.scrollHeight + "px"; // Expande
        }
      }
    });
  });

  // Ajusta comportamento ao redimensionar a janela
  window.addEventListener("resize", () => {
    const isSmallDevice = window.innerWidth <= 768;

    if (isSmallDevice) {
      document.querySelectorAll(".accordion-item").forEach((item) => {
        item.classList.remove("active"); // Garante que todos os itens começam recolhidos
        const content = item.querySelector(".accordion-content");
        if (content) content.style.maxHeight = null; // Garante que começam recolhidos
      });
    }
  });
});
