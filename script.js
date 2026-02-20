let currentFilter = 'all';
let searchTerm = '';

function renderProjects() {
    const grid = document.getElementById('portfolioGrid');
    let filtered = projects;

    if (currentFilter !== 'all') {
        filtered = projects.filter(p => p.tags.includes(currentFilter));
    }

    if (searchTerm) {
        const term = searchTerm.toLowerCase();
        filtered = filtered.filter(p => 
            p.title.toLowerCase().includes(term) ||
            p.shortDesc.toLowerCase().includes(term) ||
            p.tags.some(tag => tag.toLowerCase().includes(term))
        );
    }

    if (currentFilter === 'all' && !searchTerm) {
        filtered = filtered.sort(() => 0.5 - Math.random()).slice(0, 6);
    }

    grid.innerHTML = filtered.map(project => {
        // build image src from filename (projects/{folder}/files/{filename})
        const imageSrc = project.image
            ? (String(project.image).includes('/') ? project.image : `projects/${project.folder}/files/${project.image}`)
            : null;

        const imageContent = imageSrc
            ? `<img src="${imageSrc}" alt="${project.title}" style="width: 100%; height: 250px; object-fit: cover; display: block;">`
            : `<span style="font-size: 48px; display:flex; align-items:center; justify-content:center; height:250px;">${project.icon}</span>`;

        // if project.gallery exists and has items -> open gallery modal
        if (Array.isArray(project.gallery) && project.gallery.length) {
            return `
                <a href="#" class="portfolio-item gallery-trigger" data-id="${project.id}">
                    <div class="portfolio-image">
                        ${imageContent}
                    </div>
                    <div class="portfolio-info">
                        <h3>${project.title}</h3>
                        <p>${project.shortDesc}</p>
                        <div class="portfolio-tags">
                            ${(project.tags || []).map(tag => `<span class="portfolio-tag">${tag}</span>`).join('')}
                        </div>
                    </div>
                </a>
            `;
        } else {
            // otherwise link to project's page
            return `
                <a href="projects/${project.folder}/index.html" class="portfolio-item">
                    <div class="portfolio-image">
                        ${imageContent}
                    </div>
                    <div class="portfolio-info">
                        <h3>${project.title}</h3>
                        <p>${project.shortDesc}</p>
                        <div class="portfolio-tags">
                            ${(project.tags || []).map(tag => `<span class="portfolio-tag">${tag}</span>`).join('')}
                        </div>
                    </div>
                </a>
            `;
        }
    }).join('');
}

document.querySelectorAll('.category-tag').forEach(tag => {
    tag.addEventListener('click', function() {
        document.querySelectorAll('.category-tag').forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        currentFilter = this.dataset.category;
        renderProjects();
    });
});

document.getElementById('searchInput').addEventListener('input', function(e) {
    searchTerm = e.target.value;
    renderProjects();
});

// Delegated click handler for gallery-trigger items
document.getElementById('portfolioGrid').addEventListener('click', function(e) {
    const item = e.target.closest('.portfolio-item');
    if (!item) return;

    if (item.classList.contains('gallery-trigger')) {
        e.preventDefault();
        const id = item.dataset.id;
        const project = projects.find(p => String(p.id) === String(id));
        if (project) openGallery(project);
    }
});

