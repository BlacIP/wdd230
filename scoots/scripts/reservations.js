// const baseURL = "https://blacip.github.io/wdd230/";
// const linksURL = "https://blacip.github.io/wdd230/scoots/data/scoots.json";

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






// Select relevant elements
const selectBox = document.querySelector('.options ol');
const searchBox = document.querySelector('.search-box');
const inputBox = document.querySelector('input[type="tel"]');
const selectedOption = document.querySelector('.selected-option div');

let options = null;

// Fetch the JSON data
fetch(phonelibURL)
    .then(response => response.json())
    .then(data => {
        options = data; // Assign the fetched data to the options variable

        // Populate the country list dynamically
        data.forEach(country => {
            const option = `
                <li class="option">
                    <div>
                        <span class="iconify" data-icon="flag:${country.code.toLowerCase()}-4x3"></span>
                        <span class="country-name">${country.name}</span>
                    </div>
                    <strong>+${country.phone}</strong>
                </li> `;
            selectBox.insertAdjacentHTML('beforeend', option);
        });

        // Add event listeners
        // Add event listeners after the country list is populated
        document.querySelectorAll('.option').forEach(option => {
         option.addEventListener('click', selectOption);
        });

    })
    .catch(error => console.error('Error fetching data:', error));

function selectOption() {
    const icon = this.querySelector('.iconify').cloneNode(true);
    const phoneCode = this.querySelector('strong').cloneNode(true);

    selectedOption.innerHTML = '';
    selectedOption.append(icon, phoneCode);

    inputBox.value = phoneCode.innerText;

    selectBox.classList.remove('active');
    selectedOption.classList.remove('active');

    searchBox.value = '';
    selectBox.querySelectorAll('.hide').forEach(el => el.classList.remove('hide'));
}

function searchCountry() {
    const searchQuery = searchBox.value.toLowerCase();
    options.forEach(option => {
        const isMatched = option.name.toLowerCase().includes(searchQuery);
        option.classList.toggle('hide', !isMatched);
    });
}

selectedOption.addEventListener('click', () => {
    selectBox.classList.toggle('active');
    selectedOption.classList.toggle('active');
});