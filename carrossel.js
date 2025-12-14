// carrossel.js - Script organizado para o carrossel
document.addEventListener('DOMContentLoaded', function() {
  console.log('🚀 Inicializando carrossel organizado...');
  
  // Dados das PANCs com informações completas
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

  // Elementos do DOM
  const carrossel = document.getElementById('pancCarrossel');
  const indicatorsContainer = document.getElementById('carrosselIndicators');
  const prevBtn = document.querySelector('.carrossel-btn.prev');
  const nextBtn = document.querySelector('.carrossel-btn.next');

  // Configurações
  const baseCount = pancs.length; // número de PANCs originais
  const cardsPerView = 5;
  const totalSlides = Math.ceil(baseCount / 3); // 3 cards por slide
  let cardWidth = 0; // será medido dinamicamente
  let gap = 24;
  let currentIndex = baseCount + 2; // começar no segmento do meio para facilitar loop infinito

  // Duplicar itens para permitir loop infinito visual (prático)
  let items = [...pancs, ...pancs, ...pancs];

  // Inicializar carrossel
  function initCarrossel() {
    if (!carrossel) {
      console.error('❌ Elemento #pancCarrossel não encontrado!');
      return;
    }

    console.log(`✅ Carregando ${pancs.length} PANCs no carrossel`);
    createCards();
    createIndicators();
    setupEventListeners();
    startAutoPlay();
  }

  // Criar cards
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
      
      // Ativar card inicial
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
          <h4 class="panc-nome" title="${panc.nome}">${panc.nome.replace(/-/g, '\u2011')}</h4>
          <p class="panc-descricao">${panc.descricao}</p>
          <div class="panc-tags">
            ${panc.tags.map(tag => `<span class="panc-tag">${tag}</span>`).join('')}
          </div>
        </div>
      `;
      
      // Eventos do card
      card.addEventListener('click', () => setActiveCard(index));
      card.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setActiveCard(index);
        }
      });
      
      carrossel.appendChild(card);

      // Re-medir quando a imagem carregar ou falhar, para evitar reposicionamento incorreto
      const imgEl = card.querySelector('img');
      if (imgEl) {
        imgEl.addEventListener('load', () => {
          measureSizes();
          updateCarrossel(false);
        }, { passive: true });
        imgEl.addEventListener('error', () => {
          measureSizes();
          updateCarrossel(false);
        }, { passive: true });
      }
    });
    
    // Medir tamanhos e posicionar sem animação inicialmente (medições adicionais para imagens)
    measureSizes();
    updateCarrossel(false);
    requestAnimationFrame(() => {
      measureSizes();
      updateCarrossel(false);
      setTimeout(() => {
        measureSizes();
        updateCarrossel(false);
      }, 250);
    });
  }

  // Criar indicadores
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

  function measureSizes() {
    const firstCard = carrossel.querySelector('.panc-card');
    if (!firstCard) return;
    const style = window.getComputedStyle(carrossel);
    gap = parseFloat(style.gap || style.columnGap || 24);
    cardWidth = firstCard.getBoundingClientRect().width;
  }

  // Atualizar carrossel (centraliza o card ativo). Se animate=false, remove transição para reposicionamento instantâneo.
  function updateCarrossel(animate = true) {
    measureSizes();
    const wrapperRect = carrossel.parentElement.getBoundingClientRect();
    const centerOffset = wrapperRect.width / 2 - cardWidth / 2;
    const translateX = centerOffset - currentIndex * (cardWidth + gap);

    if (!animate) {
      carrossel.style.transition = 'none';
      carrossel.style.transform = `translateX(${translateX}px)`;
      // força reflow e restaura transição
      carrossel.getBoundingClientRect();
      carrossel.style.transition = '';
    } else {
      carrossel.style.transform = `translateX(${translateX}px)`;
    }

    // Atualizar cards ativos (baseado no índice absoluto dentro de items)
    document.querySelectorAll('.panc-card').forEach((card, index) => {
      const isActive = index === currentIndex;
      card.classList.toggle('active', isActive);
      card.setAttribute('aria-selected', isActive);
    });

    // Atualizar indicadores com base no segmento real
    if (indicatorsContainer) {
      const currentSlide = Math.floor((currentIndex % baseCount) / 3);
      document.querySelectorAll('.indicator').forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentSlide);
      });
    }

    console.log(`📌 Card ativo: ${pancs[currentIndex % baseCount]?.nome || 'Nenhum'}`);
  }

  // Funções de navegação
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

  // Configurar event listeners
  function setupEventListeners() {
    // Botões de navegação
    if (prevBtn) {
      prevBtn.addEventListener('click', goPrev);
    }
    
    if (nextBtn) {
      nextBtn.addEventListener('click', goNext);
    }
    
    // Navegação por teclado
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
    });
    
    // Swipe para mobile
    setupSwipe();
    // Reposiciona o carrossel ao terminar a transição (para o loop infinito)
    carrossel.addEventListener('transitionend', () => {
      if (currentIndex < baseCount) {
        currentIndex += baseCount;
        updateCarrossel(false);
      } else if (currentIndex >= baseCount * 2) {
        currentIndex -= baseCount;
        updateCarrossel(false);
      }
    });
    // Recalcula e reposiciona ao redimensionar
    window.addEventListener('resize', () => {
      measureSizes();
      updateCarrossel(false);
    });
  }

  // Configurar swipe para mobile
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

  // Auto-play
  let autoPlayInterval;
  
  function startAutoPlay() {
    if (autoPlayInterval) clearInterval(autoPlayInterval);
    autoPlayInterval = setInterval(goNext, 5000);
    
    // Pausar auto-play ao interagir
    carrossel.addEventListener('mouseenter', () => {
      clearInterval(autoPlayInterval);
    });
    
    carrossel.addEventListener('mouseleave', () => {
      if (autoPlayInterval) clearInterval(autoPlayInterval);
      autoPlayInterval = setInterval(goNext, 5000);
    });
    
    // Pausar ao focar em elementos interativos
    carrossel.addEventListener('focusin', () => {
      clearInterval(autoPlayInterval);
    });
    
    carrossel.addEventListener('focusout', () => {
      if (autoPlayInterval) clearInterval(autoPlayInterval);
      autoPlayInterval = setInterval(goNext, 5000);
    });
  }

  // Inicializar
  initCarrossel();
  console.log('✅ Carrossel organizado inicializado com sucesso!');
});     