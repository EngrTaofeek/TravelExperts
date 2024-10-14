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
                  <a class="nav-link active" aria-current="page" href="index.html"
                    >HOME</a
                    >
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

onload = () => {
  document.querySelector(".header").innerHTML = header;
  document.querySelector(".footer").innerHTML = footer;
};
