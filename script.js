const projects = [
    {
        id: 1,
        folder: "prj_001",
        title: "Router Cabinet",
        shortDesc: "Custom wooden cabinet designed to elegantly hide networking equipment.",
        icon: "📦",
        categories: ["woodworking", "home-improvement"],
        tags: ["cabinet", "router", "storage", "organization"]
    },
    {
        id: 2,
        folder: "prj_002",
        title: "Key Hanger",
        shortDesc: "Wall-mounted wooden key organizer with modern design.",
        icon: "🔑",
        categories: ["woodworking", "home-improvement"],
        tags: ["organizer", "keys", "wall mount", "entryway"]
    },
    {
        id: 3,
        folder: "prj_003",
        title: "TV Table Shelf",
        shortDesc: "Complementary shelf unit for additional storage next to TV.",
        icon: "📺",
        categories: ["woodworking", "home-improvement"],
        tags: ["shelf", "TV", "storage", "living room"]
    },
    {
        id: 4,
        folder: "prj_004",
        title: "Decorative Lamp",
        shortDesc: "Handcrafted wooden lamp with unique design elements.",
        icon: "💡",
        categories: ["woodworking", "laser-cutting"],
        tags: ["lamp", "lighting", "decoration", "handcrafted"]
    },
    {
        id: 5,
        folder: "prj_005",
        title: "Wooden Toy Collection",
        shortDesc: "Safe, eco-friendly wooden toys for children.",
        icon: "🧸",
        categories: ["woodworking", "toys"],
        tags: ["toys", "children", "safe", "handmade", "eco-friendly"]
    },
    {
        id: 6,
        folder: "prj_006",
        title: "Electronic Modules Kit",
        shortDesc: "Curated electronic modules and DIY kits for makers.",
        icon: "⚡",
        categories: ["electronics"],
        tags: ["electronics", "DIY", "Arduino", "modules", "sensors"]
    },
    {
        id: 7,
        folder: "prj_007",
        title: "Wooden Storage Boxes",
        shortDesc: "Various wooden boxes for storage and organization.",
        icon: "📦",
        categories: ["woodworking"],
        tags: ["storage", "boxes", "organization", "custom"]
    },
    {
        id: 8,
        folder: "prj_008",
        title: "Laser Cut Art",
        shortDesc: "Precision laser-cut designs for decoration and function.",
        icon: "✂️",
        categories: ["laser-cutting"],
        tags: ["laser", "art", "decoration", "custom design"]
    },
    {
        id: 9,
        folder: "prj_009",
        title: "3D Printed Components",
        shortDesc: "Custom 3D printed parts and prototypes.",
        icon: "🖨️",
        categories: ["3d-printing"],
        tags: ["3D printing", "prototypes", "custom parts"]
    },
    {
        id: 10,
        folder: "prj_010",
        title: "Smart Home Integration",
        shortDesc: "Electronic modules for home automation projects.",
        icon: "🏠",
        categories: ["electronics", "home-improvement"],
        tags: ["smart home", "automation", "IoT", "electronics"]
    },
    {
        id: 11,
        folder: "prj_011",
        title: "Educational Toy Kits",
        shortDesc: "STEM-focused toys combining wood and electronics.",
        icon: "🎓",
        categories: ["toys", "electronics", "woodworking"],
        tags: ["educational", "STEM", "toys", "learning", "kids"]
    },
    {
        id: 12,
        folder: "prj_012",
        title: "Laser Engraved Gifts",
        shortDesc: "Personalized wooden items with laser engraving.",
        icon: "🎁",
        categories: ["laser-cutting", "woodworking"],
        tags: ["gifts", "personalized", "engraving", "custom"]
    }
];

let currentFilter = 'all';
let searchTerm = '';

function renderProjects() {
    const grid = document.getElementById('portfolioGrid');
    let filtered = projects;

    if (currentFilter !== 'all') {
        filtered = projects.filter(p => p.categories.includes(currentFilter));
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

    grid.innerHTML = filtered.map(project => `
        <a href="projects/${project.folder}/index.html" class="portfolio-item">
            <div class="portfolio-image">${project.icon}</div>
            <div class="portfolio-info">
                <h3>${project.title}</h3>
                <p>${project.shortDesc}</p>
                <div class="portfolio-tags">
                    ${project.tags.map(tag => `<span class="portfolio-tag">${tag}</span>`).join('')}
                </div>
            </div>
        </a>
    `).join('');
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

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Thank you for your message! I will get back to you soon.');
    this.reset();
});

window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(44, 62, 80, 1)';
    } else {
        header.style.background = 'rgba(44, 62, 80, 0.95)';
    }
});

renderProjects();