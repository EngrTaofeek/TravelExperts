/*
Script for index(home webpage)
HTML,CSS AND JS Assignmet 
Author: Taofeek Oduola 
Date: 1st October 2024 
Course: CPRG-210-A --> */

const API_URL = 'http://localhost:3000/api';

const carouselInner = document.querySelector('.carousel-inner');
const carouselIndicators = document.querySelector('.carousel-indicators');

// Clear any previous items
carouselInner.innerHTML = '';
carouselIndicators.innerHTML = '';

// Fetch all packages (GET)
async function fetchAllPackages() {
    try {
        const response = await fetch(`${API_URL}/packages`);
        const packages = await response.json();
        console.log(packages);
        const packagesTable = document.querySelector('#packagesTable tbody');
        packagesTable.innerHTML = '';
        packages.forEach((pkg, index) => {
            // Create indicator item
            const indicator = document.createElement('li');
            indicator.setAttribute('data-bs-target', '#carouselExampleIndicators');
            indicator.setAttribute('data-bs-slide-to', index);
            if (index === 0) {
                indicator.classList.add('active');
            }
            carouselIndicators.appendChild(indicator);

            // Create carousel item
            const carouselItem = document.createElement('div');
            carouselItem.classList.add('carousel-item');
            if (index === 0) {
                carouselItem.classList.add('active');
            }

            // Create the image element
            const img = document.createElement('img');
            img.classList.add('d-block', 'w-100');
            img.src = "./images/destination1.jpg";
            img.alt = `${pkg.name} image`;

            // Create caption
            const caption = document.createElement('div');
            caption.classList.add('carousel-caption', 'd-none', 'd-md-block');
            caption.innerHTML = `
    <h5>${pkg.PkgName}</h5>
    <p>${pkg.PkgDesc}</p>
    <p>${pkg.PkgStartDate.split("T")[0]} to ${pkg.PkgEndDate.split("T")[0]}</p>
    <h2>$ ${pkg.PkgBasePrice}</h2>
  `;

            // Create button (Bootstrap styled)
            const viewButton = document.createElement('button');
            viewButton.classList.add('btn', 'btn-primary', 'position-absolute', 'bottom-0', 'end-0', 'm-3');
            viewButton.textContent = 'View Package';

            // Add click listener to the button
            viewButton.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent click event from triggering the carousel item listener
                alert(`You clicked 'View Package' for: ${pkg.name}`);
            });

            // Add click listener to the carousel item
            carouselItem.addEventListener('click', () => {
                alert(`You clicked on: ${pkg.name}`);
            });

            // Append the button to the caption
            caption.appendChild(viewButton);

            // Append the image and caption to the carousel item
            carouselItem.appendChild(img);
            carouselItem.appendChild(caption);

            // Append the carousel item to the carousel inner
            carouselInner.appendChild(carouselItem);
        });

    } catch (error) {
        console.error('Error fetching packages:', error);
    }
}

//Temporarily here for teammate to see snippet to be deleted later
async function fetchPackage() {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('packageId');
        const response = await fetch(`${API_URL}/packages/${id}`);
        const package = await response.json();
        //sample below of how you can use data from json
        // const ghh = document.getElementById('dummyId');
        // ghh.innerHTML = package.PkgName;
        //then use the package above to populate whatever data you want to
    } catch (error) {
        console.error('Error fetching packages:', error);
    }
}
// An array of image,topic,description and url to populate carousels and hother functioalities
const carouselData = [
    { image: './images/destination.jpg', topic: 'Exotic Beach', description: 'Relax at the most beautiful beaches in Nice Paris. Experience a magical moment on a typical Côte Azur beach with breathtaking views over the Mediterranean Sea, a real invitation to relax and unwind ', url: 'https://www.explorenicecotedazur.com/en/explore/activities-nice-cote-dazur/plages/' },
    { image: './images/mountains.jpg', topic: 'Mountain Adventure', description: 'Experience thrilling adventures in the mountain.', url: 'https://mountainadventure.school/?gad_source=1&gclid=Cj0KCQjwr9m3BhDHARIsANut04YPqnX0eChUvQH-Z8-VdQrCHRSKDuyFX4NS-B1vCU7D9RvUwL-beTIaApEWEALw_wcB' },
    { image: './images/eiffel-tower.jpg', topic: 'Eiffel tower', description: 'Explore the city of love, paris.The tower is 330 metres (1,083 ft) tall,[9] about the same height as an 81-storey building, and the tallest structure in Paris. Its base is square, measuring 125 metres (410 ft) on each side. During its construction, the Eiffel Tower surpassed the Washington Monument to become the tallest human-made structure in the world', url: 'https://en.wikipedia.org/wiki/Eiffel_Tower' },
    { image: './images/cairo.jpg', topic: 'Cairo', description: 'Discover iconic cities.Cairo is associated with ancient Egypt, as the Giza pyramid complex and the ancient cities of Memphis and Heliopolis are located in its geographical area. Located near the Nile Delta, the city first developed as Fustat following the Muslim conquest of Egypt next to an existing ancient Roman fortress, Babylon.', url: 'https://en.wikipedia.org/wiki/Cairo' },
    { image: './images/banff.jpg', topic: 'Banff', description: 'Relax at the most beautiful Banff lake. Banff is a resort town in Banff National Park, Alberta, Canada, in Alberta Rockies along the Trans- Canada Highway, ', url: 'https://en.wikipedia.org/wiki/Banff,_Alberta' },
    { image: './images/amsterdam.jpg', topic: 'Amsterdam', description: 'Main attractions include its historic canals; the Rijksmuseum, the state museum with Dutch Golden Age art; the Van Gogh Museum; the Dam Square, where the Royal Palace of Amsterdam and former city hall are located; the Amsterdam Museum; Stedelijk Museum, with modern art; the Concertgebouw concert hall; the Anne Frank House; the Scheepvaartmuseum, the Natura Artis Magistra; Hortus Botanicus, NEMO, the red- light district and cannabis coffee shops.', url: 'https://en.wikipedia.org/wiki/Amsterdam' },
    { image: './images/miami.jpg', topic: 'Miami', description: 'Miami, officially the City of Miami, is a coastal city in the U.S. state of Florida and the county seat of Miami-Dade County in South Florida. It is the core of the Miami metropolitan area, which, with a population of 6.14 million, is the second-largest metropolitan area in the Southeast after Atlanta, and the ninth-largest in the United States.', url: 'https://en.wikipedia.org/wiki/Miami' },

];

