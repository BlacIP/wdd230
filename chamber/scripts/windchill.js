// Get temperature and wind speed from HTML
const temperatureElement = document.getElementById('temperature');
const windSpeedElement = document.getElementById('windSpeed');
const windChillElement = document.getElementById('windChill');

// Function to calculate wind chill
function calculateWindChill(temperature, windSpeed) {
    // Check if temperature and wind speed meet specification limits
    if (temperature <= 50 && windSpeed > 3.0) {
        // Calculate wind chill using the formula
        const windChill = 35.74 + 0.6215 * temperature - 35.75 * Math.pow(windSpeed, 0.16) + 0.4275 * temperature * Math.pow(windSpeed, 0.16);
        return windChill.toFixed(2); // Round to two decimal places
    } else {
        return 'N/A';
    }
}

// Update wind chill value on the webpage
function updateWindChill() {
    const temperature = parseFloat(temperatureElement.textContent);
    const windSpeed = parseFloat(windSpeedElement.textContent);
    const windChill = calculateWindChill(temperature, windSpeed);
    windChillElement.textContent = windChill;
}

// Call updateWindChill initially and set up event listeners if needed
updateWindChill();
