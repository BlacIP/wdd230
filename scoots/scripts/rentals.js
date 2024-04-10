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




// const baseURL = "https://blacip.github.io/wdd230/";
// const linksURL = "https://blacip.github.io/wdd230/scoots/data/scoots.json";

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
        p.textContent = `${detail.cc} - ${detail.capacity}`;
        productImageDiv.appendChild(p);

        const a = productImageDiv.querySelector('a');
        a.href = "reservations.html";
        productImageDiv.appendChild(a); // Move the reservation link after the new paragraph
      });
    });
  })
  .catch(error => {
    console.error('There was a problem fetching the JSON data:', error);
  });


  function fetchDataFromServer() {
    return fetch(linksURL)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Cache the fetched data
            localStorage.setItem(cacheKey, JSON.stringify(data));
            return data;
        });
}

// Function to fetch data from cache or server
function fetchData() {
    // Check if data is already cached
    const cachedData = localStorage.getItem(cacheKey);
    if (cachedData) {
        // Parse cached data and return
        return Promise.resolve(JSON.parse(cachedData));
    } else {
        // Fetch data from server
        return fetchDataFromServer();
    }
}


  fetchData()
  .then(data => { 

            // Process featured items
            const featuredItems = data.featuredItems;
            let currentItemIndex = 0;

            // Select the container elements for featured items
            const itemNameElement = document.querySelector('.hero-feature h3');
            const itemPriceElement = document.querySelector('.hero-feature .feautured.item.price');
            const itemImageElement = document.querySelector('.rentals-hero-img img');
            const leftButton = document.querySelector('.left-button');
            const rightButton = document.querySelector('.right-button');

            // Function to update the featured item content
            function updateFeaturedItem() {
                const currentItem = featuredItems[currentItemIndex];
                itemNameElement.textContent = currentItem.name;
                itemPriceElement.textContent = currentItem.price;
                // Ensure the image path is constructed correctly
                itemImageElement.src = baseURL + currentItem.image;
                itemImageElement.alt = currentItem.name;
            }

            // Initial call to update the featured item
            updateFeaturedItem();

            // Function to handle click on left button
            function handleLeftButtonClick() {
                currentItemIndex = (currentItemIndex - 1 + featuredItems.length) % featuredItems.length;
                updateFeaturedItem();
            }

            // Function to handle click on right button
            function handleRightButtonClick() {
                currentItemIndex = (currentItemIndex + 1) % featuredItems.length;
                updateFeaturedItem();
            }

            // Add event listeners to left and right buttons
            leftButton.addEventListener('click', handleLeftButtonClick);
            rightButton.addEventListener('click', handleRightButtonClick);

            // Function to automatically slide to the next item every 10 seconds
            function autoSlide() {
                currentItemIndex = (currentItemIndex + 1) % featuredItems.length;
                updateFeaturedItem();
            }

            // Call autoSlide function every 10 seconds
            setInterval(autoSlide, 10000);
        })
        .catch(error => {
            console.error('There was a problem fetching the JSON data:', error);
        });
