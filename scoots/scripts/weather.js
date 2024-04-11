// Fetch current weather data
const currentWeatherPromise = fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
  .then(response => response.json())
  .then(data => {
    const maxTemp = data.main.temp_max;
    const bannerMessage = `Today's high temperature: ${maxTemp}°C`;
    document.querySelector('.banner p').textContent = bannerMessage;

    document.getElementById('current-temperature').innerHTML = ` ${data.main.temp}°C`;
    document.getElementById('current-humidity').innerHTML = `Humidity: ${data.main.humidity}%`;
    document.getElementById('current-pressure').innerHTML = `Pressure: ${data.main.pressure} hPa`;
    document.getElementById('current-visibility').innerHTML = `Visibility: ${data.visibility} meters`;
    document.getElementById('current-wind-speed').innerHTML = `Wind Speed: ${data.wind.speed} m/s`;
    document.getElementById('current-wind-direction').innerHTML = `Wind Direction: ${data.wind.deg}°`;
    document.getElementById('current-cloudiness').innerHTML = `Cloudiness: ${data.clouds.all}%`;
    document.getElementById('current-weather-description').innerHTML = `${data.weather[0].description}`;
    document.getElementById('current-weather-icon').src = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;

    // Additional data points
    document.getElementById('current-coordinates').innerHTML = `Coordinates: [${data.coord.lat}, ${data.coord.lon}]`;
    document.getElementById('current-sunrise').innerHTML = `Sunrise: ${new Date(data.sys.sunrise * 1000).toLocaleTimeString()}`;
    document.getElementById('current-sunset').innerHTML = `Sunset: ${new Date(data.sys.sunset * 1000).toLocaleTimeString()}`;
    document.getElementById('current-date').innerHTML = `, ${new Date(data.dt * 1000).toDateString()}`;
    document.getElementById('current-timezone').innerHTML = `Timezone: ${data.timezone}`;
    
    // City name and country
    document.getElementById('current-city').innerHTML = ` ${data.name}`;
    document.getElementById('current-country').innerHTML = `, ${data.sys.country}`;
  });

// Fetch next day's forecast data
const forecastPromise = fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`)
  .then(response => response.json())
  .then(data => {
    // console.log(data); // Log the entire data object to the console

    const forecast = data.list.find(item => {
      const dt_txt = item.dt_txt;
      return dt_txt && dt_txt.includes("15:00:00");
    });

    if (forecast) {
      const tomorrowDate = new Date(forecast.dt_txt);
      
      document.getElementById('next-day-forecast-temp').innerHTML = ` ${forecast.main.temp}°C`;
      document.getElementById('next-day-forecast-humidity').innerHTML = `Humidity: ${forecast.main.humidity}%`;
      document.getElementById('next-day-forecast-pressure').innerHTML = `Pressure: ${forecast.main.pressure} hPa`;
      document.getElementById('next-day-forecast-cloudiness').innerHTML = `Cloudiness: ${forecast.clouds.all}%`;
      document.getElementById('next-day-forecast-wind-speed').innerHTML = `Wind Speed: ${forecast.wind.speed} m/s`;
      document.getElementById('next-day-forecast-wind-direction').innerHTML = `Wind Direction: ${forecast.wind.deg}°`;
      document.getElementById('next-day-forecast-description').innerHTML = `${forecast.weather[0].description}`;
      document.getElementById('next-day-forecast-icon').src = `https://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`;
  
      // // Additional data points
      // document.getElementById('next-day-forecast-date').innerHTML = `Date: ${tomorrowDate.toDateString()}`;
    } else {
      // Handle case when forecast data is not available
      console.error('Error fetching next day forecast: Forecast data is undefined');
    }
  });

// Wait for both promises to resolve using Promise.all()
Promise.all([currentWeatherPromise, forecastPromise])
  .catch(error => {
    console.error('Error fetching weather data:', error);
  });
