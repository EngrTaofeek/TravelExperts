// controllers/registrationController.js
const Customer = require("../models/Customer");

exports.registerCustomer = async (req, res) => {
  try {
    const customerData = req.body;
    console.log(
      "customer data received in registrationController: ",
      customerData
    );
    const newCustomer = await Customer.create(customerData);

    res.json({
      success: true,
      message: "Registration successful!",
      customerId: newCustomer.CustomerId,
    });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({
      success: false,
      message: "Registration failed. Please try again.",
    });
  }
};

exports.getAllAgents = async (req, res) => {
  try {
    const agents = await Customer.getAllAgents();
    res.json(agents);
  } catch (error) {
    console.error("Error fetching agents:", error);
    res.status(500).json({ error: "Failed to fetch agents" });
  }
};
