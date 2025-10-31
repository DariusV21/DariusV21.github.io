// Image lightbox functionality
const galleryItems = document.querySelectorAll('.gallery-item img');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxClose = document.getElementById('lightboxClose');

galleryItems.forEach(img => {
    img.addEventListener('click', function() {
        lightboxImg.src = this.src;
        lightboxImg.alt = this.alt;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', function(e) {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Keyboard navigation for lightbox
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        closeLightbox();
    }
});