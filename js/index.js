// ========================================
// INICIALIZACIÓN PRINCIPAL
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    updateFooterYear();
    initMobileNavigation();
    initProjectContent();
    initCarousel();
    renderProjects();
    
    // 1. Other Projects (Mini Cards estándar)
    setupMiniCarousel({
        jsonPath: './data/otherProjects.json',
        trackId: 'other-projects-track',
        prevBtnId: 'mini-prev',
        nextBtnId: 'mini-next',
        renderCard: (item) => `
            <div class="mini-card">
                <img src="${item.imageSrc}" alt="${item.title}" loading="lazy">
                <h4>${item.title}</h4>
            </div>
        `
    });

    // 2. SKILLS & TOOLS (Separa y crea dos carruseles)
    renderSkillsAndTools();

    // 3. DOCUMENTOS (NUEVO: Grilla Estática)
    renderDocumentsGrid();
});

// ========================================
// FOOTER - AÑO ACTUAL
// ========================================
function updateFooterYear() {
    const yearElement = document.getElementById("current-year");
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

// ========================================
// NAVEGACIÓN MÓVIL
// ========================================
function initMobileNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.container-navLinks');
    const navLinks = document.querySelectorAll('.aNav');

    if (!navToggle || !navMenu) return;

    // Toggle del menú
    navToggle.addEventListener('click', () => {
        const isOpen = navMenu.classList.toggle('is-open');
        updateNavToggleUI(navToggle, isOpen);
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('is-open');
            updateNavToggleUI(navToggle, false);
        });
    });
}

function updateNavToggleUI(toggle, isOpen) {
    toggle.innerHTML = isOpen ? '&times;' : '&#9776;';
    toggle.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
}

// ========================================
// CARGA DINÁMICA DE CONTENIDO DE PROYECTOS
// ========================================
function initProjectContent() {
    const contentContainer = document.getElementById('project-content-goes-here');
    if (!contentContainer) return;

    const urlParams = new URLSearchParams(window.location.search);
    const pageSlug = urlParams.get('page');

    if (!pageSlug) {
        contentContainer.innerHTML = '<h1>Error</h1><p>Proyecto no especificado.</p>';
        return;
    }

    const contentFilePath = `../content/${pageSlug}.html`;

    fetch(contentFilePath)
        .then(response => {
            if (!response.ok) {
                throw new Error('Proyecto no encontrado.');
            }
            return response.text();
        })
        .then(htmlSnippet => {
            contentContainer.innerHTML = htmlSnippet;
            
            const titleElement = contentContainer.querySelector('h1');
            if (titleElement) {
                document.title = titleElement.textContent;
            }
        })
        .catch(error => {
            console.error(error);
            contentContainer.innerHTML = `<h1>Error</h1><p>${error.message}</p>`;
        });
}

