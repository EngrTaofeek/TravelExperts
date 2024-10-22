const express = require("express");
const router = express.Router();
const path = require("path");
const packageController = require("../controllers/packageController");
const contactController = require("../controllers/contactController");

const tripTypeController = require('../controllers/tripsController');
const bookingController = require('../controllers/bookingController');
const options = { 'root': path.join(__dirname, 'frontend') };

// Define the route for inserting a booking (POST request)
router.post('/add-booking', bookingController.addBooking);

const registrationController = require("../controllers/registrationController");
const options = {'root': path.join(__dirname, 'frontend')};


router.get("/", (req, res) => {
  res.sendFile("index");
});

router.get("/packages", packageController.getAllPackages);
router.get("/packages/:id", packageController.getPackageById);

// Route to fetch trip types
router.get('/triptypes', async (req, res) => {
  try {
    console.log("index tries before catch");
    const tripTypes = await tripTypeController.getAllTripTypes();
    res.json(tripTypes); // Send trip types as JSON response
  } catch (error) {
    console.log(`${error}`);
    res.status(500).json({ message: 'Error fetching trip types' });
  }
});
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
