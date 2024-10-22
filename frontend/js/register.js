/*
Script file for registration webpage
HTML,CSS AND JS Assignmet 
Author: Taofeek Oduola 
Date: 1st October 2024 
Course: CPRG-210-A --> */

// Get the form, submit, and reset buttons
const form = document.getElementById("register-form");
const submitButton = document.getElementById("submit-btn");
const resetButton = document.getElementById("reset-btn");

// Function to display error message
function showError(input, message) {
  const errorSpan = document.createElement("span");
  errorSpan.style.color = "red";
  errorSpan.textContent = message;
  input.parentNode.insertBefore(errorSpan, input.nextSibling); // Insert error message after input field
}

// Function to clear previous error messages
function clearErrors() {
  const errors = document.querySelectorAll("span");
  errors.forEach((error) => error.remove());
}

async function populateAgentDropdown() {
  try {
    const response = await fetch("/api/agents");
    const agents = await response.json();
    const dropdown = document.getElementById("agentId");
    agents.forEach((agent) => {
      const option = document.createElement("option");
      option.value = agent.AgentId;
      option.textContent = `${agent.AgtFirstName} ${agent.AgtLastName}`;
      dropdown.appendChild(option);
    });
  } catch (error) {
    console.error("Error fetching agents:", error);
  }
}

// Get the form fields data
function getFormData() {
  const formData = {
    firstname: document.getElementById("firstname").value,
    lastname: document.getElementById("lastname").value,
    address: document.getElementById("address").value,
    city: document.getElementById("city").value,
    postalcode: document.getElementById("postalcode").value,
    province: document.getElementById("province").value,
    country: document.getElementById("country").value,
    email: document.getElementById("email").value,
    agentId: document.getElementById("agentId").value,
    busphone: document.getElementById("busphone").value,
    homephone: document.getElementById("homephone").value,
  };
  return formData;
}

// Validation function for each field
function validateForm() {
  clearErrors(); // Clear previous errors
  let isValid = true;

  // First Name validation
  const firstName = document.getElementById("firstname");
  if (firstName.value.trim() === "") {
    showError(firstName, "First Name is required.");
    isValid = false;
  }

  // Last Name validation
  const lastName = document.getElementById("lastname");
  if (lastName.value.trim() === "") {
    showError(lastName, "Last Name is required.");
    isValid = false;
  }

  // Email validation
  const email = document.getElementById("email");
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (email.value.trim() === "") {
    showError(email, "Email is required.");
    isValid = false;
  } else if (!emailPattern.test(email.value.trim())) {
    showError(email, "Please enter a valid email address.");
    isValid = false;
  }

  // City validation
  const city = document.getElementById("city");
  if (city.value.trim() === "") {
    showError(city, "City is required.");
    isValid = false;
  }

  const address = document.getElementById("address");
  if (city.value.trim() === "") {
    showError(address, "Address is required.");
    isValid = false;
  }

  // Province validation
  const province = document.getElementById("province");
  if (province.value.trim() === "") {
    showError(province, "Province is required.");
    isValid = false;
  }

  // Postal Code validation
  const postalCode = document.getElementById("postalcode");
  if (postalCode.value.trim() === "") {
    showError(postalCode, "Postal Code is required.");
    isValid = false;
  }

  // Phone Number validation
  const phoneNumber = document.getElementById("busphone");
  const phonePattern = /^[0-9]{10}$/;
  if (phoneNumber.value.trim() === "") {
    showError(phoneNumber, "Phone Number is required.");
    isValid = false;
  } else if (!phonePattern.test(phoneNumber.value.trim())) {
    showError(phoneNumber, "Please enter a valid 10-digit phone number.");
    isValid = false;
  }

  return isValid; // Return whether the form is valid or not
}

// Event handler for the submit button
submitButton.addEventListener("click", async function (event) {
  console.log("submit button called!!");
  event.preventDefault();
  const isFormValid = validateForm();

  if (!isFormValid) {
    console.log("form invalid");
    return;
  }

  // Show confirmation dialog
  const isConfirmed = confirm("Are you sure you want to submit the form?");
  if (!isConfirmed) {
    console.log("Stop if user cancels");
    return; 
  }
  // If we get here, the form is valid and the user confirmed submission
  try {
    const formData = getFormData();
    console.log("customer data register.js: ", formData);
    const response = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json();

    if (result.success) {
      alert(result.message);
      console.log("result success: ", result.message);
      form.reset(); // Reset the form
    } else {
      alert("Registration failed: " + result.message);
    }
  } catch (error) {
    console.error("Error:", error);
    alert("An error occurred. Please try again later.");
  }
});

// Event handler for the reset button
resetButton.addEventListener("click", function (event) {
  // Show confirmation dialog
  const isConfirmed = confirm(
    "Are you sure you want to reset the form? All inputted data will be lost."
  );

  // If the user cancels, prevent the form reset
  if (!isConfirmed) {
    event.preventDefault();
  } else {
    // Clear the form and previous errors
    clearErrors();
    form.reset();
  }
});

document.addEventListener("DOMContentLoaded", populateAgentDropdown);