// ========================================
// CARRUSEL DE PROYECTOS
// ========================================
function initCarousel() {
    const track = document.querySelector('.carousel-track');
    const dotsNav = document.querySelector('.carousel-nav');
    const nextButton = document.querySelector('.carousel-button--right');
    const prevButton = document.querySelector('.carousel-button--left');

    if (!track || !dotsNav || !nextButton || !prevButton) return;

    let slides = [];
    let dots = [];
    let autoPlayInterval;

    loadCarouselData();

    async function loadCarouselData() {
        try {
            const response = await fetch('./data/mainCarousel.json');
            if (!response.ok) throw new Error('No se pudo cargar mainCarousel.json');
            
            const proyectos = await response.json();
            buildCarouselSlides(proyectos);
            setupCarouselControls();
            startAutoPlay();
            handleResponsive();
            
        } catch (error) {
            console.error('Error al inicializar el carrusel:', error);
        }
    }

    function buildCarouselSlides(proyectos) {
        proyectos.forEach((proyecto, index) => {
            // Crear slide
            const slide = document.createElement('li');
            slide.className = 'carousel-slide';
            if (index === 0) slide.classList.add('current-slide');
            slide.innerHTML = `
                <img src="${proyecto.imageUrl}" alt="${proyecto.altText}">
                <div class="carousel-caption">
                    <h3>${proyecto.title}</h3>
                </div>
            `;
            track.appendChild(slide);

            // Crear indicador
            const dot = document.createElement('button');
            dot.className = 'carousel-indicator';
            if (index === 0) dot.classList.add('current-slide');
            dotsNav.appendChild(dot);
        });

        slides = Array.from(track.children);
        dots = Array.from(dotsNav.children);
    }

    function setupCarouselControls() {
        nextButton.addEventListener('click', handleNext);
        prevButton.addEventListener('click', handlePrev);
        dotsNav.addEventListener('click', handleDotClick);
    }

    function handleResponsive() {
        window.addEventListener('resize', () => {
            const currentSlide = track.querySelector('.current-slide');
            if (currentSlide) {
                moveToSlide(currentSlide, currentSlide);
            }
        });
    }

    function getSlideWidth() {
        return slides.length > 0 ? slides[0].getBoundingClientRect().width : 0;
    }

    function moveToSlide(currentSlide, targetSlide) {
        if (!targetSlide) return;

        const targetIndex = slides.findIndex(slide => slide === targetSlide);
        const amountToMove = getSlideWidth() * targetIndex;
        
        track.style.transform = `translateX(-${amountToMove}px)`;
        currentSlide.classList.remove('current-slide');
        targetSlide.classList.add('current-slide');
        updateDots(targetSlide);
    }

    function updateDots(targetSlide) {
        const currentDot = dotsNav.querySelector('.current-slide');
        const targetIndex = slides.findIndex(slide => slide === targetSlide);
        const targetDot = dots[targetIndex];
        
        if (currentDot) currentDot.classList.remove('current-slide');
        if (targetDot) targetDot.classList.add('current-slide');
    }

    function startAutoPlay() {
        autoPlayInterval = setInterval(() => {
            handleNext();
        }, 5000);
    }

    function resetAutoPlay() {
        clearInterval(autoPlayInterval);
        startAutoPlay();
    }

    function handleNext() {
        const currentSlide = track.querySelector('.current-slide');
        const nextSlide = currentSlide.nextElementSibling || slides[0];
        moveToSlide(currentSlide, nextSlide);
        resetAutoPlay();
    }

    function handlePrev() {
        const currentSlide = track.querySelector('.current-slide');
        const prevSlide = currentSlide.previousElementSibling || slides[slides.length - 1];
        moveToSlide(currentSlide, prevSlide);
        resetAutoPlay();
    }

    function handleDotClick(e) {
        const targetDot = e.target.closest('button');
        if (!targetDot) return;

        const currentSlide = track.querySelector('.current-slide');
        const targetIndex = dots.findIndex(dot => dot === targetDot);
        const targetSlide = slides[targetIndex];

        moveToSlide(currentSlide, targetSlide);
        resetAutoPlay();
    }
}

// ========================================
// RENDERIZADO DE PROYECTOS Y LÓGICA DE MODAL
// ========================================
const projectsContainer = document.getElementById('projects-grid');
const modalOverlay = document.getElementById('project-modal');
const modalBody = document.getElementById('modal-body');
const closeModalBtn = document.querySelector('.modal-close-btn');

async function renderProjects() {
    if (!projectsContainer) return;

    try {
        const response = await fetch('./data/projects.json'); // Verifica que esta ruta sea correcta
        if (!response.ok) throw new Error('No se pudo cargar projects.json');
        
        const projectsData = await response.json();
        projectsContainer.innerHTML = '';

        projectsData.forEach(project => {
            const tagsHtml = project.tags.map(tag => `<span>${tag}</span>`).join('');
            
            // Botón externo (Steam, etc)
            let externalButtonHtml = '';
            if (project.externalLink) {
                externalButtonHtml = `
                    <a href="${project.externalLink}" class="btn btn-steam" target="_blank" rel="noopener noreferrer">
                        <i class="bi bi-steam"></i> Steam
                    </a>
                `;
            }

            // Extraer Slug
            let projectSlug = "";
            if(project.link && project.link.includes('page=')){
                projectSlug = project.link.split('page=')[1];
            }

            // CAMBIO AQUÍ: Usamos data-slug y una clase identificadora, SIN onclick
            const cardHtml = `
                <article class="project-card">
                    <div class="project-media">
                        <img src="${project.imageSrc}" alt="${project.imageAlt}">
                    </div>
                    <div class="project-info">
                        <h3>${project.title}</h3>
                        <p>${project.description}</p>
                        <div class="project-tags">
                            ${tagsHtml}
                        </div>
                        
                        <div class="project-buttons">
                            <button 
                                class="btn btn-secondary js-open-modal" 
                                data-slug="${projectSlug}">
                                View case study
                            </button>
                            ${externalButtonHtml}
                        </div>
                    </div>
                </article>
            `;
            projectsContainer.innerHTML += cardHtml;
        });

    } catch (error) {
        console.error("Error cargando los proyectos:", error);
        projectsContainer.innerHTML = '<p>Error al cargar proyectos.</p>';
    }
}

