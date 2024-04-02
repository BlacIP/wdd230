function closeBanner() {
    document.querySelector('.banner').style.display = 'none';
}

let slideIndex = 0;
const slides = document.querySelectorAll('.hero-slide');

function showSlide(n) {
    slides.forEach(slide => {
        slide.style.opacity = 0; // Hide all slides
        slide.style.display = 'none';
    });
    slideIndex = (n + slides.length) % slides.length;
    slides[slideIndex].style.display = 'flex'; // Change display property to flex
    setTimeout(() => {
        slides[slideIndex].style.opacity = 1; // Show current slide with fade-in effect
    }, 50); // Delay for smooth transition
}

function prevSlide() {
    showSlide(slideIndex - 1);
}

function nextSlide() {
    showSlide(slideIndex + 1);
}

// Auto rotate slides every 5 seconds
setInterval(nextSlide, 3000);

// Show initial slide
showSlide(slideIndex);
