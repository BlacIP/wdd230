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