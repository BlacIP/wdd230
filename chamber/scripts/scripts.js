const currentYear = new Date().getFullYear();
document.querySelector('#year').textContent = `© ${currentYear} | Lekki Chamber of Commerce | Boluwatife Adebiyi Omotoyinbo | WDD230 Project`;


const lastModifiedDate = document.lastModified;
document.getElementById('lastModified').textContent = `| Last Modified: ${lastModifiedDate}`;

function callHeader() {
	

    // Apply animation delay to each span.
    const spans = h1.querySelectorAll('span');
    spans.forEach((span, index) => {
        // Exclude <br> by checking if span contains a letter.
        if(span.textContent.trim() !== '') {
            span.style.animationDelay = `${index * 0.05}s`;
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
	const h1 = document.querySelector('header h1');
    let newHTML = '';

    // Split the text by <br> to maintain line breaks.
    h1.innerHTML.split('<br>').forEach((part, index, array) => {
        // Wrap each letter in a span, adding <br> back except for the last part.
        newHTML += part.split('').map(letter => `<span>${letter}</span>`).join('') + (index < array.length - 1 ? '<br>' : '');
    });

    h1.innerHTML = newHTML; // Set the modified HTML back to the h1.
  setInterval(() => {
	callHeader()
  }, 5000);
});

const hamButton = document.querySelector('#menu');
const navigation = document.querySelector('.nav');

hamButton.addEventListener('click', () => {
	navigation.classList.toggle('open');
	hamButton.classList.toggle('open');
});