

// URL do arquivo JSON no repositório GitHub
const jsonUrl = 'https://raw.githubusercontent.com/gesielr/pagina-de-portif-lio/refs/heads/main/data/profile.json';

// Função para buscar e exibir os dados do arquivo JSON
async function fetchProfileData() {
  try {
    // Realiza o fetch da URL
    const response = await fetch(jsonUrl);
    
    // Verifica se a resposta está OK (status 200)
    if (!response.ok) {
      throw new Error(`Erro ao buscar o JSON: ${response.status} - ${response.statusText}`);
    }

    // Converte a resposta em formato JSON
    const data = await response.json();

    // Exibe o conteúdo do JSON no console
    console.log('Dados do Perfil:', data);

    // Função para exibir as informações na página
    displayProfileData(data);
  } catch (error) {
    console.error('Erro ao buscar os dados do perfil:', error);
  }
}

// Função para exibir os dados do JSON no HTML (exemplo prático)
function displayProfileData(data) {
  // Exemplo de atualização de conteúdo HTML
  const profileSection = document.getElementById('profile');

  // Verifica se o elemento de destino existe
  if (profileSection) {
    profileSection.innerHTML = `
      <img src="${data.photo}" alt="Foto de ${data.name}" class="profile-photo">
      <h1>${data.name}</h1>
      <p>${data.job}</p>
      <p>📍 ${data.location}</p>
      <p>📞 ${data.phone}</p>
      <p>📧 <a href="mailto:${data.email}">${data.email}</a></p>
    `;

    // Adiciona skills (hard e soft) no HTML
    const skillsSection = document.getElementById('skills');
    if (skillsSection && data.skills) {
      const hardSkills = data.skills.hardSkills.map(skill => 
        `<li><img src="${skill.logo}" alt="${skill.name}" class="skill-logo"> ${skill.name}</li>`
      ).join('');

      const softSkills = data.skills.softSkills.map(skill => 
        `<li>${skill}</li>`
      ).join('');

      skillsSection.innerHTML = `
        <h2>Hard Skills</h2>
        <ul>${hardSkills}</ul>
        <h2>Soft Skills</h2>
        <ul>${softSkills}</ul>
      `;
    }

    // Adiciona o portfólio na página
    const portfolioSection = document.getElementById('portfolio');
    if (portfolioSection && data.portfolio) {
      const portfolioItems = data.portfolio.map(project => 
        `<li><a href="${project.url}" target="_blank">${project.name}</a></li>`
      ).join('');

      portfolioSection.innerHTML = `
        <h2>Portfolio</h2>
        <ul>${portfolioItems}</ul>
      `;
    }
  }
}

// Executa a função ao carregar a página
document.addEventListener('DOMContentLoaded', fetchProfileData);
