function closeBanner() {
    document.querySelector('.banner').style.display = 'none';
}

  const baseURL = "https://blacip.github.io/wdd230/";
  const linksURL = "https://blacip.github.io/wdd230/scoots/data/scoots.json";
  
  // Fetch the JSON data
  fetch(linksURL)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      // Process the JSON data and create the socialIcons object
      const socialIcons = {};
      data.forEach(social => {
        socialIcons[social.social] = {
          white: baseURL + social.whiteIconURL,
          color: baseURL + social.colorIconURL
        };
  
        // Set the default background image (white icon) for each social media icon
        document.querySelector(`.social-icon[data-social="${social.social}"]`).style.backgroundImage = `url(${socialIcons[social.social].white})`;
      });
  
      // Add event listeners to each social media icon
      document.querySelectorAll('.social-icon').forEach(icon => {
        icon.addEventListener('mouseover', function() {
          const socialType = this.getAttribute('data-social');
          this.style.backgroundImage = `url(${socialIcons[socialType].color})`;
        });
  
        icon.addEventListener('mouseout', function() {
          const socialType = this.getAttribute('data-social');
          this.style.backgroundImage = `url(${socialIcons[socialType].white})`;
        });
      });
    })
    .catch(error => {
      console.error('There was a problem fetching the JSON data:', error);
    });
  



const currentYear = new Date().getFullYear();
document.querySelector('.footer-bottom p').textContent = `© ${currentYear} | Scoots - A Motor Scooter Rental Company | Boluwatife Adebiyi Omotoyinbo | WDD230 Project`;


const lastModifiedDate = document.lastModified;
document.getElementById('lastModified').textContent = `| Last Modified: ${lastModifiedDate}`;

function callHeader(h1) {
    const spans = h1.querySelectorAll('span');
    spans.forEach((span, index) => {
        if(span.textContent.trim() !== '') {
            span.style.animation = 'none';
            span.offsetHeight;
            span.style.animation = '';
            span.style.animationDelay = `${index * 0.05}s`;
        }
    });
}