let fetchedPackage;
let selectedTripTypeId;
// Set today's date dynamically using JavaScript
document.addEventListener("DOMContentLoaded", function () {
    const today = new Date().toISOString().split('T')[0]; // Format as YYYY-MM-DD
    document.getElementById('booking-date').value = today;
});
const API_URL = "http://localhost:3000";
fetchPackage();

async function fetchPackage() {
    console.log('script runs in package booking');
    const urlParams = new URLSearchParams(window.location.search);
    const packageId = urlParams.get('packageId');

    // Log the packageId to verify
    console.log('Package ID:', packageId);
    fetchPackageById(packageId);
}

async function fetchPackageById(packageId) {
    try {
        // Make a GET request to the backend API to fetch the package by ID
        const response = await fetch(`${API_URL}/packages/${packageId}`);

        // Parse the JSON response
        const packageData = await response.json();
        fetchedPackage = packageData;
        // Use the package data (populate fields, etc.)
        console.log('Package Data:', packageData);

        // Now you can use the data to update your HTML or perform any actions
        document.getElementById('description').value = packageData.PkgDesc;
        document.getElementById('price').value = `$${packageData.PkgBasePrice.split(".")[0]}`;
        document.getElementById('start-date').value = packageData.PkgStartDate.split("T")[0];
        document.getElementById('end-date').value = packageData.PkgEndDate.split("T")[0];
        document.getElementById('package-name').value = packageData.PkgName; 
        document.getElementById('booking-image').src = packageData.imagePath;

    } catch (error) {
        console.error('Error fetching package by ID:', error);
    }
}

async function fetchTripTypes() {
    try {
        const response = await fetch('/triptypes'); // Adjust the endpoint as needed
        const tripTypes = await response.json();

        const tripTypeSelect = document.getElementById('tripTypeSelect'); // Ensure you have this ID in your HTML
        tripTypes.forEach(tripType => {
            const option = document.createElement('option');
            option.value = tripType.TripTypeId; // Adjust based on your table structure
            option.textContent = tripType.TTName; // Replace with the actual column name
            tripTypeSelect.appendChild(option);
        });
        tripTypeSelect.addEventListener('change', function () {
            selectedTripTypeId = this.value; // Store the selected value in the global variable
            console.log('Selected TripTypeId:', selectedTripTypeId); // You can log or use it
        });
    } catch (error) {
        console.error('Error fetching trip types:', error);
    }
}

// // Call this function to fetch and populate trip types when the page loads
fetchTripTypes();

async function submitBooking() {
    event.preventDefault(); // Prevent form from submitting the default way

    // Gather form data
    const bookingDate = document.getElementById('booking-date').value;
    const travelerCount = document.getElementById('num-travelers').value;
    const email = document.getElementById('email').value;
    const tripTypeId = selectedTripTypeId;
    const packageId = fetchedPackage.PackageId;

    // Add additional data like bookingNo and customerId
    const bookingNo = generateBookingNo(); // Function to generate a booking number (e.g., a random number)
    

    console.log(`${bookingDate}`);
    console.log(`${travelerCount}`);
    console.log(`${tripTypeId}`);
    console.log(`${packageId}`);
    console.log(`${bookingNo}`);
    // const bookingDate = "2024-10-21";
    // const travelerCount = 2;
    // const tripTypeId = "B";
    // const packageId = 1;

    // // Add additional data like bookingNo and customerId
    // const bookingNo = "b5897g"; // Function to generate a booking number (e.g., a random number)
    // const customerId = 107; // Function to get the customer ID (e.g., from a logged-in user session)

    // Prepare data to send
    const requestData = {
        bookingDate,
        bookingNo,
        travelerCount,
        tripTypeId,
        packageId,
        email
    };


    try {
        // Send the data using fetch()
        const response = await fetch(`${API_URL}/add-booking`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
        });

        const result = await response.json();
        if (response.ok) {
            // Handle success response
            alert('Booking submitted successfully!');

            window.location.href = `/thank-you-booking.html?bookingCode=${bookingNo}`;
            console.log(result);
        } else {
            // Handle error response
            console.error('Error:', result);
            alert('There was an issue submitting your booking.');
        }
    } catch (error) {
        console.error('Fetch error:', error);
        alert('Failed to submit booking.');
    }
};

// Function to generate bookingNo
function generateBookingNo() {
    return 'GR6' + Math.floor(Math.random() * 10000); // Simple random number generation
}

// Form validation function
async function validateForm() {
    const numTravelers = document.getElementById('num-travelers').value;
    const tripType = document.getElementById('tripTypeSelect').value;
    let valid = true;

    // Clear previous error messages
    document.getElementById('traveler-error').textContent = '';

    const email = document.getElementById("email");
    const emailError = document.getElementById('email-error');
    // Email Validation
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (email.value.trim() === "") {
        emailError.textContent = 'Please enter a valid email address.';
        isValid = false;
    } else if (!emailPattern.test(email.value.trim())) {
        emailError.textContent = 'Please enter a valid email address.';
        isValid = false;
    }

    // Validate number of travelers
    if (numTravelers === '' || numTravelers < 1) {
        document.getElementById('traveler-error').textContent = 'Please enter a valid number of travelers.';
        valid = false;
    }

    if (tripType.value === "") {
        document.getElementById('tripTypeError').style.display = 'block'; // Show error
        valid = false; // Validation failed
    } else {
        document.getElementById('tripTypeError').style.display = 'none'; // Hide error
        valid = true; // Validation passed
    }

    if (valid) {
        await submitBooking();
        // You can further process the form submission here
    }
}