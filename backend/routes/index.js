const express = require("express");
const router = express.Router();
const path = require("path");
const packageController = require("../controllers/packageController");
const contactController = require("../controllers/contactController");
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

// API routes
router.get(
  "/api/agencies-with-agents",
  contactController.getAgenciesWithAgents
);

module.exports = router;
