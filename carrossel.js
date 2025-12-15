document.addEventListener('DOMContentLoaded', function() {
  console.log('🚀 Inicializando carrossel organizado...');
  
  const pancs = [
    {
      id: 1,
      nome: "Ora-pro-nóbis",
      nomeCientifico: "Pereskia aculeata",
      descricao: "Conhecida como 'carne dos pobres', é extremamente rica em proteínas (25%), ferro e vitaminas A e C. Suas folhas são versáteis e podem ser usadas em refogados, sopas, farofas e até massas.",
      beneficios: ["Alto teor proteico", "Rica em ferro", "Fonte de vitamina C", "Versátil na culinária"],
      imagem: "imagens/ora-pro-nobis.webp",
      tags: ["Proteica", "Ferro", "Versátil", "Perene"]
    },
    {
      id: 2,
      nome: "Taioba",
      nomeCientifico: "Xanthosoma sagittifolium",
      descricao: "Folhas verde-escuras ricas em vitaminas A, C e complexo B. Deve ser cozida para remover cristais de oxalato de cálcio. Ideal para refogados, sopas e acompanhamentos.",
      beneficios: ["Rica em vitamina A", "Boa fonte de fibras", "Baixo teor calórico", "Fácil cultivo"],
      imagem: "imagens/taioba.webp",
      tags: ["Vitamina A", "Fibrosa", "Refogados", "Tropical"]
    },
    {
      id: 3,
      nome: "Beldroega",
      nomeCientifico: "Portulaca oleracea",
      descricao: "Considerada um 'superfood', contém ômega-3, antioxidantes e minerais essenciais. Ideal para saladas frescas, sucos detox e refogados leves.",
      beneficios: ["Ômega-3 natural", "Antioxidante", "Rica em minerais", "Crescimento rápido"],
      imagem: "imagens/beldroega.webp",
      tags: ["Ômega-3", "Antioxidante", "Saladas", "Anual"]
    },
    {
      id: 4,
      nome: "Capuchinha",
      nomeCientifico: "Tropaeolum majus",
      descricao: "Toda a planta é comestível: flores, folhas e sementes. Tem sabor picante similar ao agrião e propriedades medicinais antibacterianas.",
      beneficios: ["Antibacteriana", "Rica em vitamina C", "Comestível inteira", "Ornamental"],
      imagem: "imagens/capuchinha.jpg",
      tags: ["Flor comestível", "Picante", "Medicinal", "Ornamental"]
    },
    {
      id: 5,
      nome: "Azedinha",
      nomeCientifico: "Rumex acetosa",
      descricao: "Folhas com sabor ácido refrescante, ricas em vitamina C e propriedades diuréticas. Perfeita para saladas, molhos verdes e chás detox.",
      beneficios: ["Rica em vitamina C", "Diurética", "Sabor ácido único", "Detox natural"],
      imagem: "imagens/azedinha.jpg",
      tags: ["Ácida", "Vitamina C", "Detox", "Perene"]
    },
    {
      id: 6,
      nome: "Bertalha",
      nomeCientifico: "Basella alba",
      descricao: "Trepadeira de folhas suculentas e mucilaginosas. Rico em vitaminas A e C, ideal para sopas cremosas, refogados e preparos que necessitam de consistência.",
      beneficios: ["Mucilaginosa", "Vitaminas A e C", "Fácil cultivo", "Trepadeira"],
      imagem: "imagens/bertalha.webp",
      tags: ["Mucilagem", "Trepadeira", "Sopas", "Tropical"]
    },
    {
      id: 7,
      nome: "Caruru",
      nomeCientifico: "Amaranthus spp.",
      descricao: "Considerada 'superfood' ancestral, rica em proteínas, cálcio, ferro e aminoácidos essenciais. Folhas e sementes são comestíveis.",
      beneficios: ["Alta proteína", "Rico em cálcio", "Sementes comestíveis", "Resistente"],
      imagem: "imagens/caruru.jpg",
      tags: ["Proteico", "Cálcio", "Ancestral", "Resistente"]
    }
  ];

  const carrossel = document.getElementById('pancCarrossel');
  const indicatorsContainer = document.getElementById('carrosselIndicators');
  const prevBtn = document.querySelector('.carrossel-btn.prev');
  const nextBtn = document.querySelector('.carrossel-btn.next');
  const carrosselContainer = carrossel ? carrossel.closest('.carrossel-container') : null;

  const baseCount = pancs.length; 
  const totalSlides = Math.ceil(baseCount / 3); 
  let cardWidth = 0; 
  let gap = 24;
  let currentIndex = baseCount + 2; 

  let items = [...pancs, ...pancs, ...pancs];

  function initCarrossel() {
    if (!carrossel) {
      console.error('❌ Elemento #pancCarrossel não encontrado!');
      return;
    }

    console.log(`✅ Carregando ${pancs.length} PANCs no carrossel`);
    createCards();
    createIndicators();
    addSlideCounter();
    setupEventListeners();
    startAutoPlay();
  }

  function createCards() {
    carrossel.innerHTML = '';
    
    items.forEach((panc, index) => {
      const card = document.createElement('div');
      card.className = 'panc-card';
      card.dataset.index = index;
      card.dataset.realIndex = index % baseCount;
      card.setAttribute('role', 'button');
      card.setAttribute('tabindex', '0');
      card.setAttribute('aria-label', `Ver detalhes sobre ${panc.nome}`);
      
      if (index === currentIndex) {
        card.classList.add('active');
      }
      
      card.innerHTML = `
        <div class="panc-imagem-container">
          <img src="${panc.imagem}" 
               alt="${panc.nome}" 
               class="panc-imagem"
               loading="lazy"
               onerror="this.onerror=null; this.src='https://via.placeholder.com/400x300/4CAF50/FFFFFF?text=${encodeURIComponent(panc.nome)}'">
        </div>
        <div class="panc-info">
          <h4 class="panc-nome" title="${panc.nome}">${panc.nome}</h4>
          <p class="panc-nome-cientifico">${panc.nomeCientifico}</p>
          <p class="panc-descricao">${panc.descricao}</p>
          <div class="panc-tags">
            ${panc.tags.map(tag => `<span class="panc-tag">${tag}</span>`).join('')}
          </div>
        </div>
      `;
      
      card.addEventListener('click', () => setActiveCard(index));
      card.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setActiveCard(index);
        }
      });
      
      carrossel.appendChild(card);
    });
    
    measureSizes();
    updateCarrossel(false);
    
    setTimeout(() => {
      measureSizes();
      updateCarrossel(false);
    }, 100);
  }

  function createIndicators() {
    if (!indicatorsContainer) return;
    
    indicatorsContainer.innerHTML = '';
    
    for (let i = 0; i < totalSlides; i++) {
      const indicator = document.createElement('div');
      indicator.className = 'indicator';
      indicator.setAttribute('role', 'button');
      indicator.setAttribute('tabindex', '0');
      indicator.setAttribute('aria-label', `Ir para slide ${i + 1}`);
      
      if (i === Math.floor((currentIndex % baseCount) / 3)) {
        indicator.classList.add('active');
      }
      
      indicator.dataset.slide = i;
      indicator.addEventListener('click', () => goToSlide(i));
      indicator.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          goToSlide(i);
        }
      });
      
      indicatorsContainer.appendChild(indicator);
    }
  }

  function addSlideCounter() {
    if (!carrosselContainer) return;
    
    const existingCounter = carrosselContainer.querySelector('.carrossel-counter');
    if (existingCounter) existingCounter.remove();
    
    const counter = document.createElement('div');
    counter.className = 'carrossel-counter';
    updateSlideCounter(counter);
    carrosselContainer.appendChild(counter);
  }

  function updateSlideCounter(counter) {
    if (!counter) return;
    const currentSlide = Math.floor((currentIndex % baseCount) / 3) + 1;
    counter.textContent = `${currentSlide} / ${totalSlides}`;
  }

  function measureSizes() {
    const firstCard = carrossel.querySelector('.panc-card');
    if (!firstCard) return;
    const style = window.getComputedStyle(carrossel);
    gap = parseFloat(style.gap || style.columnGap || 24);
    cardWidth = firstCard.getBoundingClientRect().width;
  }

  function updateCarrossel(animate = true) {
    measureSizes();
    const wrapperRect = carrossel.parentElement.getBoundingClientRect();
    const centerOffset = wrapperRect.width / 2 - cardWidth / 2;
    const translateX = centerOffset - currentIndex * (cardWidth + gap);

    if (!animate) {
      carrossel.style.transition = 'none';
      carrossel.style.transform = `translateX(${translateX}px)`;
      void carrossel.offsetWidth;
      carrossel.style.transition = '';
    } else {
      carrossel.style.transform = `translateX(${translateX}px)`;
    }

    document.querySelectorAll('.panc-card').forEach((card, index) => {
      const isActive = index === currentIndex;
      card.classList.toggle('active', isActive);
      card.setAttribute('aria-selected', isActive);
    });

    if (indicatorsContainer) {
      const currentSlide = Math.floor((currentIndex % baseCount) / 3);
      document.querySelectorAll('.indicator').forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentSlide);
      });
    }

    const counter = document.querySelector('.carrossel-counter');
    if (counter) updateSlideCounter(counter);

    console.log(`📌 Card ativo: ${pancs[currentIndex % baseCount]?.nome || 'Nenhum'} (Slide: ${Math.floor((currentIndex % baseCount) / 3) + 1}/${totalSlides})`);
  }

  function setActiveCard(index) {
    const real = index % baseCount;
    currentIndex = baseCount + real;
    updateCarrossel();
  }

  function goToSlide(slideIndex) {
    currentIndex = baseCount + slideIndex * 3;
    updateCarrossel();
  }

  function goPrev() {
    currentIndex--;
    updateCarrossel();
  }

  function goNext() {
    currentIndex++;
    updateCarrossel();
  }

  function setupEventListeners() {
    if (prevBtn) {
      prevBtn.addEventListener('click', goPrev);
    }
    
    if (nextBtn) {
      nextBtn.addEventListener('click', goNext);
    }
    
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
    });
    
    setupSwipe();
    
    carrossel.addEventListener('transitionend', () => {
      if (currentIndex < baseCount) {
        currentIndex += baseCount;
        updateCarrossel(false);
      } else if (currentIndex >= baseCount * 2) {
        currentIndex -= baseCount;
        updateCarrossel(false);
      }
    });
    
    window.addEventListener('resize', () => {
      measureSizes();
      updateCarrossel(false);
    });
  }

  function setupSwipe() {
    let touchStartX = 0;
    let touchEndX = 0;
    const swipeThreshold = 50;

    carrossel.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    carrossel.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });

    function handleSwipe() {
      const diff = touchStartX - touchEndX;
      
      if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
          goNext();
        } else {
          goPrev();
        }
      }
    }
  }

  let autoPlayInterval;
  
  function startAutoPlay() {
    if (autoPlayInterval) clearInterval(autoPlayInterval);
    autoPlayInterval = setInterval(goNext, 5000);
    
    const pauseAutoPlay = () => {
      clearInterval(autoPlayInterval);
    };
    
    const resumeAutoPlay = () => {
      if (autoPlayInterval) clearInterval(autoPlayInterval);
      autoPlayInterval = setInterval(goNext, 5000);
    };
    
    carrossel.addEventListener('mouseenter', pauseAutoPlay);
    carrossel.addEventListener('mouseleave', resumeAutoPlay);
    carrossel.addEventListener('focusin', pauseAutoPlay);
    carrossel.addEventListener('focusout', resumeAutoPlay);
    carrossel.addEventListener('touchstart', pauseAutoPlay);
    
    carrossel.addEventListener('touchend', () => {
      setTimeout(resumeAutoPlay, 10000);
    });
  }

  initCarrossel();
  console.log('✅ Carrossel organizado inicializado com sucesso!');
});