// Select HTML elements in the document
const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption');

const url = 'https://api.openweathermap.org/data/2.5/weather?lat=6.5244&lon=3.3792&units=imperial&appid=335693caab24c80dc3e31365307b3f55';

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
  
  
