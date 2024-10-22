/*
Script for index(home webpage)
HTML,CSS AND JS Assignmet 
Author: Taofeek Oduola 
Date: 1st October 2024 
Course: CPRG-210-A --> */

const API_URL = "http://localhost:3000";

const carouselInner = document.querySelector(".carousel-inner");
const carouselIndicators = document.querySelector(".carousel-indicators");

// Clear any previous items
carouselInner.innerHTML = "";
carouselIndicators.innerHTML = "";

// Fetch all packages (GET)
async function fetchAllPackages() {
  try {
    const response = await fetch(`${API_URL}/packages`);
    const packages = await response.json();

    packages.forEach((pkg, index) => {
      const packageId = pkg.PackageId;
      // Create indicator item
      const indicator = document.createElement("li");
      indicator.setAttribute("data-bs-target", "#carouselExampleIndicators");
      indicator.setAttribute("data-bs-slide-to", index);
      if (index === 0) {
        indicator.classList.add("active");
      }
      carouselIndicators.appendChild(indicator);

      // Create carousel item
      const carouselItem = document.createElement("div");
      carouselItem.classList.add("carousel-item");
      if (index === 0) {
        carouselItem.classList.add("active");
      }

      // Create the image element
      const img = document.createElement("img");
      img.classList.add("d-block", "w-100");
      img.src = pkg.imagePath;
      img.alt = `${pkg.name} image`;

      // Create caption
      const caption = document.createElement("div");
      caption.classList.add("carousel-caption", "d-none", "d-md-block");
      caption.innerHTML = `
    <h5>${pkg.PkgName}</h5>
    <p style="color: #ffff;">${pkg.PkgDesc}</p>
    <p style="color: #ffff;">${pkg.PkgStartDate.split("T")[0]} to ${pkg.PkgEndDate.split("T")[0]}</p>
    <h2>$ ${pkg.PkgBasePrice.split(".")[0]}</h2>
  `;

      // Create button (Bootstrap styled)
      const viewButton = document.createElement("button");
      viewButton.classList.add(
        "btn",
        "btn-primary",
        "position-absolute",
        "bottom-0",
        "end-0",
        "m-3"
      );
      viewButton.style.backgroundColor = "#041441";
      viewButton.textContent = "View Package";

      // Add click listener to the button
      viewButton.addEventListener("click", (e) => {
        e.stopPropagation(); // Prevent click event from triggering the carousel item listener
        // Assuming the `pkg` object has a unique identifier like `pkg.id`
        // Redirect to booking page
        window.location.href = `/booking.html?packageId=${packageId}`;

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
    console.error("Error fetching packages:", error);
  }
}


fetchAllPackages();

let slideIndex = 0;
showSlides();

function showSlides() {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) { slideIndex = 1 }
  slides[slideIndex - 1].style.display = "block";
  setTimeout(showSlides, 3000); // Change image every 2 seconds
}
