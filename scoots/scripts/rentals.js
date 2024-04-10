// Replace 'YOUR_API_KEY' with your actual OpenWeatherMap API key
const apiKey = '335693caab24c80dc3e31365307b3f55';
// Replace 'YOUR_CITY' with your desired city name
const city = 'cozumel';

// Fetch current weather data
fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
  .then(response => response.json())
  .then(data => {

    const maxTemp = data.main.temp_max;
    const bannerMessage = `Today's high temperature: ${maxTemp}°C`;
    document.querySelector('.banner p').textContent = bannerMessage;
});

document.querySelectorAll('.sidebar-btn').forEach(btn => {
  btn.addEventListener('click', () => {
      // Remove 'active' class from all buttons
      document.querySelectorAll('.sidebar-btn').forEach(button => {
          button.classList.remove('active');
      });

      // Add 'active' class to clicked button
      btn.classList.add('active');

      // Hide all content
      document.querySelectorAll('.content').forEach(content => {
          content.classList.remove('active');
      });

      // Show corresponding content
      const contentId = btn.getAttribute('data-content');
      const content = document.getElementById(contentId);
      if (content) {
          content.classList.add('active');
      }
  });
});




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
    // Update existing HTML elements with data from JSON
    const sidebarBtns = document.querySelectorAll('.sidebar-btn');
    const contents = document.querySelectorAll('.content');

    data.rentals.forEach((rental, index) => {
      sidebarBtns[index].textContent = rental.type;
      sidebarBtns[index].setAttribute('data-content', `content${index + 1}`);

      const contentDiv = contents[index];
      contentDiv.id = `content${index + 1}`;
      contentDiv.classList.remove('active');
      if (index === 0) {
        contentDiv.classList.add('active');
      }

      const productImages = contentDiv.querySelectorAll('.product-image');
      rental.details.forEach((detail, i) => {
        const productImageDiv = productImages[i];
        const image = productImageDiv.querySelector('img');
        image.src = baseURL + detail.image;
        image.alt = detail.name;

        const h3 = productImageDiv.querySelector('h3');
        h3.textContent = detail.name;

        const ul = productImageDiv.querySelector('ul');
        ul.parentNode.removeChild(ul);

        const p = document.createElement('p');
        p.textContent = `(${detail.cc}) - ${detail.capacity}`;
        productImageDiv.appendChild(p);

        const a = productImageDiv.querySelector('a');
        a.href = "reservations.html";
      });
    });
  })
  .catch(error => {
    console.error('There was a problem fetching the JSON data:', error);
  });