let currentIndex = 0;
const itemsPerPage = 3; // Number of items to display at once
const totalItems = carouselData.length;
const slideWidth = 320; // Width of each carousel item (including padding/margin if necessary)

// Function to populate the carousel
function displayCarouselItems() {
    const carouselContainer = document.getElementById("custom-carousel-container");

    // Clear the container before adding new items
    carouselContainer.innerHTML = '';

    // Add all carousel items to the container
    carouselData.forEach((item) => {
        // Create the carousel item div
        const carouselItemDiv = document.createElement('div');
        carouselItemDiv.classList.add('custom-carousel-item');

        // Create and append the image
        const imgElement = document.createElement('img');
        imgElement.src = item.image;
        imgElement.alt = item.topic;
        carouselItemDiv.appendChild(imgElement);

        // Create and append the topic (as a heading)
        const topicElement = document.createElement('h3');
        topicElement.textContent = item.topic;
        carouselItemDiv.appendChild(topicElement);

        // Create and append the description
        const descriptionElement = document.createElement('p');
        descriptionElement.textContent = item.description;
        // carouselItemDiv.appendChild(descriptionElement);

        carouselItemDiv.appendChild(descriptionElement);

        // Append the entire carousel item div to the carousel container
        carouselContainer.appendChild(carouselItemDiv);
        imgElement.addEventListener('click', function () {
            newWindow(item);
        }, false);
    });

}

// Function to update the carousel sliding animation
function updateCarousel() {
    const carouselContainer = document.getElementById("carousel-container");
    carouselContainer.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    carouselContainer.style.transition = "transform 0.5s ease";  // Smooth transition
}

// Function to show the previous set of items
function showPreviousItems() {
    currentIndex = Math.max(currentIndex - 1, 0);  // Move back by 1 item but don't go below 0
    updateCarousel();
}

// Function to show the next set of items
function showNextItems() {
    if (currentIndex < totalItems - itemsPerPage) {
        currentIndex += 1;
    }
    updateCarousel();
}

// Initialize carousel prev and nnext buttons
document.getElementById('customPrevBtn').addEventListener('click', showPreviousItems);
document.getElementById('customNextBtn').addEventListener('click', showNextItems);

// Display carousel items and the first set on load
displayCarouselItems();
updateCarousel();
fetchAllPackages();


var redirectWindow, myTimeout;

function newWindow(item) {
    // Open a new window
    redirectWindow = window.open("", "opened_window", "width=300,height=300,menubar=no,location=no,resizable=no,scrollbars=no,status=no");

    // Write content into the new window
    redirectWindow.document.write(`
        <html>
        <head>
            <title>Redirect</title>
            <style>
                body { font-family: Arial, sans-serif; }
                p { margin: 20px 0; }
                button { padding: 10px; font-size: 16px; }
            </style>
        </head>
        <body>
            <p>You are about to be redirected out of this website.</p>
            <p>If you do not click cancel within 5 seconds, you will be redirected automatically.</p>
            <p style="text-decoration: underline; cursor: pointer;" id="immediateLink">Click this link to go to the website immediately</p>
            <br/>
            <button type="button" id="cancelButton">Cancel</button>
            <script>
                // Inside popup: call the parent window's functions
                document.getElementById('immediateLink').addEventListener('click', function() {
                    window.opener.openWindowImmediately('${item.url}');
                    window.opener.stopTimeOut(); 
                });
                document.getElementById('cancelButton').addEventListener('click', function() {
                    window.opener.stopTimeOut();
                });
            </script>
        </body>
        </html>
    `);

    // Close the document to render the content
    redirectWindow.document.close();

    // Start the 5-second redirection timer
    myTimeout = setTimeout(function () {
        openWindowImmediately(item.url);
    }, 5000);
}

// Function to open the URL immediately
function openWindowImmediately(url) {
    window.open(url, '_blank');  // Open the URL in a new tab
    redirectWindow.close();      // Close the popup window
}

// Function to stop the timeout and close the popup window
function stopTimeOut() {
    clearTimeout(myTimeout);    // Cancel the timeout
    redirectWindow.close();     // Close the popup window
}

//Populating the carousel that has been created in the index.html
function updateCarousel() {
    const carouselContainer = document.getElementById("custom-carousel-container");
    const slideWidth = 320; // Adjust this width to match the width of each carousel item
    carouselContainer.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
}

