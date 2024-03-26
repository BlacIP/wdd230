const currentYear = new Date().getFullYear();
document.querySelector('footer p').textContent = `© ${currentYear} | Boluwatife Adebiyi Omotoyinbo | Lagos, Nigeria | OpenWeatherMap.org | CC-SA 4.0`;


const lastModifiedDate = document.lastModified;
document.getElementById('lastModified').textContent = `Last Modified: ${lastModifiedDate}`;

// Select HTML elements in the document
const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption');

const url = 'https://api.openweathermap.org/data/2.5/weather?lat=49.75&lon=6.64&units=imperial&appid=335693caab24c80dc3e31365307b3f55';


async function apiFetch() {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      console.log(data); 
      displayResults(data); 
    } else {
      throw Error(await response.text());
    }
  } catch (error) {
    console.log(error);
  }
}


apiFetch();

function displayResults(data) {
    currentTemp.innerHTML = `${Math.round(data.main.temp)}&deg;F`;
    const iconsrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
  
    const desc = data.weather.map(event => event.description.charAt(0).toUpperCase() + event.description.slice(1)).join(', ');
    weatherIcon.setAttribute('src', iconsrc);
    weatherIcon.setAttribute('alt', desc);
  
  
    captionDesc.textContent = `${desc}`;
  }
  
  
