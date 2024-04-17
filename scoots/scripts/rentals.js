document.querySelectorAll('.sidebar-btn').forEach(btn => {
  btn.addEventListener('click', () => {
      // This assumes each button controls visibility of a corresponding content section.
      const contentId = btn.getAttribute('data-content');
      const content = document.getElementById(contentId);

      // Toggle the 'active' class on the clicked content and sidebar button
      if (content.classList.contains('active')) {
          content.classList.remove('active');
          btn.classList.remove('active');
      } else {
          document.querySelectorAll('.content').forEach(c => c.classList.remove('active'));
          document.querySelectorAll('.sidebar-btn').forEach(b => b.classList.remove('active'));
          content.classList.add('active');
          btn.classList.add('active');
      }
  });
});




// Fetch the JSON data
fetch(scootsURL)
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
        productImageDiv.appendChild(a); 
      });
    });
  })
  .catch(error => {
    console.error('There was a problem fetching the JSON data:', error);
  });


  function fetchDataFromServer() {
    return fetch(scootsURL)
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
                itemImageElement.src = baseURL + currentItem.image;
                itemImageElement.alt = currentItem.name;
            }

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

            function autoSlide() {
                currentItemIndex = (currentItemIndex + 1) % featuredItems.length;
                updateFeaturedItem();
            }

            setInterval(autoSlide, 10000);
        })
        .catch(error => {
            console.error('There was a problem fetching the JSON data:', error);
        });




fetch(scootsURL)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    const pricing = data.pricing;
    const tableBody = document.querySelector('.pricing-table tbody');

    pricing.forEach(item => {
      const row = document.createElement('tr');

      const rentalTypeCell = document.createElement('td');
      rentalTypeCell.textContent = item.rentalType;
      row.appendChild(rentalTypeCell);

      const halfDayReservationCell = document.createElement('td');
      halfDayReservationCell.textContent = `$${item.halfDayReservation.price}`;
      row.appendChild(halfDayReservationCell);

      const fullDayReservationCell = document.createElement('td');
      fullDayReservationCell.textContent = `$${item.fullDayReservation}`;
      row.appendChild(fullDayReservationCell);

      const halfDayWalkInCell = document.createElement('td');
      halfDayWalkInCell.textContent = `$${item.halfDayWalkIn.price}`;
      row.appendChild(halfDayWalkInCell);

      const fullDayWalkInCell = document.createElement('td');
      fullDayWalkInCell.textContent = `$${item.fullDayWalkIn}`;
      row.appendChild(fullDayWalkInCell);

      tableBody.appendChild(row);
    });
  })
  .catch(error => {
    console.error('There was a problem fetching the JSON data:', error);
  });

        

//   document.getElementById('dropdownMenu').addEventListener('change', function() {
//     // Hide all content divs first
//     document.querySelectorAll('.content').forEach(content => {
//         content.classList.remove('active');
//     });

//     // Find the content div that matches the selected option's value and display it
//     const selectedContentId = this.value;
//     const contentToShow = document.getElementById(selectedContentId);
//     if (contentToShow) {
//         contentToShow.classList.add('active');
//     }
// });

