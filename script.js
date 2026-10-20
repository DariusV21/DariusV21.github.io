/* ============================================================
   Instagram feed
   Reads feed.json (written later by the home-server fetcher):
   {
     "updated": "2026-10-20T12:00:00Z",
     "latest":   [ { "permalink": "...", "image": "feed/123.jpg", "caption": "...", "date": "2026-10-20" } ],
     "featured": [ ...same shape... ]
   }
   Until that file exists, placeholder tiles are shown.
   ============================================================ */
const IG_PROFILE = 'https://www.instagram.com/dv_electronics/';
const FEED_COUNT = 3;

const IG_GLYPH = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.3" cy="6.7" r="1" fill="currentColor" stroke="none"/></svg>';

function escapeHtml(str) {
    return String(str ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function shortCaption(text, max = 90) {
    const first = String(text || '').split('\n')[0].trim();
    return first.length > max ? first.slice(0, max - 1).trimEnd() + '…' : first;
}

function postTile(post) {
    const caption = shortCaption(post.caption);
    return `
        <a class="post" href="${escapeHtml(post.permalink)}" target="_blank" rel="noopener">
            <img src="${escapeHtml(post.image)}" alt="${escapeHtml(caption || 'Instagram post')}" loading="lazy" decoding="async">
            <span class="post-overlay">
                ${caption ? `<span class="post-caption">${escapeHtml(caption)}</span>` : ''}
                <span class="post-link">${IG_GLYPH} View on Instagram</span>
            </span>
        </a>`;
}

function placeholderTile(i) {
    return `
        <a class="post post-placeholder" href="${IG_PROFILE}" target="_blank" rel="noopener" style="--i:${i}">
            <span class="ph-grid" aria-hidden="true"></span>
            <span class="ph-body">
                ${IG_GLYPH}
                <span class="ph-title">Coming soon</span>
                <span class="ph-sub">Follow @dv_electronics</span>
            </span>
        </a>`;
}

function renderFeed(el, posts) {
    const list = (posts || []).slice(0, FEED_COUNT);
    let html = list.map(postTile).join('');
    for (let i = list.length; i < FEED_COUNT; i++) html += placeholderTile(i);
    el.innerHTML = html;
}

async function loadFeed() {
    const latestEl = document.getElementById('feedLatest');
    const featuredEl = document.getElementById('feedFeatured');
    let feed = {};
    try {
        const res = await fetch('feed.json', { cache: 'no-cache' });
        if (res.ok) feed = await res.json();
    } catch (e) {
        /* no feed yet - placeholders are shown */
    }
    renderFeed(latestEl, feed.latest);
    renderFeed(featuredEl, feed.featured);
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
loadFeed();
document.getElementById('year').textContent = new Date().getFullYear();
