document.addEventListener('DOMContentLoaded', function() {
  // Menu toggle para mobile
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('nav');
  const backToTopBtn = document.getElementById('backToTop');
  
  if (menuToggle && nav) {
    menuToggle.addEventListener('click', function() {
      nav.classList.toggle('hidden');
      nav.classList.toggle('flex');
      nav.classList.toggle('fixed');
      nav.classList.toggle('inset-0');
      nav.classList.toggle('bg-white');
      nav.classList.toggle('flex-col');
      nav.classList.toggle('items-center');
      nav.classList.toggle('justify-center');
      nav.classList.toggle('space-y-8');
      nav.classList.toggle('text-xl');
      nav.classList.toggle('z-40');
      
      // Animar ícone do menu
      const spans = menuToggle.querySelectorAll('span');
      if (nav.classList.contains('flex')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
      } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    });
  }
  
  // Botão Voltar ao Topo
  if (backToTopBtn) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 300) {
        backToTopBtn.classList.remove('hidden');
        backToTopBtn.classList.add('fade-in');
      } else {
        backToTopBtn.classList.add('hidden');
        backToTopBtn.classList.remove('fade-in');
      }
    });
    
    backToTopBtn.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
  
  // Fechar menu ao clicar em um link (mobile)
  const navLinks = document.querySelectorAll('nav a');
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      // Se for um link âncora, rolar suavemente
      if (this.getAttribute('href').startsWith('#')) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          // Fechar menu mobile se estiver aberto
          if (nav && nav.classList.contains('flex')) {
            nav.classList.add('hidden');
            nav.classList.remove('flex', 'fixed', 'inset-0', 'bg-white', 'flex-col', 'items-center', 'justify-center', 'space-y-8', 'text-xl', 'z-40');
            
            // Resetar ícone do menu
            if (menuToggle) {
              const spans = menuToggle.querySelectorAll('span');
              spans[0].style.transform = 'none';
              spans[1].style.opacity = '1';
              spans[2].style.transform = 'none';
            }
          }
          
          // Rolar suavemente para o elemento
          window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth'
          });
        }
      }
    });
  });
  
  // Header com efeito de scroll
  window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (header) {
      if (window.scrollY > 50) {
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
        header.style.padding = '0.75rem 0';
      } else {
        header.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.05)';
        header.style.padding = '1rem 0';
      }
    }
  });
  
  // Animar elementos ao rolar
  function animateOnScroll() {
    const elements = document.querySelectorAll('.card, .beneficio-item, .form-group');
    
    elements.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.2;
      
      if (elementPosition < screenPosition) {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }
    });
  }
  
  // Inicializar elementos com animação
  document.querySelectorAll('.card, .beneficio-item').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  });
  
  // Chamar animação ao carregar e ao rolar
  window.addEventListener('load', animateOnScroll);
  window.addEventListener('scroll', animateOnScroll);
  
  // Validação de formulário
  const contactForm = document.querySelector('form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      const nameInput = this.querySelector('input[name="name"]');
      const emailInput = this.querySelector('input[name="email"]');
      const messageInput = this.querySelector('textarea[name="message"]');
      let isValid = true;
      
      // Resetar estilos de erro
      [nameInput, emailInput, messageInput].forEach(input => {
        if (input) input.style.borderColor = '';
      });
      
      // Validar nome
      if (nameInput && !nameInput.value.trim()) {
        nameInput.style.borderColor = '#dc3545';
        isValid = false;
      }
      
      // Validar email
      if (emailInput) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value)) {
          emailInput.style.borderColor = '#dc3545';
          isValid = false;
        }
      }
      
      // Validar mensagem
      if (messageInput && !messageInput.value.trim()) {
        messageInput.style.borderColor = '#dc3545';
        isValid = false;
      }
      
      if (!isValid) {
        e.preventDefault();
        alert('Por favor, preencha todos os campos corretamente.');
      }
    });
  }
  
  // Log para debug
  console.log('Menu inicializado com sucesso');
});