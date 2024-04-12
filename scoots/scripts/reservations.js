// const baseURL = "https://blacip.github.io/wdd230/";
// const linksURL = "https://blacip.github.io/wdd230/scoots/data/scoots.json";

// Function to fetch data from the JSON file
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


// Import the PhoneNumberUtil class from the google-libphonenumber library
const { PhoneNumberUtil } = require('google-libphonenumber');

// Get an instance of the PhoneNumberUtil class
const phoneUtil = PhoneNumberUtil.getInstance();

// Function to populate the country code dropdown
function populateCountryCodeDropdown() {
    // Get the select element for the country code
    const countryCodeSelect = document.getElementById('country-code');

    // Get a list of country codes
    const countryCodes = phoneUtil.getSupportedRegions();

    // Loop through the country codes and add them to the dropdown
    countryCodes.forEach(countryCode => {
        const option = document.createElement('option');
        option.value = countryCode;
        option.textContent = `+${phoneUtil.getCountryCodeForRegion(countryCode)}`;
        countryCodeSelect.appendChild(option);
    });
}

// Call the populateCountryCodeDropdown function to populate the dropdown
populateCountryCodeDropdown();

