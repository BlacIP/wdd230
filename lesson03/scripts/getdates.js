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