if (projectsContainer) {
    projectsContainer.addEventListener('click', (e) => {
        // Buscamos si el clic fue en un botón (o en un elemento dentro del botón) con la clase js-open-modal
        const btn = e.target.closest('.js-open-modal');
        
        if (btn) {
            const slug = btn.getAttribute('data-slug');
            if (slug) {
                openProjectModal(slug);
            } else {
                console.error("No se encontró el slug en el botón");
            }
        }
    });
}

// ========================================
// FUNCIONES DEL MODAL
// ========================================

async function openProjectModal(slug) {
    // IMPORTANTE: Ajusta esta ruta si tu carpeta se llama diferente.
    // Asumimos que tienes una carpeta "content" en la raíz junto a index.html
    const contentPath = `./content/${slug}.html`; 

    try {
        // 1. Mostrar modal con estado de carga
        modalBody.innerHTML = '<div style="text-align:center; padding:3rem;"><h2>Loading...</h2></div>';
        openModalUI();

        // 2. Fetch del contenido
        const response = await fetch(contentPath);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const htmlContent = await response.text();
        modalBody.innerHTML = htmlContent;

    } catch (error) {
        console.error("Error cargando modal:", error);
        modalBody.innerHTML = `
            <div style="text-align:center; padding: 2rem;">
                <h2>Error</h2>
                <p>No se pudo cargar el proyecto.</p>
                <p style="font-size:0.8rem; color:#777;">Intenta verificar que el archivo <b>${contentPath}</b> exista.</p>
            </div>
        `;
    }
}

function openModalUI() {
    if(modalOverlay) {
        modalOverlay.classList.add('is-visible');
        modalOverlay.setAttribute('aria-hidden', 'false');
        document.body.classList.add('no-scroll');
    }
}

function closeProjectModal() {
    if(modalOverlay) {
        modalOverlay.classList.remove('is-visible');
        modalOverlay.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('no-scroll');
        
        // Limpiar contenido brevemente después para no ver el anterior al reabrir
        setTimeout(() => {
            modalBody.innerHTML = ''; 
        }, 300);
    }
}

// Event Listeners para cerrar
if (closeModalBtn) closeModalBtn.addEventListener('click', closeProjectModal);
if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) closeProjectModal();
    });
}
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeProjectModal();
});

// ========================================
// UTILIDAD: Setup Genérico 
// ========================================
async function setupMiniCarousel({ jsonPath, trackId, prevBtnId, nextBtnId, renderCard, scrollAmount = 240 }) {
    const track = document.getElementById(trackId);
    if (!track) return;

    try {
        const response = await fetch(jsonPath);
        if (!response.ok) throw new Error(`Error cargando ${jsonPath}`);
        const rawItems = await response.json();
        const items = [...rawItems, ...rawItems]; 
        track.innerHTML = items.map(renderCard).join('');
        enableCarouselLogic(trackId, prevBtnId, nextBtnId, scrollAmount);
    } catch (error) {
        console.error(`Error en carrusel ${trackId}:`, error);
    }
}

