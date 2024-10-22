const express = require("express");
const router = express.Router();
const path = require("path");
const packageController = require("../controllers/packageController");
const contactController = require("../controllers/contactController");
const registrationController = require("../controllers/registrationController");
const options = {'root': path.join(__dirname, 'frontend')};

router.get("/", (req, res) => {
  res.sendFile("index");
});

router.get("/packages", packageController.getAllPackages);
router.get("/packages/:id", packageController.getPackageById);

// Contact page route
router.get("/contact", (req, res) => {
    res.sendFile('contact.html', options);
});

// Registration Page routes
router.post("/api/register", registrationController.registerCustomer);
// Getting all agents for register page dropdown
router.get("/api/agents", registrationController.getAllAgents);

// API routes
router.get(
  "/api/agencies-with-agents",
  contactController.getAgenciesWithAgents
);

module.exports = router;
