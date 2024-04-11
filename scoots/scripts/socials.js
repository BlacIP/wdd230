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
    