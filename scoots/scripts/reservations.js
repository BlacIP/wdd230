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
