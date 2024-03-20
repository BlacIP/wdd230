// Function to validate password match
function validatePasswordMatch() {
    var password = document.getElementById('password').value;
    var confirmPassword = document.getElementById('confirm_password').value;
    var confirmError = document.getElementById('confirm-password-error');

    if (password !== confirmPassword) {
        confirmError.textContent = "Passwords do not match.";
        return false;
    } else {
        confirmError.textContent = "";
        return true;
    }
}

function displayPasswordStrength() {
    var password = document.getElementById('password').value;
    var passwordMessage = document.getElementById('password-message');

    if (password.length < 8) {
        passwordMessage.textContent = "Password should be at least 8 characters long.";
        passwordMessage.style.color = "red"; // Set color to red for weak passwords
    } else {
        passwordMessage.textContent = "Strong password";
        passwordMessage.style.color = "green"; // Set color to green for strong passwords
    }

    // Set color based on password length (4-7 characters)
    if (password.length >= 4 && password.length <= 7) {
        passwordMessage.style.color = "orange";
    }
}


// Event listeners for password and confirm password fields
document.getElementById('password').addEventListener('input', function() {
    displayPasswordStrength();
    validatePasswordMatch();
});

document.getElementById('confirm_password').addEventListener('input', function() {
    validatePasswordMatch();
});



// for Email Confirmation

document.getElementById('email').addEventListener('input', function() {
    var emailInput = this;
    var emailError = document.getElementById('email-error');
    var isValidEmail = /^[a-zA-Z0-9._%+-]+@byui\.edu$/.test(emailInput.value);

    if (!isValidEmail) {
        emailError.textContent = "Please enter a valid byui.edu email address.";
        emailInput.classList.remove('valid'); // Remove valid class if email is invalid
    } else {
        emailError.textContent = "";
        emailInput.classList.add('valid'); // Add valid class if email is valid
    }
});



// For Range Slider

const rangevalue = document.getElementById("rangevalue");
const range = document.getElementById("r");

// RANGE event listener
range.addEventListener('change', displayRatingValue);
range.addEventListener('input', displayRatingValue);

function displayRatingValue() {
    rangevalue.innerHTML = range.value;
}


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




