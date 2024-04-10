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
    // Generate HTML for each rental type
    data.rentals.forEach(rental => {
      const sidebarBtn = document.createElement('button');
      sidebarBtn.classList.add('sidebar-btn');
      sidebarBtn.textContent = rental.type;
      sidebarBtn.setAttribute('data-content', rental.type.toLowerCase().replace(/\s+/g, '-'));
      document.querySelector('.sidebar').appendChild(sidebarBtn);

      const contentDiv = document.createElement('div');
      contentDiv.classList.add('content');
      contentDiv.setAttribute('id', rental.type.toLowerCase().replace(/\s+/g, '-'));
      document.querySelector('.content-wrapper').appendChild(contentDiv);

      const productWrapper = document.createElement('div');
      productWrapper.classList.add('product-wrapper');
      contentDiv.appendChild(productWrapper);

      rental.details.forEach(detail => {
        const productImageDiv = document.createElement('div');
        productImageDiv.classList.add('product-image');
        productWrapper.appendChild(productImageDiv);

        const imageWrapperDiv = document.createElement('div');
        imageWrapperDiv.classList.add('image-wrapper');
        productImageDiv.appendChild(imageWrapperDiv);

        const image = document.createElement('img');
        image.src = baseURL + detail.image;
        image.alt = detail.name;
        imageWrapperDiv.appendChild(image);

        const h3 = document.createElement('h3');
        h3.textContent = rental.type;
        productImageDiv.appendChild(h3);

        const ul = document.createElement('ul');
        detail.description = `${detail.name} (${detail.cc || ''}) - ${detail.capacity}`;
        const descriptionArray = detail.description.split(' - ');
        descriptionArray.forEach(description => {
          const li = document.createElement('li');
          li.textContent = description;
          ul.appendChild(li);
        });
        productImageDiv.appendChild(ul);

        const a = document.createElement('a');
        a.href = "reservations.html";
        a.textContent = "Make a Reservation";
        productImageDiv.appendChild(a);
      });
    });
  })
  .catch(error => {
    console.error('There was a problem fetching the JSON data:', error);
  });
