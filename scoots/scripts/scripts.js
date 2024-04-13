let slideIndex = 0;
const slides = document.querySelectorAll('.hero-slide');

function showSlide(n) {
    slides.forEach(slide => {
        slide.style.opacity = 0; // Hide all slides
        slide.style.display = 'none';
    });
    slideIndex = (n + slides.length) % slides.length;
    slides[slideIndex].style.display = 'flex'; 
    setTimeout(() => {
        slides[slideIndex].style.opacity = 1; 
    }, 50); 
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


const locationImages = document.querySelectorAll('.location-image');

locationImages.forEach(locationImage => {
  const iframe = locationImage.querySelector('iframe');
  if (iframe) {
    locationImage.addEventListener('mouseenter', () => {
      iframe.style.display = 'block';
    });

    locationImage.addEventListener('mouseleave', () => {
      iframe.style.display = 'none';
    });
  }
});
    
    fetch(scootsURL)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        const rentals = data.rentals;
    
        rentals.forEach((rental, index) => {
          const productImages = document.querySelectorAll('.product-image');
          const currentProductImage = productImages[index];
    
          const imageWrapper = currentProductImage.querySelector('.image-wrapper img');
          imageWrapper.src = baseURL + rental.details[0].image; 
          imageWrapper.alt = rental.type;
    
          const h3 = currentProductImage.querySelector('h3');
          h3.textContent = rental.type;
    
          const ul = currentProductImage.querySelector('ul');
          ul.innerHTML = ''; 
    
          rental.details.forEach(detail => {
            const li = document.createElement('li');
            li.textContent = `${detail.name} (${detail.cc || ''}) - ${detail.capacity}`;
            ul.appendChild(li);
          });
    
          const reservationLink = currentProductImage.querySelector('a');
          reservationLink.href = "reservations.html";
        });
      })
      .catch(error => {
        console.error('There was a problem fetching the JSON data:', error);
      });
    
      