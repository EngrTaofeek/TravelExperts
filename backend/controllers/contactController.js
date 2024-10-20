const Contact = require("../models/contact");

exports.getAgenciesWithAgents = async (req, res) => {
  try {
    const data = await Contact.getAgenciesWithAgents();

    // Group agents by agency
    const agenciesWithAgents = data.reduce((acc, row) => {
      console.log("contact Controller[data]: ", acc, row);
      if (!acc[row.AgencyId]) {
        acc[row.AgencyId] = {
          agency: {
            id: row.AgencyId,
            address: row.AgncyAddress,
            city: row.AgncyCity,
            province: row.AgncyProv,
            postalCode: row.AgncyPostal,
            phone: row.AgncyPhone,
            fax: row.AgncyFax,
          },
          agents: [],
        };
      }
      if (row.AgentId) {
        acc[row.AgencyId].agents.push({
          id: row.AgentId,
          firstName: row.AgtFirstName,
          lastName: row.AgtLastName,
          phone: row.AgtBusPhone,
          email: row.AgtEmail,
          position: row.AgtPosition,
        });
      }
      return acc;
    }, {});

    res.json(Object.values(agenciesWithAgents));
  } catch (error) {
    console.error("Error fetching contact data:", error);
    res.status(500).json({ error: "Error loading contact information" });
  }
};
