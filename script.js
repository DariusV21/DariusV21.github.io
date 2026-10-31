function escapeHtml(str) {
    return String(str ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

/* ============================================================
   Work gallery (data in gallery.js)
   One scroll-snap carousel per category: swipe, arrows, dots,
   keyboard arrows, gentle autoplay that pauses on hover/focus
   and when off-screen. No autoplay with reduced motion.
   ============================================================ */
const AUTOPLAY_MS = 4500;
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const CHEVRON = d => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${d}"/></svg>`;

function workCard(cat, ci) {
    const slides = cat.photos.map((src, i) => `
        <li class="slide">
            <img src="${escapeHtml(src)}" alt="${escapeHtml(cat.title)} – photo ${i + 1} of ${cat.photos.length}"
                 ${i === 0 ? '' : 'loading="lazy"'} decoding="async" draggable="false">
        </li>`).join('');
    const dots = cat.photos.map((_, i) =>
        `<button class="dot" type="button" aria-label="Show photo ${i + 1}" data-i="${i}"></button>`).join('');
    return `
        <article class="work-card">
            <div class="carousel" data-c="${ci}" role="region" aria-roledescription="carousel" aria-label="${escapeHtml(cat.title)}" tabindex="0">
                <ul class="carousel-track">${slides}</ul>
                <button class="carousel-btn prev" type="button" aria-label="Previous photo">${CHEVRON('m15 18-6-6 6-6')}</button>
                <button class="carousel-btn next" type="button" aria-label="Next photo">${CHEVRON('m9 18 6-6-6-6')}</button>
                <div class="carousel-dots">${dots}</div>
            </div>
            <div class="work-body">
                <span class="work-icon" aria-hidden="true"><svg viewBox="0 0 24 24">${GALLERY_ICONS[cat.icon] || ''}</svg></span>
                <div>
                    <h3>${escapeHtml(cat.title)}</h3>
                    <p>${escapeHtml(cat.desc)}</p>
                </div>
            </div>
        </article>`;
}

function initCarousel(root, offset = 0) {
    const track = root.querySelector('.carousel-track');
    const dots = [...root.querySelectorAll('.dot')];
    const count = dots.length;
    let index = 0, timer = null, paused = false, visible = false;

    const goTo = (i, smooth = true) => {
        index = (i + count) % count;
        track.scrollTo({ left: index * track.clientWidth, behavior: smooth ? 'smooth' : 'auto' });
    };

    // Keep the dots in sync with whatever moved the track (swipe, button, autoplay)
    let raf = 0;
    track.addEventListener('scroll', () => {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => {
            index = Math.round(track.scrollLeft / track.clientWidth);
            dots.forEach((d, i) => d.setAttribute('aria-current', i === index ? 'true' : 'false'));
        });
    }, { passive: true });
    dots.forEach((d, i) => d.setAttribute('aria-current', i === 0 ? 'true' : 'false'));

    const stop = () => { clearTimeout(timer); timer = null; };
    const start = () => {
        stop();
        if (reduceMotion || paused || !visible || count < 2) return;
        timer = setTimeout(function tick() {
            goTo(index + 1);
            timer = setTimeout(tick, AUTOPLAY_MS);
        }, AUTOPLAY_MS + offset);
        offset = 0;  // the stagger only applies to the very first slide change
    };
    const userMove = i => { goTo(i); start(); };  // restart the clock after a manual move

    root.querySelector('.prev').addEventListener('click', () => userMove(index - 1));
    root.querySelector('.next').addEventListener('click', () => userMove(index + 1));
    dots.forEach(d => d.addEventListener('click', () => userMove(+d.dataset.i)));
    root.addEventListener('keydown', e => {
        if (e.key === 'ArrowLeft')  { e.preventDefault(); userMove(index - 1); }
        if (e.key === 'ArrowRight') { e.preventDefault(); userMove(index + 1); }
    });

    root.addEventListener('mouseenter', () => { paused = true; stop(); });
    root.addEventListener('mouseleave', () => { paused = false; start(); });
    root.addEventListener('focusin',  () => { paused = true; stop(); });
    root.addEventListener('focusout', () => { paused = false; start(); });
    track.addEventListener('touchstart', () => { stop(); }, { passive: true });
    track.addEventListener('touchend',   () => { start(); }, { passive: true });

    window.addEventListener('resize', () => goTo(index, false));

    if ('IntersectionObserver' in window) {
        new IntersectionObserver(([entry]) => {
            visible = entry.isIntersecting;
            visible ? start() : stop();
        }, { threshold: 0.4 }).observe(root);
    } else {
        visible = true; start();
    }
}

function renderGallery() {
    const grid = document.getElementById('workGrid');
    if (!grid || typeof gallery === 'undefined') return;
    grid.innerHTML = gallery.map(workCard).join('');
    // Stagger autoplay so the four carousels don't flip in unison
    grid.querySelectorAll('.carousel').forEach((c, i) => initCarousel(c, i * 1100));
}

/* ============================================================
   Tools (data in tools.js)
   ============================================================ */
function renderTools() {
    const grid = document.getElementById('toolsGrid');
    if (!grid || typeof tools === 'undefined') return;
    grid.innerHTML = tools.map(t => `
        <a class="tool" href="${TOOLS_BASE}${t.file}" target="_blank" rel="noopener">
            <span class="tool-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${TOOL_ICONS[t.icon] || ''}</svg>
            </span>
            <span class="tool-body">
                <span class="tool-title">${escapeHtml(t.title)}</span>
                <span class="tool-desc">${escapeHtml(t.desc)}</span>
            </span>
            <span class="tool-arrow" aria-hidden="true">&rarr;</span>
        </a>
    `).join('');
}

/* ============================================================
   Header: shadow after scrolling + active section in nav
   ============================================================ */
const header = document.querySelector('.site-header');
window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 8);
}, { passive: true });

const navLinks = [...document.querySelectorAll('.nav-links a')];
if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id));
        });
    }, { rootMargin: '-45% 0px -50% 0px' });
    document.querySelectorAll('main section[id]').forEach(s => observer.observe(s));
}

renderTools();
renderGallery();
document.getElementById('year').textContent = new Date().getFullYear();
