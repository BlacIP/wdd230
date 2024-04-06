function closeBanner() {
    document.querySelector('.banner').style.display = 'none';
}


// // Replace 'YOUR_API_KEY' with your actual OpenWeatherMap API key
// const apiKey = '335693caab24c80dc3e31365307b3f55';
// // Replace 'YOUR_CITY' with your desired city name
// const city = 'cozumel';

// // Fetch current weather data
// fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
//   .then(response => response.json())
//   .then(data => {
//     document.getElementById('current-temperature').innerHTML = `Current Temperature: ${data.main.temp}°C`;
//     document.getElementById('current-humidity').innerHTML = `Current Humidity: ${data.main.humidity}%`;
//     document.getElementById('current-pressure').innerHTML = `Pressure: ${data.main.pressure} hPa`;
//     document.getElementById('current-visibility').innerHTML = `Visibility: ${data.visibility} meters`;
//     document.getElementById('current-wind-speed').innerHTML = `Wind Speed: ${data.wind.speed} m/s`;
//     document.getElementById('current-wind-direction').innerHTML = `Wind Direction: ${data.wind.deg}°`;
//     document.getElementById('current-cloudiness').innerHTML = `Cloudiness: ${data.clouds.all}%`;
//     document.getElementById('current-weather-description').innerHTML = `Weather: ${data.weather[0].main} - ${data.weather[0].description}`;
//     document.getElementById('current-weather-icon').src = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;

//     // Additional data points
//     document.getElementById('current-coordinates').innerHTML = `Coordinates: [${data.coord.lat}, ${data.coord.lon}]`;
//     document.getElementById('current-sunrise').innerHTML = `Sunrise: ${new Date(data.sys.sunrise * 1000).toLocaleTimeString()}`;
//     document.getElementById('current-sunset').innerHTML = `Sunset: ${new Date(data.sys.sunset * 1000).toLocaleTimeString()}`;
//     document.getElementById('current-date').innerHTML = `Date: ${new Date(data.dt * 1000).toDateString()}`;
//     document.getElementById('current-timezone').innerHTML = `Timezone: ${data.timezone}`;
    
//     // City name and country
//     document.getElementById('current-city').innerHTML = `City: ${data.name}`;
//     document.getElementById('current-country').innerHTML = `Country: ${data.sys.country}`;

//     const maxTemp = data.main.temp_max;
//     const bannerMessage = `Today's high temperature: ${maxTemp}°C`;
//     document.querySelector('.banner p').textContent = bannerMessage;
//   });


// // Fetch next day's forecast at 15:00
// fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`)
//   .then(response => response.json())
//   .then(data => {
//     const forecast = data.list.find(item => item.dt_txt.includes("15:00:00"));

//     if (forecast) {
//       const tomorrowDate = new Date(forecast.dt_txt);
      
//       document.getElementById('next-day-forecast-temp').innerHTML = `Forecasted Temperature at 15:00: ${forecast.main.temp}°C`;
//       document.getElementById('next-day-forecast-humidity').innerHTML = `Humidity: ${forecast.main.humidity}%`;
//       document.getElementById('next-day-forecast-pressure').innerHTML = `Pressure: ${forecast.main.pressure} hPa`;
//       document.getElementById('next-day-forecast-cloudiness').innerHTML = `Cloudiness: ${forecast.clouds.all}%`;
//       document.getElementById('next-day-forecast-wind-speed').innerHTML = `Wind Speed: ${forecast.wind.speed} m/s`;
//       document.getElementById('next-day-forecast-wind-direction').innerHTML = `Wind Direction: ${forecast.wind.deg}°`;
//       document.getElementById('next-day-forecast-description').innerHTML = `Weather: ${forecast.weather[0].main} - ${forecast.weather[0].description}`;
//       document.getElementById('next-day-forecast-icon').src = `https://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`;
  
//       // Additional data points
//       document.getElementById('next-day-forecast-date').innerHTML = `Date: ${tomorrowDate.toDateString()}`;
//     } else {
//       // Handle case when forecast data is not available
//       console.error('Error fetching next day forecast: Forecast data is undefined');
//     }
//   })
//   .catch(error => {
//     console.error('Error fetching next day forecast:', error);
//   });



  const baseURL = "https://blacip.github.io/wdd230/";
  const linksURL = "https://blacip.github.io/wdd230/scoots/data/socials.json";
  
  // Fetch the JSON data
  fetch(linksURL)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      // Process the JSON data and create the socialIcons object
      const socialIcons = {};
      data.forEach(social => {
        socialIcons[social.social] = {
          white: baseURL + social.whiteIconURL,
          color: baseURL + social.colorIconURL
        };
  
        // Set the default background image (white icon) for each social media icon
        document.querySelector(`.social-icon[data-social="${social.social}"]`).style.backgroundImage = `url(${socialIcons[social.social].white})`;
      });
  
      // Add event listeners to each social media icon
      document.querySelectorAll('.social-icon').forEach(icon => {
        icon.addEventListener('mouseover', function() {
          const socialType = this.getAttribute('data-social');
          this.style.backgroundImage = `url(${socialIcons[socialType].color})`;
        });
  
        icon.addEventListener('mouseout', function() {
          const socialType = this.getAttribute('data-social');
          this.style.backgroundImage = `url(${socialIcons[socialType].white})`;
        });
      });
    })
    .catch(error => {
      console.error('There was a problem fetching the JSON data:', error);
    });
  



const currentYear = new Date().getFullYear();
document.querySelector('.footer-bottom p').textContent = `© ${currentYear} | Scoots - A Motor Scooter Rental Company | Boluwatife Adebiyi Omotoyinbo | WDD230 Project`;


const lastModifiedDate = document.lastModified;
document.getElementById('lastModified').textContent = `| Last Modified: ${lastModifiedDate}`;

function callHeader(h1) {
    const spans = h1.querySelectorAll('span');
    spans.forEach((span, index) => {
        if(span.textContent.trim() !== '') {
            span.style.animation = 'none';
            span.offsetHeight;
            span.style.animation = '';
            span.style.animationDelay = `${index * 0.05}s`;
        }
    });
}