
const currentYear = new Date().getFullYear();
document.querySelector('.info p').textContent = `© ${currentYear} | Lekki Chamber of Commerce | Boluwatife Adebiyi Omotoyinbo | WDD230 Project`;


const lastModifiedDate = document.lastModified;
document.getElementById('lastModified').textContent = `| Last Modified: ${lastModifiedDate}`;

function callHeader(h1) {
    // Force reflow or toggle animation class here
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

document.addEventListener('DOMContentLoaded', () => {
    const h1 = document.querySelector('header h1');
    let newHTML = '';

    h1.innerHTML.split('<br>').forEach((part, index, array) => {
        newHTML += part.split('').map(letter => `<span>${letter}</span>`).join('') + (index < array.length - 1 ? '<br>' : '');
    });

    h1.innerHTML = newHTML;

    // Initially call and set interval
    callHeader(h1);
    setInterval(() => {
        callHeader(h1);
    }, 5000);
});

const hamButton = document.querySelector('#menu');
const navigation = document.querySelector('.nav');

hamButton.addEventListener('click', () => {
	navigation.classList.toggle('open');
	hamButton.classList.toggle('open');
});

const modeSwitch = document.querySelector("#modeSwitch");
const mainContent = document.querySelector("#mainContent");

modeSwitch.addEventListener("change", () => {
  if (modeSwitch.checked) {
    // Dark mode
    mainContent.classList.add("dark-mode");
  } else {
    // Light mode
    mainContent.classList.remove("dark-mode");
  }
});


// Function to set the active link
function setActiveLink() {
    // Get the current page URL
    const currentPageUrl = window.location.href;

    // Get all links in the navigation menu
    const links = document.querySelectorAll('.nav-list a');

    // Loop through each link and check if its href matches the current page URL
    links.forEach(link => {
        if (link.href === currentPageUrl) {
            link.classList.add('active');
        }
    });
}

// Call the function when the page loads
window.onload = setActiveLink;


