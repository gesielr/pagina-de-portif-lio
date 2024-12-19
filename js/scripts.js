if (typeof browser === 'undefined') {
  var browser = window.browser || window.chrome;
}


document.addEventListener("DOMContentLoaded", () => {
  const accordionHeaders = document.querySelectorAll(".accordion-header");

  console.log("Headers encontrados:", accordionHeaders);

  accordionHeaders.forEach((header) => {
    console.log("Adicionando evento ao header:", header.textContent);

    header.addEventListener("click", () => {
      console.log("Header clicado:", header.textContent);

      const accordionItem = header.parentElement;
      const accordionContent = accordionItem.querySelector(".accordion-content");

      console.log("Accordion Content:", accordionContent);

      // Fecha todos os outros itens
      document.querySelectorAll(".accordion-item").forEach((item) => {
        if (item !== accordionItem) {
          item.classList.remove("active");
          item.querySelector(".accordion-content").style.maxHeight = null;
        }
      });

      // Alternar o estado do item clicado
      accordionItem.classList.toggle("active");

      if (accordionItem.classList.contains("active")) {
        accordionContent.style.maxHeight = accordionContent.scrollHeight + "px"; // Expande
        console.log("Expande conteúdo");
      } else {
        accordionContent.style.maxHeight = null; // Recolhe
        console.log("Recolhe conteúdo");
      }
    });
  });
});