// Fetch the JSON data
// Fetch the JSON data
fetch(scootsURL)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    const dropdown = document.getElementById('dropdownMenu');
    const customOptionsContainer = document.querySelector('.custom-options');
    const contents = document.querySelectorAll('.content');

    // Empty the dropdown and custom options container first if needed
    dropdown.innerHTML = '';
    customOptionsContainer.innerHTML = '';

    data.rentals.forEach((rental, index) => {
      // Create new option element for the native select dropdown
      const option = document.createElement('option');
      option.textContent = rental.type;
      option.value = `content${index + 1}`;
      dropdown.appendChild(option);

      // Create new custom option for the custom dropdown
      const customOption = document.createElement('span');
      customOption.classList.add('custom-option');
      customOption.textContent = rental.type;
      customOption.setAttribute('data-value', `content${index + 1}`);
      customOptionsContainer.appendChild(customOption);

      // Ensure corresponding content divs are correctly ID'd and initially hidden
      const contentDiv = contents[index];
      contentDiv.id = `content${index + 1}`;
      contentDiv.classList.remove('active');
      if (index === 0) {
        customOption.classList.add('selected');
        contentDiv.classList.add('active');
        dropdown.selectedIndex = 0;
      }
    });

    // Set the visible text of the dropdown trigger to the first option's text
    if (data.rentals.length > 0) {
        document.querySelector('.custom-select__trigger span').textContent = data.rentals[0].type;
    }

    // Add event listeners to custom options
    document.querySelectorAll('.custom-option').forEach(option => {
        option.addEventListener('click', function() {
            // Sync the native select dropdown
            dropdown.value = this.getAttribute('data-value');
            document.querySelectorAll('.custom-option').forEach(opt => opt.classList.remove('selected'));
            this.classList.add('selected');
            document.querySelector('.custom-select__trigger span').textContent = this.textContent;
            document.querySelector('.custom-options').style.display = 'none'; // Close the dropdown

            // Show the corresponding content
            const selectedContentId = this.getAttribute('data-value');
            contents.forEach(content => {
                content.classList.remove('active');
            });
            document.getElementById(selectedContentId).classList.add('active');
        });
    });

    // Ensure the native select syncs with the custom dropdown, used as a fallback
    dropdown.addEventListener('change', function() {
      // Hide all content elements
      contents.forEach(content => {
        content.classList.remove('active');
      });

      // Show the content that matches the dropdown's current value
      const selectedContentId = this.value;
      const contentToShow = document.getElementById(selectedContentId);
      if (contentToShow) {
        contentToShow.classList.add('active');
      }
    });
  })
  .catch(error => {
    console.error('There was a problem fetching the JSON data:', error);
  });



  document.querySelector('.custom-select__trigger').addEventListener('click', function(event) {
    const optionsDisplay = document.querySelector('.custom-options');
    optionsDisplay.style.display = optionsDisplay.style.display === 'block' ? 'none' : 'block';
    event.stopPropagation(); // Stop the click from immediately propagating to document
});

document.querySelectorAll('.custom-option').forEach(option => {
    option.addEventListener('click', function() {
        let value = this.getAttribute('data-value');
        document.getElementById('dropdownMenu').value = value; // Sync the select
        document.querySelector('.custom-select__trigger span').textContent = this.textContent;
        document.querySelectorAll('.custom-option').forEach(option => option.classList.remove('selected'));
        this.classList.add('selected');
        document.querySelector('.custom-options').style.display = 'none'; // Hide the dropdown
    });
});

// document.addEventListener('click', function(e) {
//     const customSelect = document.querySelector('.custom-select');
//     if (!customSelect.contains(e.target)) {
//         document.querySelector('.custom-options').style.display = 'none'; // Hide the dropdown
//     }
// });

// Ensure the DOM is fully loaded before executing scripts
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.custom-option').forEach(option => {
      option.addEventListener('click', function() {
          const allOptions = document.querySelectorAll('.custom-option');
          allOptions.forEach(opt => {
              opt.classList.remove('selected'); // Ensure no internal option shows selected style
          });
          this.classList.add('selected'); // Still mark this to manage selection, but it won't affect style now

          // Update the visible text and style of the dropdown trigger
          const triggerSpan = document.querySelector('.custom-select__trigger span');
          triggerSpan.textContent = this.textContent;
          const triggerParent = triggerSpan.parentNode;
          triggerParent.style.backgroundColor = 'var(--black)'; // Set active background color
          triggerParent.style.color = 'var(--white-smoke)'; // Set active text color

          document.querySelector('.custom-options').style.display = 'none'; // Close dropdown

          // Sync the native select dropdown
          const dropdown = document.getElementById('dropdownMenu');
          dropdown.value = this.getAttribute('data-value');

          // Update content visibility
          const selectedContentId = this.getAttribute('data-value');
          const contents = document.querySelectorAll('.content');
          contents.forEach(content => {
              content.classList.remove('active');
              if (content.id === selectedContentId) {
                  content.classList.add('active');
              }
          });
      });
  });

  // Handle clicks outside the dropdown to close it
  document.addEventListener('click', function(e) {
      const customSelect = document.querySelector('.custom-select');
      if (!customSelect.contains(e.target)) {
          document.querySelector('.custom-options').style.display = 'none';
      }
  });
});
