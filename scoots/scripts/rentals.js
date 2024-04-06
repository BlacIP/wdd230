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