// Function to fetch data from the JSON file
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

// Function to populate rental types based on the selected period
function populateRentalTypes(data, period) {
    const rentalTypeSelect = document.getElementById('rental-type');
    const rentals = data.pricing.filter(item => item.halfDayReservation || item.fullDayReservation);
    rentalTypeSelect.innerHTML = ""; // Clear existing options

    // Add the default option
    const defaultOption = document.createElement('option');
    defaultOption.value = "";
    defaultOption.textContent = "Select Preferred Rental Type";
    rentalTypeSelect.appendChild(defaultOption);

    rentals.forEach(rental => {
        let price;
        if (period === 'half-day') {
            price = rental.halfDayReservation ? rental.halfDayReservation.price : '';
        } else if (period === 'full-day') {
            price = rental.fullDayReservation ? rental.fullDayReservation : '';
        }

        if (price) {
            const option = document.createElement('option');
            option.value = rental.rentalType;
            option.textContent = `${rental.rentalType} - $${price}`;
            rentalTypeSelect.appendChild(option);
        }
    });
}



document.addEventListener('DOMContentLoaded', function () {
    fetchDataFromServer()
        .then(data => {
            // Populate rental types based on the initial period selection
            const initialPeriod = document.getElementById('period').value;
            populateRentalTypes(data, initialPeriod);

            // Add event listener to period select element
            document.getElementById('period').addEventListener('change', function () {
                const selectedPeriod = this.value;
                populateRentalTypes(data, selectedPeriod);
            });
        })
        .catch(error => {
            console.error('There was a problem fetching the JSON data:', error);
        });
});



// Fetch the JSON data
fetch(phonelibURL)
  .then(response => response.json())
  .then(data => {
    const countryIcon = document.querySelector('.country-icon');
    const countryDropdown = document.querySelector('.country-dropdown');
    const dropdownContent = document.querySelector('.dropdown-content');
    const countryList = document.querySelector('.country-list');
    const searchBox = document.querySelector('.search-box');
    const defaultOption = data[0]; // Get the first country as the default

    // Update the default flag icon and country code
    const flagIcon = document.querySelector('.flag-icon');
    const countryCode = document.querySelector('.country-code');
    flagIcon.appendChild(createIcon(`flag:${defaultOption.code.toLowerCase()}-4x3`));
    countryCode.textContent = `+${defaultOption.phone}`;

    // Add event listener to show/hide country dropdown
    countryIcon.addEventListener('click', toggleCountryDropdown);
    document.addEventListener('click', handleOutsideClick);

    // Function to toggle country dropdown visibility
    function toggleCountryDropdown() {
      countryDropdown.classList.toggle('show');
      if (countryDropdown.classList.contains('show')) {
        searchBox.value = ''; // Clear search box
        populateCountryList(data);
      } else {
        dropdownContent.innerHTML = ''; // Clear dropdown content
      }
    }

    // Function to populate country list
    function populateCountryList(countries) {
      countryList.innerHTML = '';
      countries.forEach(country => {
        const li = document.createElement('li');
        li.textContent = `${country.name} (+${country.phone})`;
        li.dataset.flag = `flag:${country.code.toLowerCase()}-4x3`;
        li.addEventListener('click', selectCountry);
        countryList.appendChild(li);
      });
      dropdownContent.appendChild(searchBox);
      dropdownContent.appendChild(countryList);
    }

    // Function to filter countries based on search input
    function filterCountries() {
      const searchTerm = searchBox.value.toLowerCase();
      const filteredCountries = data.filter(country =>
        country.name.toLowerCase().includes(searchTerm)
      );
      populateCountryList(filteredCountries);
    }

    // Function to select a country
    function selectCountry() {
      const selectedCountry = this.textContent.split(' ');
      const countryCode = selectedCountry[selectedCountry.length - 1].slice(1, -1);
      const countryName = selectedCountry.slice(0, -1).join(' ');
      const flagIcon = document.querySelector('.flag-icon');
      const countryCodeSpan = document.querySelector('.country-code');

      flagIcon.innerHTML = '';
      flagIcon.appendChild(createIcon(this.dataset.flag));
      countryCodeSpan.textContent = `${countryCode}`;
      countryDropdown.classList.remove('show');
    }

    // Helper function to create an icon element
    function createIcon(iconName) {
      const iconElement = document.createElement('span');
      iconElement.classList.add('iconify');
      iconElement.dataset.icon = iconName;
      return iconElement;
    }

    // Function to handle outside click
    function handleOutsideClick(event) {
      if (!countryDropdown.contains(event.target) && !countryIcon.contains(event.target)) {
        countryDropdown.classList.remove('show');
      }
    }

    // Add event listener for search input
    searchBox.addEventListener('input', filterCountries);
    searchBox.addEventListener('keydown', handleSearchBoxKeydown);

    // Function to handle search box keydown event
    function handleSearchBoxKeydown(event) {
      if (event.key === 'Backspace' || event.key === 'Delete') {
        event.stopPropagation();
      }
    }
  })
  .catch(error => console.error('Error fetching data:', error));

  // Load the Lottie animation
 var animation = bodymovin.loadAnimation({
    container: document.getElementById('lottieAnimation'),
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: '../chamber/images/success.json' 
  });
  

//   document.querySelector('a[href="#reservationForm"]').addEventListener('click', function(e) {
//     e.preventDefault(); // Prevent default anchor click behavior

//     var form = document.getElementById('reservationForm');
//     var topOfForm = form.getBoundingClientRect().top + window.scrollY - 10; // Adjust '50' as needed

//     window.scrollTo({
//         top: topOfForm,
//         behavior: 'smooth'
//     });
// });
