const currentYear = new Date().getFullYear();
document.querySelector('footer p').textContent = `© ${currentYear} | Boluwatife Adebiyi Omotoyinbo | Lagos, Nigeria`;


const lastModifiedDate = document.lastModified;
document.getElementById('lastModified').textContent = `Last Modified: ${lastModifiedDate}`;
