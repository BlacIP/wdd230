function closeBanner() {
    document.querySelector('.banner').style.display = 'none';
}

let slideIndex = 0;
const slides = document.querySelectorAll('.hero-slide');

function showSlide(n) {
    slides.forEach(slide => {
        slide.classList.remove('active'); // Remove 'active' class from all slides
    });
    slideIndex = (n + slides.length) % slides.length;
    slides[slideIndex].classList.add('active'); // Add 'active' class to the current slide
}

function prevSlide() {
    showSlide(slideIndex - 1);
}

function nextSlide() {
    showSlide(slideIndex + 1);
}

// Auto rotate slides every 5 seconds
setInterval(nextSlide, 4000);

// Show initial slide
showSlide(slideIndex);