// Gallery modal logic
function openGallery(project) {
    const modal = document.getElementById('galleryModal');
    const overlay = document.getElementById('galleryOverlay');
    const slider = document.getElementById('gallerySlider');
    const caption = document.getElementById('galleryCaption');
    const prevBtn = document.getElementById('galleryPrev');
    const nextBtn = document.getElementById('galleryNext');
    const closeBtn = document.getElementById('galleryClose');
    const content = modal.querySelector('.gallery-content');

    const filenames = Array.isArray(project.gallery) ? project.gallery.map(fn => String(fn).split('/').pop()) : [];
    if (!filenames.length) return;

    // build slides inside dedicated container so buttons are not removed
    const slidesContainer = document.getElementById('gallerySlides');
    // clear any existing slides
    slidesContainer.innerHTML = '';
    slidesContainer.innerHTML = filenames.map((fn, i) => {
        // Support several ways to declare imageText in project data:
        // - object map: { "1": "text", "2": "text" }
        // - array of pairs: [[1, "text"], [2, "text"]]
        // - single pair: [1, "text"]
        let imageTextEntry = null;
        if (project.imageText) {
            if (!Array.isArray(project.imageText) && typeof project.imageText === 'object') {
                imageTextEntry = project.imageText[String(i + 1)] || project.imageText[i + 1] || null;
            } else if (Array.isArray(project.imageText)) {
                // array-of-pairs e.g. [[1, 'a'], [2, 'b']]
                if (project.imageText.length && Array.isArray(project.imageText[0])) {
                    const found = project.imageText.find(pair => pair && Number(pair[0]) === i + 1);
                    imageTextEntry = found ? String(found[1]) : null;
                } else if (project.imageText.length >= 2 && typeof project.imageText[0] === 'number') {
                    // single pair [index, text]
                    imageTextEntry = Number(project.imageText[0]) === i + 1 ? project.imageText[1] : null;
                }
            }
        }

        return `
        <div class="mySlide" style="display:${i === 0 ? 'flex' : 'none'};">
            <img src="projects/${project.folder}/files/${fn}" alt="${project.title} - ${i+1}">
            ${imageTextEntry ? `<div class="slide-text-bubble">${imageTextEntry}</div>` : ''}
        </div>
    `}).join('');

    let slideIndex = 0;
    let touchStartX = 0;
    let touchEndX = 0;
    const lastActive = document.activeElement;

    function showSlide(n) {
        const slides = slidesContainer.querySelectorAll('.mySlide');
        if (!slides.length) return;
        if (n < 0) n = slides.length - 1;
        if (n >= slides.length) n = 0;
        slides.forEach((s, i) => s.style.display = i === n ? 'flex' : 'none');
        slideIndex = n;
        caption.textContent = `${slideIndex + 1} / ${slides.length}`;
        
        // Update button heights to match the displayed image
        setTimeout(() => {
            const currentSlide = slides[n];
            const img = currentSlide.querySelector('img');
            if (img && img.offsetHeight) {
                const height = img.offsetHeight;
                prevBtn.style.height = height + 'px';
                nextBtn.style.height = height + 'px';
            }
        }, 0);
    }

    function onNext() { showSlide(slideIndex + 1); }
    function onPrev() { showSlide(slideIndex - 1); }
    
    function onTouchStart(e) {
        touchStartX = e.changedTouches[0].screenX;
    }
    
    function onTouchEnd(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                onNext(); // swiped left, go next
            } else {
                onPrev(); // swiped right, go prev
            }
        }
    }
    
    function onKey(e) {
        if (e.key === 'Escape') close();
        if (e.key === 'ArrowRight') onNext();
        if (e.key === 'ArrowLeft') onPrev();
    }

    function close() {
        modal.style.display = 'none';
        document.body.classList.remove('modal-open');
        // cleanup
        nextBtn.removeEventListener('click', onNext);
        prevBtn.removeEventListener('click', onPrev);
        closeBtn.removeEventListener('click', close);
        overlay.removeEventListener('click', close);
        content.removeEventListener('touchstart', onTouchStart);
        content.removeEventListener('touchend', onTouchEnd);
        document.removeEventListener('keydown', onKey);
        slidesContainer.innerHTML = '';
        caption.textContent = '';
        if (lastActive && typeof lastActive.focus === 'function') lastActive.focus();
    }

    // open modal
    modal.style.display = 'flex';
    document.body.classList.add('modal-open');
    // focus management
    setTimeout(() => closeBtn.focus(), 50);

    // attach handlers
    nextBtn.addEventListener('click', onNext);
    prevBtn.addEventListener('click', onPrev);
    closeBtn.addEventListener('click', close);
    overlay.addEventListener('click', close);
    content.addEventListener('touchstart', onTouchStart);
    content.addEventListener('touchend', onTouchEnd);
    document.addEventListener('keydown', onKey);

    // initial render
    showSlide(0);
}

// Smooth anchor scrolling (kept)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});


// Header scroll effect (kept)
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(44, 62, 80, 1)';
    } else {
        header.style.background = 'rgba(44, 62, 80, 0.95)';
    }
});

renderProjects();