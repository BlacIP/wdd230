const currentYear = new Date().getFullYear();
document.querySelector('footer p').textContent = `© ${currentYear} | Boluwatife Adebiyi Omotoyinbo | Lagos, Nigeria`;


const lastModifiedDate = document.lastModified;
document.getElementById('lastModified').textContent = `Last Modified: ${lastModifiedDate}`;

const hamButton = document.querySelector('#menu');
const navigation = document.querySelector('.nav');

hamButton.addEventListener('click', () => {
	navigation.classList.toggle('open');
	hamButton.classList.toggle('open');
});

const visitsDisplay = document.querySelector(".visits");
let numVisits = Number(window.localStorage.getItem("numVisits-ls")) || 0;
if (numVisits !== 0) {
	visitsDisplay.textContent = ` Page Visits: ${numVisits}`;
} else {
	visitsDisplay.textContent = `This is your first visit. 🥳 Welcome!`;
}

numVisits++;

localStorage.setItem("numVisits-ls", numVisits);
