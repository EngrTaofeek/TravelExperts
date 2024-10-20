function renderAgencies(agencies) {
  const container = document.getElementById('agencies-container');
  agencies.forEach(agency => {
      const agencySection = document.createElement('div');
      agencySection.className = 'agency-section mb-5';
      agencySection.innerHTML = `
          <h3 class="mb-3">${agency.agency.city}</h3>
          <p class="agency-details" style="text-align:center;">
              <strong>Address:</strong> ${agency.agency.address}<br>
              <strong>Location:</strong> ${agency.agency.city}, ${agency.agency.province} ${agency.agency.postalCode}<br>
              <strong>Phone:</strong> ${agency.agency.phone}<br>
              <strong>Fax:</strong> ${agency.agency.fax}
          </p>
          <h4 class="mt-4 mb-3">Our Agents</h4>
          <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
              ${renderAgents(agency.agents)}
          </div>
      `;
      container.appendChild(agencySection);
  });
}

function renderAgents(agents) {
  return agents.map(agent => `
      <div class="col">
          <div class="card agent-card h-100">
              <div class="card-body">
                  <h5 class="card-title agent-name">${agent.firstName} ${agent.lastName}</h5>
                  <p class="card-text"><strong>Position:</strong> ${agent.position}</p>
                  <p class="card-text"><strong>Phone:</strong> ${agent.phone}</p>
                  <p class="card-text"><strong>Email:</strong> ${agent.email}</p>
              </div>
          </div>
      </div>
  `).join('');
}

function displayErrorMessage(message) {
  const container = document.getElementById("agencies-container");
  container.innerHTML = `<p class="text-danger">Error loading contact information: ${message}</p>`;
}

onload = () => {
  fetch("/api/agencies-with-agents")
    .then((response) => {
      console.log("fetch api called, contact.js: ", response);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      renderAgencies(data);
    })
    .catch((error) => {
      console.error("Fetch Error:", error);
      displayErrorMessage(error.message);
    });
};
