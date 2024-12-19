// ========== GERENCIAMENTO DO ACORDION ==========
function setupAccordion() {
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
      header.addEventListener('click', () => {
        const content = header.nextElementSibling;
  
        // Fecha todos os outros conteúdos antes de abrir o atual
        document.querySelectorAll('.accordion-content').forEach(item => {
          if (item !== content) {
            item.style.maxHeight = null;
          }
        });
  
        // Abre ou fecha o conteúdo clicado
        if (content.style.maxHeight) {
          content.style.maxHeight = null;
        } else {
          content.style.maxHeight = content.scrollHeight + 'px';
        }
      });
    });
  }
  
  // ========== EXIBIR INFORMAÇÕES DO USUÁRIO DINAMICAMENTE ==========
  function updateUserInfo(userInfo) {
    const profileImg = document.querySelector('.profile-img');
    const userName = document.querySelector('h1 span');
    const userJob = document.querySelector('.subtitle');
    const contactInfo = document.querySelector('.contact-info');
  
    if (profileImg) profileImg.src = userInfo.photo;
    if (userName) userName.textContent = userInfo.name;
    if (userJob) userJob.textContent = userInfo.job;
  
    if (contactInfo) {
      contactInfo.innerHTML = `
        <p>📍 ${userInfo.location}</p>
        <p>📞 ${userInfo.phone}</p>
        <p>📧 <a href="mailto:${userInfo.email}">${userInfo.email}</a></p>
      `;
    }
  }
  
  // ========== POPULAR LISTA DE SKILLS ==========
  function updateSkills(skills) {
    const skillsList = document.querySelector('.skills-list');
    const softSkillsList = document.querySelector('.soft-skills');
  
    if (skillsList && skills.hardSkills) {
      skillsList.innerHTML = skills.hardSkills.map(skill => 
        `<li>${skill}</li>`
      ).join('');
    }
  
    if (softSkillsList && skills.softSkills) {
      softSkillsList.innerHTML = skills.softSkills.map(skill => 
        `<li>${skill}</li>`
      ).join('');
    }
  }
  
  // ========== POPULAR PORTFOLIO ==========
  function updatePortfolio(portfolio) {
    const portfolioSection = document.querySelector('.portifolio');
    if (portfolioSection) {
      portfolioSection.innerHTML = portfolio.map(project => `
        <h2>
          <img src="./assets/logo_githb.png" alt="Logo GitHub" style="width: 24px; height: 24px; vertical-align: middle; margin-right: 8px;">
          ${project.name}
        </h2>
        <p>
          <a href="${project.url}" target="_blank" rel="noopener noreferrer">
            Acesse o projeto no GitHub
          </a>
        </p>
      `).join('');
    }
  }
  
  // ========== POPULAR EXPERIÊNCIAS PROFISSIONAIS ==========
  function updateProfessionalExperience(experiences) {
    const experienceList = document.querySelector('.profissional');
  
    if (experienceList) {
      experienceList.innerHTML = experiences.map(exp => 
        `<li>* ${exp.name} - ${exp.company}</li>`
      ).join('');
    }
  }
  
  // ========== FUNÇÃO PRINCIPAL ==========
  async function init() {
    // Configura o accordion
    setupAccordion();
  
    // Buscar dados do JSON via fetch
    const url = 'https://raw.githubusercontent.com/gesielr/pagina-de-portif-lio/refs/heads/main/data/profile.json';
  
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Não foi possível carregar o perfil');
      const data = await response.json();
  
      // Atualizar informações de usuário
      updateUserInfo({
        name: data.name,
        photo: data.photo,
        job: data.job,
        location: data.location,
        phone: data.phone,
        email: data.email
      });
  
      // Atualizar lista de skills
      updateSkills(data.skills);
  
      // Atualizar portfólio
      updatePortfolio(data.portfolio);
  
      // Atualizar experiência profissional
      updateProfessionalExperience(data.professionalExperience);
    } catch (error) {
      console.error('Erro ao buscar os dados do JSON:', error);
    }
  }
  
  // Inicia a função ao carregar a página
  document.addEventListener('DOMContentLoaded', init);
  