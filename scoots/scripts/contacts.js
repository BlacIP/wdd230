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

function handleFormSubmit() {
  event.preventDefault(); // Stop the form from submitting

  // Initialize the Lottie animation
  var animation = lottie.loadAnimation({
      container: document.getElementById('lottieAnimation'), // the container element
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: '../chamber/images/success.json' // URL to the animation JSON
  });

  // Display the modal
  var modal = document.getElementById("myModal");
  modal.style.display = "block";

  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];

  // When the user clicks on <span> (x), close the modal and stop the animation
  span.onclick = function() {
      modal.style.display = "none";
      animation.stop(); // Stop playing the animation
  }

  // When the user clicks anywhere outside of the modal, close it and stop the animation
  window.onclick = function(event) {
      if (event.target == modal) {
          modal.style.display = "none";
          animation.stop(); // Stop playing the animation
      }
  }

  return false;
}
