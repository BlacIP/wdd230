const apiKey = '335693caab24c80dc3e31365307b3f55';
const city = 'cozumel';

const baseURL = "https://blacip.github.io/wdd230/";
const scootsURL = "https://blacip.github.io/wdd230/scoots/data/scoots.json";
const phonelibURL = "https://blacip.github.io/wdd230/scoots/data/phonelib.json";
const cacheKey = "cachedData";


document.addEventListener('DOMContentLoaded', function() {
    const closeBanner = () => {
        document.querySelector('.banner').style.display = 'none';
        const links = document.querySelectorAll('a');
        links.forEach(link => {
            const href = link.getAttribute('href');
            if (href) {
                link.setAttribute('href', href.includes('?') ? href + '&bannerClosed=true' : href + '?bannerClosed=true');
            }
        });
    };

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const bannerClosed = urlParams.get('bannerClosed');

    if (bannerClosed) {
        closeBanner();
    } else {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
            .then(response => response.json())
            .then(data => {
                if (data && data.main && data.main.temp_max !== undefined) {
                    const maxTemp = data.main.temp_max;
                    const bannerMessage = `Today's high temperature: ${maxTemp}°C`;
                    document.querySelector('.banner p').textContent = bannerMessage;
                    document.querySelector('.close-btn').addEventListener('click', closeBanner);
                }
            })
            .catch(error => console.error('Failed to fetch weather data:', error));
    }
});




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

// Function to fetch data from cache or server
function fetchData() {
    // Check if data is already cached
    const cachedData = localStorage.getItem(cacheKey);
    if (cachedData) {
        // Parse cached data and return
        return Promise.resolve(JSON.parse(cachedData));
    } else {
        // Fetch data from server
        return fetchDataFromServer();
    }
}

// Use cached data or fetch new data
fetchData()
    .then(data => {
        // Process social icons
        data.socialIcons.forEach(social => {
            const socialType = social.social;
            const whiteIconURL = baseURL + social.whiteIconURL;
            const colorIconURL = baseURL + social.colorIconURL;

            // Set default background image (white icon) for each social media icon
            document.querySelector(`.social-icon[data-social="${socialType}"]`).style.backgroundImage = `url(${whiteIconURL})`;

            // Add event listeners for mouseover and mouseout events
            document.querySelector(`.social-icon[data-social="${socialType}"]`).addEventListener('mouseover', function () {
                this.style.backgroundImage = `url(${colorIconURL})`;
            });

            document.querySelector(`.social-icon[data-social="${socialType}"]`).addEventListener('mouseout', function () {
                this.style.backgroundImage = `url(${whiteIconURL})`;
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


document.addEventListener("DOMContentLoaded", function() {
    const navLinks = document.querySelectorAll('.nav-menu a');
    const currentPath = window.location.pathname.split('/').pop();

    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        }
    });
});


const hamButton = document.querySelector('#menu');
const navigation = document.querySelector('.nav-menu');

hamButton.addEventListener('click', () => {
	navigation.classList.toggle('open');
	hamButton.classList.toggle('open');
});