// ========================================
// UTILIDAD: Lógica de Movimiento 
// ========================================
function enableCarouselLogic(trackId, prevBtnId, nextBtnId, scrollAmount) {
    const track = document.getElementById(trackId);
    const btnPrev = document.getElementById(prevBtnId);
    const btnNext = document.getElementById(nextBtnId);

    if (!track) return;

    let scrollInterval;
    const SCROLL_DELAY = 3000;

    const startAutoPlay = () => {
        clearInterval(scrollInterval);
        scrollInterval = setInterval(() => {
            const maxScrollLeft = track.scrollWidth - track.clientWidth;
            if (track.scrollLeft >= maxScrollLeft - 5) {
                track.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            }
        }, SCROLL_DELAY);
    };

    const stopAutoPlay = () => clearInterval(scrollInterval);
    startAutoPlay();
    track.addEventListener('mouseenter', stopAutoPlay);
    track.addEventListener('mouseleave', startAutoPlay);

    if (btnNext && btnPrev) {
        btnNext.addEventListener('click', () => {
            stopAutoPlay();
            track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        });

        btnPrev.addEventListener('click', () => {
            stopAutoPlay();
            track.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        });
        
        btnNext.addEventListener('mouseenter', stopAutoPlay);
        btnPrev.addEventListener('mouseenter', stopAutoPlay);
    }
}

// ========================================
// RENDERIZADO DE DOCUMENTOS (GRILLA ESTÁTICA)
// ========================================
async function renderDocumentsGrid() {
    const container = document.getElementById('documents-grid');
    if (!container) return;

    try {
        const response = await fetch('./data/documents.json');
        if (!response.ok) throw new Error('Error cargando documents.json');
        const docs = await response.json();

        // Renderizado simple sin lógica de scroll
        container.innerHTML = docs.map(doc => `
            <a href="${doc.link}" class="doc-static-card" target="_blank">
                <div class="doc-icon-wrapper">
                    ${doc.imageSrc 
                        ? `<img src="${doc.imageSrc}" alt="icon">` 
                        : `<i class="bi bi-file-earmark-text"></i>`
                    }
                </div>
                
                <div class="doc-info">
                    <h4>${doc.title}</h4>
                    <span>Read Document</span>
                </div>

                <i class="bi bi-arrow-right doc-arrow"></i>
            </a>
        `).join('');

    } catch (error) {
        console.error("Error loading documents:", error);
        container.innerHTML = '<p>No documents available.</p>';
    }
}

// ========================================
// LÓGICA DE SKILLS & TOOLS (Modificada)
// ========================================
async function renderSkillsAndTools() {
    try {
        const response = await fetch('./data/skills.json');
        if (!response.ok) throw new Error('Error cargando skills.json');
        
        const rawData = await response.json();
        const skillsData = rawData.filter(item => item.type === 'skill');
        const toolsData = rawData.filter(item => item.type === 'tool');

        const renderSkillCard = (item) => `
            <div class="skill-card" title="${item.name}">
                <div class="skill-icon">
                    <img src="${item.logoSrc}" alt="${item.name}" loading="lazy">
                </div>
                <p class="skill-name">${item.name}</p>
            </div>
        `;

        const skillsTrack = document.getElementById('skills-track');
        if (skillsTrack && skillsData.length > 0) {
            skillsTrack.innerHTML = skillsData.map(renderSkillCard).join('');
            if (skillsData.length > 4) {
                enableCarouselLogic('skills-track', 'skills-prev', 'skills-next', 180); 
            } else {
                // Opcional: Ocultar botones si no son necesarios
                hideControls('skills-prev', 'skills-next');
            }
        }

        const toolsTrack = document.getElementById('tools-track');
        if (toolsTrack && toolsData.length > 0) {
            toolsTrack.innerHTML = toolsData.map(renderSkillCard).join('');
            if (toolsData.length > 4) {
                enableCarouselLogic('tools-track', 'tools-prev', 'tools-next', 180);
            } else {
                hideControls('tools-prev', 'tools-next');
            }
        }

    } catch (error) {
        console.error("Error en Skills & Tools:", error);
    }
}

// Función auxiliar para ocultar flechas si hay pocos elementos
function hideControls(prevId, nextId) {
    const prev = document.getElementById(prevId);
    const next = document.getElementById(nextId);
    if (prev) prev.style.display = 'none';
    if (next) next.style.display = 'none';
}