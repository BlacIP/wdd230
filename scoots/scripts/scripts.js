function closeBanner() {
    document.querySelector('.banner').style.display = 'none';
}

// const baseURL = "https://blacip.github.io/wdd230/";
// const linksURL = "https://blacip.github.io/wdd230/scoots/data/scoots.json";
// const cacheKey = "cachedData";

// Function to fetch data from the server
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

// Use cached data or fetch new data
fetchData()
    .then(data => {
        // Process social icons
        data.socialIcons.forEach(social => {
            const socialType = social.social;
            const whiteIconURL = baseURL + social.whiteIconURL;
            const colorIconURL = baseURL + social.colorIconURL;

            // Set default background image (white icon) for each social media icon
            document.querySelector(`.social-icon[data-social="${socialType}"]`).style.backgroundImage = `url(${whiteIconURL})`;

            // Add event listeners for mouseover and mouseout events
            document.querySelector(`.social-icon[data-social="${socialType}"]`).addEventListener('mouseover', function () {
                this.style.backgroundImage = `url(${colorIconURL})`;
            });

            document.querySelector(`.social-icon[data-social="${socialType}"]`).addEventListener('mouseout', function () {
                this.style.backgroundImage = `url(${whiteIconURL})`;
            });
        });

        // // Process featured items
        // const featuredItems = data.featuredItems;
        // let currentItemIndex = 0;

        // // Select the container elements for featured items
        // const itemNameElement = document.querySelector('.hero-feature h3');
        // const itemPriceElement = document.querySelector('.hero-feature .feautured.item.price');
        // const itemImageElement = document.querySelector('.rentals-hero-img img');
        // const leftButton = document.querySelector('.left-button');
        // const rightButton = document.querySelector('.right-button');

        // // Function to update the featured item content
        // function updateFeaturedItem() {
        //     const currentItem = featuredItems[currentItemIndex];
        //     itemNameElement.textContent = currentItem.name;
        //     itemPriceElement.textContent = currentItem.price;
        //     // Ensure the image path is constructed correctly
        //     itemImageElement.src = baseURL + currentItem.image;
        //     itemImageElement.alt = currentItem.name;
        // }

        // // Initial call to update the featured item
        // updateFeaturedItem();

        // // Function to handle click on left button
        // function handleLeftButtonClick() {
        //     currentItemIndex = (currentItemIndex - 1 + featuredItems.length) % featuredItems.length;
        //     updateFeaturedItem();
        // }

        // // Function to handle click on right button
        // function handleRightButtonClick() {
        //     currentItemIndex = (currentItemIndex + 1) % featuredItems.length;
        //     updateFeaturedItem();
        // }

        // // Add event listeners to left and right buttons
        // leftButton.addEventListener('click', handleLeftButtonClick);
        // rightButton.addEventListener('click', handleRightButtonClick);

        // // Function to automatically slide to the next item every 10 seconds
        // function autoSlide() {
        //     currentItemIndex = (currentItemIndex + 1) % featuredItems.length;
        //     updateFeaturedItem();
        // }

        // // Call autoSlide function every 10 seconds
        // setInterval(autoSlide, 10000);
    })
    .catch(error => {
        console.error('There was a problem fetching the JSON data:', error);
    });
    

//     const baseURL = "https://blacip.github.io/wdd230/";
// const linksURL = "https://blacip.github.io/wdd230/scoots/data/scoots.json";

fetch(linksURL)
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
      imageWrapper.src = baseURL + rental.details[0].image; // Use the first image from details
      imageWrapper.alt = rental.type;

      const h3 = currentProductImage.querySelector('h3');
      h3.textContent = rental.type;

      const ul = currentProductImage.querySelector('ul');
      ul.innerHTML = ''; // Clear existing list items

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
