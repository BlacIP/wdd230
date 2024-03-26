// Get elements from HTML
const temperatureElement = document.getElementById('temperature');
const weatherDescriptionElement = document.getElementById('weatherDescription');
const windSpeedElement = document.getElementById('windSpeed');
const windChillElement = document.getElementById('windChill');
const forecastDataElement = document.getElementById('forecastData');
const bannerElement = document.getElementById('banner');
const closeBannerButton = document.getElementById('closeBanner');

// Function to fetch weather data from OpenWeatherMap API
async function fetchWeatherData() {
    const apiKey = '335693caab24c80dc3e31365307b3f55'; // Replace with your OpenWeatherMap API key
    const cityName = 'Lagos'; // City name
    const countryCode = 'NG'; // Country code for Nigeria
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName},${countryCode}&units=imperial&appid=${apiKey}`;
    
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log('Error fetching weather data:', error);
    }
}

// Function to fetch forecast data from OpenWeatherMap API
async function fetchForecastData() {
    const apiKey = '335693caab24c80dc3e31365307b3f55'; // Replace with your OpenWeatherMap API key
    const cityName = 'Lagos'; // City name
    const countryCode = 'NG'; // Country code for Nigeria
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName},${countryCode}&units=imperial&appid=${apiKey}`;
    
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log('Error fetching forecast data:', error);
    }
}

// Function to capitalize the first letter of every word
function capitalizeFirstLetter(str) {
    return str.replace(/\b\w/g, function(char) {
        return char.toUpperCase();
    });
}

// Function to update weather data on the webpage
async function updateWeather() {
    const weatherData = await fetchWeatherData();
    const forecastData = await fetchForecastData();
    
    // Update current weather data
    temperatureElement.textContent = weatherData.main.temp.toFixed(1);
    weatherDescriptionElement.textContent = capitalizeFirstLetter(weatherData.weather[0].description); // Capitalize weather description
    windSpeedElement.textContent = weatherData.wind.speed.toFixed(1);
    
    // Display weather icon
    const weatherIconCode = weatherData.weather[0].icon;
    const weatherIconUrl = `http://openweathermap.org/img/wn/${weatherIconCode}.png`;
    const weatherIcon = document.createElement('img');
    weatherIcon.src = weatherIconUrl;
    weatherIcon.alt = 'Weather Icon';
    weatherIcon.classList.add('weather-icon'); // Add a class to the weather icon
    weatherDescriptionElement.appendChild(weatherIcon);
    
    // Calculate and update wind chill
    updateWindChill();
    
    // Get current day
    const today = new Date();
    const currentDay = today.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
    
    // Get forecast for the next three days
    const forecastDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const nextThreeDays = [];
    for (let i = 1; i <= 3; i++) {
        const nextDayIndex = (currentDay + i) % 7;
        nextThreeDays.push(forecastDays[nextDayIndex]);
    }
    
    // Filter forecast data for the next three days
    const filteredForecast = forecastData.list.filter(day => {
        const date = new Date(day.dt * 1000);
        const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });
        return nextThreeDays.includes(dayOfWeek);
    });
    
    // Group forecast data by day
    const forecastByDay = {};
    filteredForecast.forEach(day => {
        const date = new Date(day.dt * 1000);
        const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });
        if (!forecastByDay[dayOfWeek]) {
            forecastByDay[dayOfWeek] = {
                temperatures: [],
                descriptions: [],
                icons: []
            };
        }
        forecastByDay[dayOfWeek].temperatures.push(day.main.temp);
        forecastByDay[dayOfWeek].descriptions.push(capitalizeFirstLetter(day.weather[0].description)); // Capitalize weather description
        forecastByDay[dayOfWeek].icons.push(day.weather[0].icon);
    });
    
        // Update forecast data for each day
    forecastDataElement.innerHTML = ''; // Clear previous forecast data
    for (const dayOfWeek in forecastByDay) {
        if (forecastByDay.hasOwnProperty(dayOfWeek)) {
            const temperatures = forecastByDay[dayOfWeek].temperatures;
            const descriptions = forecastByDay[dayOfWeek].descriptions;
            const icons = forecastByDay[dayOfWeek].icons;
            const averageTemperature = (temperatures.reduce((acc, curr) => acc + curr, 0) / temperatures.length).toFixed(1);
            const forecastItem = document.createElement('div');
            forecastItem.classList.add('temp'); // Add a class to the forecast item
            forecastItem.innerHTML = `<p><strong>${dayOfWeek}</strong>:  ${averageTemperature} °F, ${descriptions[0]} `;
            const iconUrl = `http://openweathermap.org/img/w/${icons[0]}.png`;
            const iconElement = document.createElement('img');
            iconElement.src = iconUrl;
            iconElement.alt = 'Weather Icon';
            iconElement.classList.add('weather-icon'); // Add a class to the weather icon
            forecastItem.appendChild(iconElement);
            forecastDataElement.appendChild(forecastItem);
        }
    }

}



// Function to calculate wind chill
function calculateWindChill(temperature, windSpeed) {
    if (temperature <= 50 && windSpeed > 3.0) {
        return (35.74 + 0.6215 * temperature - 35.75 * Math.pow(windSpeed, 0.16) + 0.4275 * temperature * Math.pow(windSpeed, 0.16)).toFixed(2);
    } else {
        return 'N/A';
    }
}

// Function to update wind chill value on the webpage
function updateWindChill() {
    const temperature = parseFloat(temperatureElement.textContent);
    const windSpeed = parseFloat(windSpeedElement.textContent);
    const windChill = calculateWindChill(temperature, windSpeed);
    windChillElement.textContent = windChill;
}



// Function to display the popup banner on specified days
function displayPopupBanner() {
    const today = new Date();
    const dayOfWeek = today.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
    
    if (dayOfWeek >= 1 && dayOfWeek <= 3) { // Display on Monday, Tuesday, Wednesday
        document.getElementById('overlay').style.display = 'block'; // Show overlay
        document.getElementById('popupBanner').style.display = 'block'; // Show popup banner
    }
}

// Function to close the popup banner
function closePopupBanner() {
    document.getElementById('overlay').style.display = 'none'; // Hide overlay
    document.getElementById('popupBanner').style.display = 'none'; // Hide popup banner
}


// Call the function to display the popup banner on specified days
displayPopupBanner();


// Initial function calls
updateWeather();
// updateBannerVisibility();
