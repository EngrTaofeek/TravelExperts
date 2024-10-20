let header = `<nav class="navbar navbar-expand-lg">
<div class="container-fluid">
    <div class="header-container">
        <a href="index.html">
            <img
            src="images/logo.png"
            alt="Travel Tales Logo"
            style="max-width: 100px; height: 10vh;"
            />
        </a>
        <h2 class="d-inline-block header-h2">WELCOME TO TRAVEL TALES</h2>
    </div>

    <div id="navbarNav">
        <ul class="navbar-nav ms-auto">
            <li class="nav-item">
                <a class="nav-link" href="index.html">HOME</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="index.html#carouselExampleIndicators">PACKAGES</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="contact.html">CONTACT US</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="register.html">REGISTER</a>
            </li>
        </ul>
    </div>
</div>
</nav>`;

let footer = `<p>&copy; Travel Tales 2024</p>
      <div>
        <div>
          <img
            src="./images/facebook.png"
            alt="Facebook"
            height="30"
            width="30"
          />
        </div>
        <div>
          <img
            src="./images/instagram.png"
            alt="Instagram"
            height="30"
            width="30"
          />
        </div>
        <div>
          <img
            src="./images/twitter.png"
            alt="Twitter"
            height="30"
            width="30"
          />
        </div>
      </div>`;

function setActiveNavItem() {
  const currentPage = window.location.pathname.split("/").pop();
  const navLinks = document.querySelectorAll(".nav-link");

  navLinks.forEach((link) => {
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active");
      link.setAttribute("aria-current", "page");
    } else {
      link.classList.remove("active");
      link.removeAttribute("aria-current");
    }
  });
}

let bootstrapCDN = `<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"  rel="stylesheet"
    integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
    integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
    crossorigin="anonymous"></script>
    `;

document.addEventListener("DOMContentLoaded", () => {
  document.querySelector(".header").innerHTML = header;
  setActiveNavItem();
  document.querySelector(".footer").innerHTML = footer;
  document.querySelector("head").innerHTML += bootstrapCDN;
});
