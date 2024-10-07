/*
Script file for registration webpage
HTML,CSS AND JS Assignmet 
Author: Taofeek Oduola 
Date: 1st October 2024 
Course: CPRG-210-A --> */

// Get the form, submit, and reset buttons
const form = document.getElementById('register-form');
const submitButton = document.getElementById('submit-btn');
const resetButton = document.getElementById('reset-btn');

// Function to display error message
function showError(input, message) {
    const errorSpan = document.createElement('span');
    errorSpan.style.color = 'red';
    errorSpan.textContent = message;
    input.parentNode.insertBefore(errorSpan, input.nextSibling);  // Insert error message after input field
}

// Function to clear previous error messages
function clearErrors() {
    const errors = document.querySelectorAll('span');
    errors.forEach(error => error.remove());
}

// Validation function for each field
function validateForm() {
    clearErrors();  // Clear previous errors
    let isValid = true;

    // First Name validation
    const firstName = document.getElementById('firstname');
    if (firstName.value.trim() === '') {
        showError(firstName, 'First Name is required.');
        isValid = false;
    }

    // Last Name validation
    const lastName = document.getElementById('lastname');
    if (lastName.value.trim() === '') {
        showError(lastName, 'Last Name is required.');
        isValid = false;
    }

    // Email validation
    const email = document.getElementById('email');
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (email.value.trim() === '') {
        showError(email, 'Email is required.');
        isValid = false;
    } else if (!emailPattern.test(email.value.trim())) {
        showError(email, 'Please enter a valid email address.');
        isValid = false;
    }

    // Age validation
    const age = document.getElementById('age');
    if (age.value.trim() === '' || isNaN(age.value) || parseInt(age.value) <= 0) {
        showError(age, 'Please enter a valid age.');
        isValid = false;
    }

    // Password validation
    const password = document.getElementById('password');
    if (password.value.trim() === '' || password.value.length < 8) {
        showError(password, 'Password must be at least 8 characters.');
        isValid = false;
    }

    // City validation
    const city = document.getElementById('city');
    if (city.value.trim() === '') {
        showError(city, 'City is required.');
        isValid = false;
    }

    // Province validation
    const province = document.getElementById('province');
    if (province.value.trim() === '') {
        showError(province, 'Province is required.');
        isValid = false;
    }

    // Postal Code validation
    const postalCode = document.getElementById('postalcode');
    if (postalCode.value.trim() === '') {
        showError(postalCode, 'Postal Code is required.');
        isValid = false;
    }

    // Phone Number validation
    const phoneNumber = document.getElementById('mobile');
    const phonePattern = /^[0-9]{10}$/;
    if (phoneNumber.value.trim() === '') {
        showError(phoneNumber, 'Phone Number is required.');
        isValid = false;
    } else if (!phonePattern.test(phoneNumber.value.trim())) {
        showError(phoneNumber, 'Please enter a valid 10-digit phone number.');
        isValid = false;
    }

    return isValid;  // Return whether the form is valid or not
}

// Event handler for the submit button
submitButton.addEventListener('click', function (event) {
    // Validate form inputs
    const isFormValid = validateForm();

    // If the form is invalid, prevent submission
    if (!isFormValid) {
        event.preventDefault();
    } else {
        // Show confirmation dialog
        const isConfirmed = confirm('Are you sure you want to submit the form?');
        if (!isConfirmed) {
            event.preventDefault();  // Cancel submission
        }
    }
});

// Event handler for the reset button
resetButton.addEventListener('click', function (event) {
    // Show confirmation dialog
    const isConfirmed = confirm('Are you sure you want to reset the form? All inputted data will be lost.');

    // If the user cancels, prevent the form reset
    if (!isConfirmed) {
        event.preventDefault();
    } else {
        // Clear the form and previous errors
        clearErrors();
        form.reset();
    }
});
// Get the form fields
const fields = {
    firstname: document.getElementById('firstname'),
    lastname: document.getElementById('lastname'),
    email: document.getElementById('email'),
    age: document.getElementById('age'),
    password: document.getElementById('password'),
    city: document.getElementById('city'),
    province: document.getElementById('province'),
    postalcode: document.getElementById('postalcode'),
    mobile: document.getElementById('mobile')
};

// Get the description paragraphs
const descriptions = {
    firstname: document.getElementById('first-name-desc'),
    lastname: document.getElementById('last-name-desc'),
    email: document.getElementById('email-desc'),
    age: document.getElementById('age-desc'),
    password: document.getElementById('password-desc'),
    city: document.getElementById('city-desc'),
    province: document.getElementById('province-desc'),
    postalcode: document.getElementById('postalcode-desc'),
    mobile: document.getElementById('mobile-desc')
};

// Function to show the respective description
function showDescription(field) {
    descriptions[field].classList.add('active');  // Show the description
}

// Function to hide all descriptions
function hideDescription(field) {
    descriptions[field].classList.remove('active');  // Hide the description
}

// Attach event listeners for each input field
for (let field in fields) {
    fields[field].addEventListener('focus', () => showDescription(field));
    fields[field].addEventListener('blur', () => hideDescription(field));
}
